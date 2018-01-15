$(document).on('ready', function () {

    $(document).on('click', function(){
        alert("Suhas hankae");
    });

    function tabClicked(){
        var $this = $(this);
        var tabWrapper = $('#myTab');
        var tabWrapperHref = tabWrapper.find('a.nav-link');
        var tabCount = tabWrapperHref.length;

        console.log(tabCount);
    }
    alert(1);
});

