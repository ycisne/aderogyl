(function ($) {

    /// Mover la página a la sección deseada
    function scrollIt(section, offset, duration){
        var element = $(section),
            off = offset || 0,
            dur = duration || 1000;
        $('body, html').animate({scrollTop: element.offset().top - off }, dur);
    }

    /// Mover la página en el click del menú
    function clickMenu(){
        $('.ad__header-menu-principal li a').click(function(){
            $('.ad__header-menu-principal li a').removeClass('active');
            $(this).addClass('active');
            var anchor = $(this).attr('href');
            if(anchor) {
                scrollIt(anchor);
            }
            return false;
        });
    }

    /// Iniciar el parallax para las vitaminas
    function runParallax(){
        var scene = document.getElementById('scene-vitaminas');
        var parallaxInstance = new Parallax(scene);
    }

    /// Iniciar
    $(document).ready(function(){
        scrollIt('body');
        clickMenu();
        runParallax();
    });

})(jQuery);