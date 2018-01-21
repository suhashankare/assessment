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
btnPrevious.attr('disabled',true);

var tabHref = $('#myTab').find('.nav-item');
var tabDiv = $('#myTabContent');
var totalTab  = tabHref.length;


/*

/!**
 * Tab Toggle Events
 *!/
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    /!**
     * @type {*|jQuery|HTMLElement}
     *!/
    var $target = $(e.target);
    var $relatedTarget = $(e.target);
    var $previousTarget = parseInt($target.attr('data-tab-index')) - 1;
    var $nextTarget = parseInt($relatedTarget.attr('data-tab-index')) + 1;
    var tabLength = $(e.target).closest('ul#myTab').find('.nav-item').length - 1;

    /!**
     * Update Buttons Tab selection Property
     *!/
    btnPrevious.attr('data-tab-index', ($previousTarget !== -1)? $previousTarget : 0);
    btnNext.attr('data-tab-index', ($nextTarget !== 5)? $nextTarget : tabLength );

    /!**
     * Update Button text "Submit" and "Next"
     *!/
    ($nextTarget - 1 === tabLength)? btnNext.text('Submit') : btnNext.text('Next >');

});


$('button').on('click', function(e){
    if($(e.target).hasClass('btnNext')){
        var buttonEleNext = $(e.target);
        var buttonEleNextDataTabIndex = (buttonEleNext.attr('data-tab-index') !== undefined)? buttonEleNext.attr('data-tab-index') : 0 ;
        console.log('has btnPrevious',buttonEleNextDataTabIndex);
        tabHref.removeClass('active show');
        tabHref.find('[data-tab-index='+buttonEleNextDataTabIndex+']').addClass('active show');

        tabDiv.removeClass('active show');
        tabDiv.find('[data-tab-index='+buttonEleNextDataTabIndex+']').addClass('active show');
        console.log(tabDiv.find('[data-tab-index="'+buttonEleNextDataTabIndex+'"]'));
    }

    if($(e.target).hasClass('btnPrevious')){
        var buttonElePrevious = $(e.target);
        var buttonElePreviousDataTabIndex = (buttonElePrevious.attr('data-tab-index') !== undefined)? buttonElePrevious.attr('data-tab-index') : 0;
        console.log('has btnPrevious',buttonElePreviousDataTabIndex);

        tabHref.removeClass('active show');
        tabHref.find('[data-tab-index='+buttonElePreviousDataTabIndex+']').addClass('active show');

        tabHref.removeClass('active show');
        tabDiv.find('[data-tab-index='+buttonElePreviousDataTabIndex+']').addClass('active show');
        console.log(tabDiv.find('[data-tab-index="'+buttonElePreviousDataTabIndex+'"]'));
    }

});*/

btnNext.on('click', function(e){


        $('[data-tab-index]').removeClass('active show');

        var thisNextIndexClickedValue  = $(e.target).attr('data-tab-index-click');
        $('[data-tab-index='+thisNextIndexClickedValue+']').addClass('active show');

        if(parseInt(thisNextIndexClickedValue) +1  !== totalTab ){
            $(e.target).attr('data-tab-index-click', parseInt(thisNextIndexClickedValue) + 1 );

            // @todo: Reset global value to maintain history
            tabNexValue += 1;
            tabPreviousValue += 1;

            // enabled Previous Button is tabNextValue increased more then 1
            btnPrevious.attr('disabled',false);
            btnPrevious.attr('data-tab-index-click',tabPreviousValue);
        }else{
            $(e.target).text('Submit');
        }

});
btnPrevious.on('click', function(e){

        var thisPreviousIndexClickedValue = $(e.target).attr('data-tab-index-click');
        var thisPreviousIndexClickedValueSubtraction = parseInt(thisPreviousIndexClickedValue) - 1;
        $('[data-tab-index]').removeClass('active show');
        $('[data-tab-index=' + thisPreviousIndexClickedValueSubtraction + ']').addClass('active show');

        btnPrevious.attr('data-tab-index-click',thisPreviousIndexClickedValueSubtraction);
        btnNext.attr('data-tab-index-click',thisPreviousIndexClickedValueSubtraction + 1);

        // @todo: Reset global value to maintain history
        tabNexValue = thisPreviousIndexClickedValueSubtraction;
        tabPreviousValue = thisPreviousIndexClickedValueSubtraction + 1;

        if(tabNexValue === 0 && tabPreviousValue === 1){
            btnPrevious.attr('disabled',true);
            btnNext.text('Next >');
        }

       /* if( btnPrevious.attr('data-tab-index-click') === 3 && btnNext.attr('data-tab-index-click') === 2){
            btnNext.text('Next >')
        }*/

});