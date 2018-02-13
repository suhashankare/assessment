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

/**
 * override Previous button event
 * @type {*|jQuery|HTMLElement}
 */
//btnPrevious.attr('disabled',true);

//var tabHref = $('#myTab').find('.nav-item');
//var tabDiv = $('#myTabContent');
//var totalTab = tabHref.length;
var tabList;

$(document).on('show.bs.tab', $('a[data-toggle="tab"]'), function (e) {
  var currentTab = $('.tabListConainer .nav-link.active');
  var currentTabHref = currentTab.attr('href');
  var currentTabHDiv = $(currentTabHref);

  var target = $(e.target).attr('href'); // activated tab
  var targetDiv = $(target);
  var $tabModel = $('#tabWarningModel');

  if (currentTabHDiv.find('tr.not-selected').length) {
    //$('#tavWarningModel').modal('show');
    $tabModel.find('.modal-body').html('<h5>You are not completed few question on <h2>' + currentTab.text() + ' Tab </h2></h5>');
    $tabModel.find('.btn-secondary').text('Stay on the ' + currentTab.text() + ' Tab');

    $tabModel.find('.btn-secondary').on('click', function () {
      $('.tabListDataContainer').find('.tab-pane').removeClass('active show');
      currentTab.trigger('click');
      currentTabHDiv.addClass('not-complete');
      $('#tabWarningModel').modal('hide');
    });

    $tabModel.modal('show');
    $tabModel.find('.btn-primary').on('click', function () {
      targetDiv.removeClass('not-complete');
      $('#tabWarningModel').modal('hide');
    });
  }
});

/**
 * default progress bar status
 */
var progressbar = $('.progress-bar');
progressbar.css('width', '0%');
progressbar.text(0 + '%');

function previousButton (tabList, buttonName) {

  var currentIndexValue = tabList.indexOf(buttonName);
  var nextIndexValue = currentIndexValue - 1;

  if (tabList[nextIndexValue] !== undefined) {
    return tabList[nextIndexValue].toString().toLowerCase().replace(/( & )| /g, '-');
  }
  else {
    return 'disabled';
  }
}

function nextButton (tabList, buttonName) {
  var currentIndexValue = tabList.indexOf(buttonName);
  var nextIndexValue = currentIndexValue + 1;
  if (tabList[nextIndexValue] !== undefined) {
    return tabList[nextIndexValue].toString().toLowerCase().replace(/( & )| /g, '-');
  }
  {
    return 'disabled';
  }
}

/** Default For First Tab
 * @todo: Find the Solution to set Disabled
 */
var previousDisabled = $('[data-previous="disabled"]');
previousDisabled.attr('disabled','disabled');

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
 * Rows Error Validation
 @todo: Make Dynamic rows selection
 */
$.each($('[name="radio-group-organization-culture-6"]'), function () {
  if (!$(this).prop('checked')) {

    // highlight error rows
    $(this).closest('tr').addClass('alert alert-danger');

    // highlight error tab
    $('#' + $(this).closest('div.tab-pane').attr('id') + '-tab').addClass('alert alert-danger');
  }
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

  getNode.push($thisName);
  selectionData[getName] = _.uniq(getNode);

  updateProgressBar();
  manipulateProgressbar();

  /**
   * initialise model box
   */
  if (updateProgressBar() === totalCunt) {
      $('.btnNext').text('Submit');
    modelLauncher();

  }
});

/**
 *  Progress Bar Update testing purpose
 **/
//var progressCounter = Math.floor(100 / 32 * 32);

function updateProgressBar () {
  var counter = 0;
  _.each(selectionData, function (index, value) {
    counter += _.uniq(selectionData[value]).length;
  });
  return counter;
}

/**
 * update progress bar counter and loader
 */
function manipulateProgressbar () {

  var progressBarValues = 100 / parseInt(totalCunt) * updateProgressBar();
  var roundOffValue = Math.floor(progressBarValues);

  progressbar.css('width', roundOffValue + '%');
  progressbar.text(roundOffValue + '%');
}

/**
 * Model Box for confirmation
 */
function modelLauncher () {
  $('#completeModal').modal('show');
}
