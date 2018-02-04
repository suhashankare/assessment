/**
 * Default Values
 * @desc : tabNextValue = 1 || disabled
 * @desc : tabPreviousValue = 0 || enabled
 * @type {number}
 */
var tabNexValue = 1;
var tabPreviousValue = 0;

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

var tabHref = $('#myTab').find('.nav-item');
var tabDiv = $('#myTabContent');
var totalTab  = tabHref.length;
var tabList;

function previousButton(tabList, buttonName){

    var currentIndexValue = tabList.indexOf(buttonName);
    var nextIndexValue = currentIndexValue - 1;

    if(tabList[nextIndexValue] !== undefined){
        return tabList[nextIndexValue].toString().toLowerCase().replace(/( & )| /g,'-');
    }else{
        return "disabled";
    }
}
function nextButton(tabList, buttonName){
    var currentIndexValue = tabList.indexOf(buttonName);
        var nextIndexValue = currentIndexValue + 1;
        if(tabList[nextIndexValue] !== undefined){
            return tabList[nextIndexValue].toString().toLowerCase().replace(/( & )| /g,'-');
        }{
          return "disabled";
    }
}

$('[data-previous="disabled"]').on('click', function(e){
    e.stopPropagation();
    e.stopImmediatePropagation();
})


$(document).on('click',btnNext, function(e){
    var $target = $(e.target);
    var $targetProp = $('#'+$target.attr('data-next')+'-tab');
    $targetProp.trigger('click');
});
$(document).on('click',btnPrevious , function(e){
    var $target = $(e.target);
    var $targetProp = $('#'+$target.attr('data-previous')+'-tab');
    $targetProp.trigger('click');
});



/**
* Row Erro Validation
@todo: Make Dynamic rows selection
*/
$.each($('[name="radio-group-organization-culture-6"]'), function(){
 if(!$(this).prop("checked")){

  // highlist error rows
	$(this).closest("tr").addClass('alert alert-danger');

  // highlist error tab
  $('#' + $(this).closest("div.tab-pane").attr('id')+'-tab').addClass('alert alert-danger')
	}
})

/**
* Each Radio Button Selection for validation
@todo:
*/
var selectionData = {};
$(document).on('change','input[type=radio]', function() {
  var $thisName = $(this).attr('name');
  var $thisId = $(this).attr('id');
  var getName = $thisName.replace(/radio-group-/,'').replace(/-\d/,'');
  var checkTabNameInTheTabList = tabList.indexOf(getName);
  var createNode = selectionData[tabList[checkTabNameInTheTabList]];

  if(!createNode){
      selectionData[tabList[checkTabNameInTheTabList]] = [$thisId];
  }else{
      createNode.push($thisId);
  }

});
