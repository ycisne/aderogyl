(function ($) {

    /// Variables
    var lastId = null,
        $margenScroll = 30,
        $logoInfantil = $('.ad__header-logo-infantil'),
        $menu = $('.ad__header-menu-principal'),
        $itemsMenu = $menu.find('a'),
        $claseActiva = 'active',
        $dataLogoInfantil = 'data-infantil',
        $scrollItems = $itemsMenu.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    /////////////////////////

    /// Mover la página a la sección deseada
    function scrollIt(section, offset, duration){
        var element = $(section),
            off = offset || 0,
            dur = duration || 1000;
        $('body, html').animate({scrollTop: element.offset().top - off }, dur);
    }

    /// Mover la página en el click del menú
    function clickMenu(){
        $itemsMenu.click(function(e){
            $itemsMenu.removeClass($claseActiva);
            $(this).addClass($claseActiva);
            var anchor = $(this).attr('href');
            if(anchor) { scrollIt(anchor); }
            logoInfantil($(this).attr($dataLogoInfantil));
            e.preventDefault();
        });
    }

    /// Mostrar / Ocultar el logo infantil
    function logoInfantil(infantil){
        if(infantil){ 
            $logoInfantil.show().prev().hide();
        } else {
            $logoInfantil.hide().prev().show();
        }
    }

    /// Unir el scroll para poner la clase activa 
    $(window).scroll(function(){
        var fromTop = $(this).scrollTop() + $margenScroll;
        var cur = $scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        if (id && lastId !== id) {
            lastId = id;
            var itemActivo = $itemsMenu.filter("[href='#"+id+"']");
            $itemsMenu.removeClass($claseActiva);
            itemActivo.addClass($claseActiva);
            logoInfantil(itemActivo.attr($dataLogoInfantil));
            setTimeout(function(){
                scrollIt('#'+id);
            }, 500);
            
        }
    });

    /// Iniciar
    $(document).ready(function(){
        scrollIt('body');
        clickMenu();
        $logoInfantil.hide();
        
    });

})(jQuery);