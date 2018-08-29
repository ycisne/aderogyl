(function ($) {

    /// Mover la página a la sección deseada
    function scrollIt(section, offset, duration){
        var element = $(section),
            off = offset || 0,
            dur = duration || 1000;
        $('body, html').animate({scrollTop: $(section).offset().top - off }, duration);
    }

    /// Mover la página en el click del menú
    function clickMenu(){
        $('.ad__header-menu-principal li a').click(function(){
            $('.ad__header-menu-principal li a').removeClass('active');
            $(this).addClass('active');
            var anchor = $(this).attr('href');
            if(anchor) {
                scrollIt(anchor, 30);
            }
            return false;
        });
    }

    /// Iniciar
    $(document).ready(function(){
        scrollIt('body');
        clickMenu();
    });

})(jQuery);