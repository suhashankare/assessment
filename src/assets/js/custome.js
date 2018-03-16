/**
 * Default Values
 * @desc : tabNextValue = 1 || disabled
 * @desc : tabPreviousValue = 0 || enabled
 * @type {number}
 */
//var tabNexValue = 1;
//var tabPreviousValue = 0;

/**
 * Global Selector + Variable
 * @type {*|jQuery|HTMLElement}
 */
var btnPrevious = $('.btnPrevious');
var btnNext = $('.btnNext');
var tabList;

$('.custom-badge').hide();

$(document).on('show.bs.tab', $('a[data-toggle="tab"]'), function (e) {
    var currentTab = $('.tabListConainer .nav-link.active');
    var currentTabHref = currentTab.attr('href');
    var currentTabHDiv = $(currentTabHref);

    var target = $(e.target).attr('href'); // activated tab
    var targetDiv = $(target);
    var $tabModel = $('#tabWarningModel');

    if (currentTabHDiv.find('tr.not-selected, div.collapse').length) {
        currentTabHDiv.addClass('not-complete');
        currentTab.closest('.nav-item').addClass('not-complete');
        currentTab.closest('.nav-item').find('.custom-badge').show().html("&#9888;");
    } else {

      if(!targetDiv.find('tr.not-selected, div.collapse').length){
        targetDiv.removeClass('not-complete');
        targetDiv.closest('.nav-item').removeClass('not-complete');
        targetDiv.closest('.nav-item').find('.custom-badge').show().html("&#10539;");
      }
    }
});

$('#myTabContent').on('show.bs.collapse', function (e) {
  var $target  = $(e.target);

  if($target.hasClass('visited')){
      $target.closest('div.card').find('.header').find('.custom-badge').show()
    $target.addClass('not-complete');
  }else{
    $target.addClass('visited');
  }
})

/**
 * default progress bar status
 */
var progressbar = $('.progress-bar');
progressbar.css('width', '0%');
progressbar.text(0 + '%');

function previousButton(tabList, buttonName) {

    var currentIndexValue = tabList.indexOf(buttonName);
    var nextIndexValue = currentIndexValue - 1;

    if (tabList[nextIndexValue] !== undefined) {
        return tabList[nextIndexValue].toString().toLowerCase().replace(/( & )| /g, '-');
    }
    else {
        return 'disabled';
    }
}

function nextButton(tabList, buttonName) {
    var currentIndexValue = tabList.indexOf(buttonName);
    var nextIndexValue = currentIndexValue + 1;
    if (tabList[nextIndexValue] !== undefined) {
        return tabList[nextIndexValue].toString().toLowerCase().replace(/( & )| /g, '-');
    }else {
        return 'disabled';
    }
}

/** Default For First Tab
 * @todo: Find the Solution to set Disabled
 */
var previousDisabled = $('[data-previous="disabled"]');
previousDisabled.attr('disabled', 'disabled');

/**
 * Stop Event Binding on Disabled element events
 */
previousDisabled.on('click', function (e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
});

$(document).on('click', btnNext, function (e) {
    var $target = $(e.target);
    var $targetProp = $('#' + $target.attr('data-next') + '-tab');
    $targetProp.trigger('click');
});
$(document).on('click', btnPrevious, function (e) {
    var $target = $(e.target);
    var $targetProp = $('#' + $target.attr('data-previous') + '-tab');
    $targetProp.trigger('click');
});

/**
 * Each Radio Button Selection for validation
 @todo:
 */
var selectionData = {};

//var progressBarCounter = 0; //  _.uniq(selectionData[getName]);

$(document).on('change', 'input[type=radio]', function () {
    var $thisName = $(this).attr('name');
    //var $thisId = $(this).attr('id');
    var getName = $thisName.replace(/radio-group-/, '').replace(/-\d/, '');
    //var checkTabNameInTheTabList = tabList.indexOf ( getName );
    var getNode = selectionData[getName];

    //  Update Class Check for tab error validation
    $(this).closest('tr').removeClass('not-selected').addClass('selected-ok');
    $(this).closest('div.collapse').removeClass('not-selected').addClass('selected-ok');

    getNode.push($thisName);
    selectionData[getName] = _.uniq(getNode);


    if (!$('#' + getName).find('.not-selected').length) {
        $('#' + getName + "-tab").siblings('.custom-badge').show().html("&#10003;").addClass('badge-success').removeClass('badge-warning');
        $('#' + getName).find('.custom-badge').show().html("&#10003;").addClass('badge-success').removeClass('badge-warning');
    } else {

        // do not show before , wait for the tab switch then validate
        //$('#' + getName).find('.custom-badge').show().html("&#10539;");
    }

    updateProgressBar();
    manipulateProgressbar();

    /**
     * initialise model box
     */
    if (updateProgressBar() === totalCunt) {
        $('.btnNext, .btnLtaNext').text('Submit').removeAttr('disabled');
        modelLauncher();

    }
});

/**
 *  Progress Bar Update testing purpose
 **/
//var progressCounter = Math.floor(100 / 32 * 32);

function updateProgressBar() {
    var counter = 0;
    _.each(selectionData, function (index, value) {
        counter += _.uniq(selectionData[value]).length;
    });
    return counter;
}

/**
 * update progress bar counter and loader
 */
