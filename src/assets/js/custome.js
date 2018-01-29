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

