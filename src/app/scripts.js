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
        }),
        $menuHeader = $('.ad__header-left-menu'),
        $dataFixed = 'data-fixed-menu',
        $preguntas = $('.ad__faqs-listado'),
        $itemsPreguntas = $preguntas.find('a'),
        $itemModalFaq = $('.ad__faqs-modal-title a'),
        $legales = $('.ad__footer-legales'),
        $itemsLegales = $legales.find('a'),
        $cerrarLegales = $('.ad__legales-close a');


    /////////////////////////


    /// Mover la página en el click del menú
    function clickMenu(items, isMenu, isFaq, isModal){
        items.click(function(e){
            items.removeClass($claseActiva);
            $(this).addClass($claseActiva);
            var anchor = $(this).attr('href');
            if(isMenu){
                if(anchor) { scrollIt(anchor); }
                logoInfantil($(this).attr($dataLogoInfantil));
            }
            if(isFaq){
                $('body').css('overflow', 'hidden');
                $(anchor).css({
                    visibility: 'visible',
                    opacity: 1
                });
                bindKeyEvent(anchor);
            }
            if(isModal){
                closeModal(anchor);
            }
            e.preventDefault();
        });
    }

    /// Cerrar el modal
    function closeModal(anchor){
        $('body').removeAttr('style');
        $(anchor).removeAttr('style');
    }

    /// Atachar el evento keypress
    function bindKeyEvent(anchor){
        $(document).on('keydown', function(e){
            var code = e.keyCode || e.which;
            console.log(code, anchor);
            if(code === 27){
                $(document).off('keydown');
                closeModal(anchor);
            }
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

    /// Quitar el fixed del menú
    function noFixed(fixed, scrollTop){
        if (fixed) {
            $menuHeader.css({
                position: 'absolute',
                top: scrollTop
            });
        } else {
            $menuHeader.removeAttr('style');
        }
    }

    /// Mover la página a la sección deseada
    function scrollIt(section, duration){
        var dur = duration || 1000;
        $('body, html').animate({scrollTop: $(section).offset().top }, dur).off();
    }

    /// Unir el scroll para poner la clase activa 
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(),
            fromTop = scrollTop + $margenScroll,
            cur = $scrollItems.map(function(){
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
            noFixed(itemActivo.attr($dataFixed), scrollTop);
            setTimeout(function(){
                //scrollIt('#'+id, 2000);
            }, 1000);
        }
    });

    /// Iniciar
    $(document).ready(function(){
        scrollIt('body');
        clickMenu($itemsMenu, true);
        clickMenu($itemsPreguntas, false, true);
        clickMenu($itemModalFaq, false, false, true);
        clickMenu($itemsLegales, false, true);
        clickMenu($cerrarLegales, false, false, true);
        
        $logoInfantil.hide();
    });

})(jQuery);