function manipulateProgressbar() {

    var progressBarValues = 100 / parseInt(totalCunt) * updateProgressBar();
    var roundOffValue = Math.floor(progressBarValues);

    progressbar.css('width', roundOffValue + '%');
    progressbar.text(roundOffValue + '%');
}

/**
 * Model Box for confirmation
 */
var modelLaunchCounter = 0;
function modelLauncher() {

    if(modelLaunchCounter === 0){
      modelLaunchCounter = 1;
      $('#completeModal').modal('show');
    }
}

$('.info-icon').popover();


/**
 * LTA Screen Behaviour
 * @type {*|jQuery|HTMLElement}
 */
var section_one = $('#page1');
var section_two = $('#page2');

section_two.hide();

$('button.btnLtaNext').on('click', function () {

    section_two.show();
    section_one.hide();

    if (section_one.find('tr.not-selected').length) {
        section_one.find('.tab-pane').addClass('not-complete');
    } else {
        section_one.find('.tab-pane').removeClass('not-complete');
    }
    $('html, body').animate({scrollTop: 0}, 'slow');
    $(this).attr('disabled', 'disabled');
    $('button.btnLtaPrevious').removeAttr('disabled');
});

$('button.btnLtaPrevious').on('click', function () {
    section_two.hide();
    section_one.show();

    if (section_two.find('tr.not-selected').length) {
        section_two.find('.tab-pane').addClass('not-complete');
    } else {
        section_two.find('.tab-pane').removeClass('not-complete');
    }
    $('html, body').animate({scrollTop: 0}, 'slow');
    $(this).attr('disabled', 'disabled');
    $('button.btnLtaNext').removeAttr('disabled');
});

/**
 * Mobile Device Required below array list
 * @type {string[]}
 */
var userSelection = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Last", "Strongly Disagree"];

/*

 var form = new FormData();
 form.append("__EVENTTARGET", "ctl00$ContentPlaceHolder2$linkSubmit");
 form.append("__EVENTARGUMENT", "");
 form.append("__VIEWSTATE", "Fej3sjNW/RTzanCGT9YKQ63ewkfUQtECZCExzNTOlqT3sJnniXOsX5bDijIVO5ecoSTnJXiWDhJuRMIAX3tgxqIwED3WSn2fqig+CEUxP1I=");
 form.append("__VIEWSTATEGENERATOR", "16093116\n");
 form.append("__EVENTVALIDATION", "OOZoM8tL5kucID2wHH2sEqwx8jPUkQWVzQsRPzPxR3+G32F0AYi9P5QTmj4iFJSL6JX/gBFXx4ufD1r5ZNCGwKeKcwhjNZSo3kHwOyD+puHu0vnyGxVqbhswunM6xes7unNPZkjkB1E7g+gHRvTsaA==");
 form.append("ctl00$ContentPlaceHolder2$idhiddenAnswer", "hexaware|suhas|suhasha@hexaware.com|8097533797|32|1:HEXSA_Q1:5 - Strongly Agree|2:HEXSA_Q2:4 - Agree|3:HEXSA_Q3:5 - Strongly Agree|4:HEXSA_Q12:4 - Agree|5:HEXSA_Q15:3 - Neutral|6:HEXSA_Q21:4 - Agree|7:HEXSA_Q20:3 - Neutral|8:HEXSA_Q9:5 - Strongly Agree|9:HEXSA_Q4:4 - Agree|10:HEXSA_Q13:3 - Neutral|11:HEXSA_Q14:4 - Agree|12:HEXSA_Q22:4 - Agree|13:HEXSA_Q26:4 - Agree|14:HEXSA_Q7:5 - Strongly Agree|15:HEXSA_Q8:4 - Agree|16:HEXSA_Q10:3 - Neutral|17:HEXSA_Q23:3 - Neutral|18:HEXSA_Q25:4 - Agree|19:HEXSA_Q27:5 - Strongly Agree|20:HEXSA_Q28:4 - Agree|21:HEXSA_Q16:5 - Strongly Agree|22:HEXSA_Q6:4 - Agree|23:HEXSA_Q11:5 - Strongly Agree|24:HEXSA_Q17:5 - Strongly Agree|25:HEXSA_Q19:5 - Strongly Agree|26:HEXSA_Q31:5 - Strongly Agree|27:HEXSA_Q32:4 - Agree|28:HEXSA_Q5:5 - Strongly Agree|29:HEXSA_Q18:4 - Agree|30:HEXSA_Q24:5 - Strongly Agree|31:HEXSA_Q29:5 - Strongly Agree|32:HEXSA_Q30:4 - Agree");

 var settings = {
 "async": true,
 "crossDomain": true,
 "url": "https://hexopus.hexaware.com/agileassessmentweb/assessment",
 "method": "POST",
 "headers": {
 "location": "https://hexopus.hexaware.com/agileassessmentweb/Success.aspx",
 "cache-control": "no-cache",
 "x-frame-options": "SAMEORIGIN",
 "postman-token": "e4bdfda5-2edd-fa5d-f90b-3411d6a9bef9"
 },
 "processData": false,
 "contentType": false,
 "mimeType": "multipart/form-data",
 "data": form
 };

 $.ajax(settings).done(function (response) {
 console.log(response);
 });*/


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $("#topBtn").show()
    } else {
        $("#topBtn").hide()
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}