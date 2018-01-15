var btnPrevious = $('.btnPrevious');
var btnNext = $('.btnNext');

/**
 * Tab Toggle Events
 */
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    /**
     * @type {*|jQuery|HTMLElement}
     */
    var $target = $(e.target);
    var $relatedTarget = $(e.target);
    var $previousTarget = parseInt($target.attr('data-tab-index')) - 1;
    var $nextTarget = parseInt($relatedTarget.attr('data-tab-index')) + 1;
    var tabLength = $(e.target).closest('ul#myTab').find('.nav-item').length - 1;

    /**
     * Update Buttons Tab selection Property
     */
    btnPrevious.attr('data-tab-index', ($previousTarget !== -1)? $previousTarget : 0);
    btnNext.attr('data-tab-index', ($nextTarget !== 5)? $nextTarget : tabLength );

    /**
     * Update Button text "Submit" and "Next"
     */
    ($nextTarget - 1 === tabLength)? btnNext.text('Submit') : btnNext.text('Next >');
});