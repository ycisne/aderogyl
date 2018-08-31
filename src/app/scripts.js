(function ($) {

    /// Variables
    var lastId = null,
        $margenScroll = 30,
        $claseActiva = 'active',

        /// Menú principal
        $menu = $('.ad__header-menu-principal'),
        $itemsMenu = $menu.find('a'),
        $menuHeader = $('.ad__header-left-menu'),
        $dataFixed = 'data-fixed-menu',

        /// Para el logo infantil
        $logoInfantil = $('.ad__header-logo-infantil'),
        $dataLogoInfantil = 'data-infantil',

        /// Para buscar el item al que se debe hace el scroll
        $scrollItems = $itemsMenu.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        }),

        /// Preguntas frecuentes
        $preguntas = $('.ad__faqs-listado'),
        $itemsPreguntas = $preguntas.find('a'),
        $itemModalFaq = $('.ad__faqs-modal-title a'),
        
        /// Legales
        $legales = $('.ad__footer-legales'),
        $itemsLegales = $legales.find('a'),
        $cerrarLegales = $('.ad__legales-close a'),

        /// Presentaciones
        $presentaciones = $('.ad__presentacion-btn'),
        $itemsPresentacion = $presentaciones.find('a'),
        $cerrarPresentacion = $('.ad__modal-presentacion-carrusel .ad__modal-close a');


    /////////////////////////

    /// Atachar el evento keypress
    function bindKeyEvent(anchor, hide){
        $(document).on('keydown', function(e){
            var code = e.keyCode || e.which;
            if(code === 27){
                $(document).off('keydown');
                if(hide){
                    closeModalAndShow(anchor, hide);
                } else {
                    closeModal(anchor);
                }
            }
        });
    }

    /// Mover la página en el click del menú
    function clickMenu(items, tipoModal){
        items.click(function(e){
            items.removeClass($claseActiva);
            $(this).addClass($claseActiva);
            if(tipoModal){
                var anchor = $(this).attr('href');
                switch(tipoModal){
                    case 'menu':
                        scrollToSection(anchor, $(this).attr($dataLogoInfantil));
                        break;
                    case 'faq':
                    case 'legales':
                        showModal(anchor);
                        break;
                    case 'presentacion':
                        showModalAndHide(anchor, $(this).attr('data-hide-presentacion'));
                        break;
                    case 'closeModal':
                        closeModal(anchor);
                        break;
                    case 'closeModalAndShow':
                        closeModalAndShow(anchor, $(this).attr('data-show-presentacion'));
                        break;
                }
            }
            e.preventDefault();
        });
    }

    /// Cerrar el modal
    function closeModal(anchor){
        $('body').removeAttr('style');
        $(anchor).removeAttr('style');
    }

    /// Cerrar modal y mostrar presentación
    function closeModalAndShow(anchor, show){
        $(show).css({
            visibility: 'visible',
            opacity: 1
        });
        closeModal(anchor);
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

    /// Ejecutar la función de hacer scroll
    function scrollToSection(anchor, logo){
        if(anchor) { scrollIt(anchor); }
        logoInfantil(logo);
    }

    /// Mostar modal
    function showModal(anchor, hide){
        $('body').css('overflow', 'hidden');
        $(anchor).css({
            visibility: 'visible',
            opacity: 1
        });
        bindKeyEvent(anchor, hide);
    }

    /// Mostrar modal y ocultar presentación
    function showModalAndHide(anchor, hide){
        $(hide).css({
            visibility: 'hidden',
            opacity: 0
        });
        showModal(anchor, hide);
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
        clickMenu($itemsMenu, 'menu');
        clickMenu($itemsPreguntas, 'faq');
        clickMenu($itemModalFaq, 'closeModal');
        clickMenu($itemsLegales, 'legales');
        clickMenu($cerrarLegales, 'closeModal');
        clickMenu($itemsPresentacion, 'presentacion');
        clickMenu($cerrarPresentacion, 'closeModalAndShow');
        $logoInfantil.hide();
    });

})(jQuery);