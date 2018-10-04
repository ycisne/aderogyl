(function ($) {

    /// Variables
    var lastId = null,
        $margenScroll = 30,
        $claseActiva = 'active',
        
        /// Cookies
        $header = $('.ad__header'),
        $addCookies = 'ad__has-cookies',
        $removeCookies = 'ad__no-cookies',
        $firstScroll = true,
        $cookie = 'aceptarAderogyl',
        $cookieValue = 'true',
        $addCookiesBtn = $('.ad__cookies-button a'),
        $noCookie = true,

        /// Menú principal
        $menu = $('.ad__header-menu-principal'),
        $itemsMenu = $menu.find('a'),
        $topHeader = $('.ad__header-top-menu'),
        $menuHeader = $('.ad__header-menu'),
        $logoHeader = $('.ad__header-logo'),
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
        $cerrarPresentacion = $('.ad__modal-presentacion-carrusel .ad__modal-close a'),
        $dataAddPresentacion = 'data-add-class',

        /// Video
        $videoBtn = $('.ad__header-video a'),
        $videoModal = $('#videoComercial'),
        $videoBtnClose = $('.ad__video-modal-content .close'),
        $videoModalIframe = $('#video'),
        $videoSrc = null;


    /////////////////////////

    /// Atachar el evento keypress
    function bindKeyEvent(anchor, hide, isVideo){
        $(document).on('keydown', function(e){
            var code = e.keyCode || e.which;
            if(code === 27){
                $(document).off('keydown');
                if(hide){
                    closeModalAndShow(anchor, hide);
                } else {
                    closeModal(anchor, isVideo);
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
                    case 'showPresentacion':
                        showHidePresentacion(anchor, $(this).attr($dataAddPresentacion));
                        break;
                    case 'closeModal':
                        closeModal(anchor);
                        break;
                    case 'hidePresentacion':
                        showHidePresentacion(anchor);
                        break;
                    case 'closeVideo':
                        closeModal(anchor, true);
                        break;
                    case 'addCookie':
                        removeCookieBanner();
                        addCookie();
                }
            }
            e.preventDefault();
        });
    }

    /// Cerrar el modal
    function closeModal(anchor, isVideo){
        $(anchor).animate({
            opacity: 0
        }, 500, function(){
            restoreWheel();
            //$('body').removeClass('overflowHidden');
        });
        setTimeout(function(){
            $(anchor).removeAttr('style');
            if(isVideo){
                $videoModalIframe.attr('src', '');
            }
        }, 1000);
    }

    /// Cerrar modal y mostrar presentación
    function closeModalAndShow(anchor, show){
        $(show)
            .css({visibility: 'visible'})
            .animate({opacity: 1}, 500);
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
            var top = 80 - $topHeader.outerHeight();
            var logo = $logoHeader.outerHeight();
            $logoHeader.addClass('menuAbsolute').css({
                top: top + scrollTop
            });
            $menuHeader.addClass('menuAbsolute').css({
                top: top + logo + scrollTop
            });
        } else {
            $logoHeader.removeClass('menuAbsolute').removeAttr('style');
            $menuHeader.removeClass('menuAbsolute').removeAttr('style');
        }
    }

    /// Abrir el video
    function openVideo(){
        $videoBtn.click(function(e){
            e.preventDefault();
            $videoSrc = $(this).data('src');
            $videoModalIframe.attr('src', $videoSrc + '?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1');
            showModal($videoModal, null, true);
        });
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
    function showModal(anchor, hide, isVideo){
        preventWheel();
        //$('body').addClass('overflowHidden');
        $(anchor).css({
            visibility: 'visible',
            display: 'flex'
        }).animate({ opacity: 1}, 500);
        bindKeyEvent(anchor, hide, isVideo);
    }

    /// Mostrar u ocultar presentación
    function showHidePresentacion(anchor, clase){
        if(clase) {
            preventWheel();
            //$('body').addClass('overflowHidden');
            $(anchor).removeClass().addClass(clase);
            $(document).on('keydown', function(e){
                var code = e.keyCode || e.which;
                if(code === 27){
                    $(document).off('keydown');
                    showHidePresentacion(anchor);
                }
            });
        } else {
            $(anchor).addClass('ad__transition');
            setTimeout(function(){
                $(anchor).removeClass();
                restoreWheel();
                //$('body').removeClass('overflowHidden');

            }, 1000);
        }
    }

    /// Prevenir qu se mueva el contenido al girar la rueda del mouse
    function preventWheel(){
        document.onmousewheel = function(){ stopWheel(); }; /* IE7, IE8 */
        if(document.addEventListener){ /* Chrome, Safari, Firefox */
            document.addEventListener('DOMMouseScroll', stopWheel, false);
        }
    }

    function stopWheel(e){
        if(!e){ e = window.event; } /* IE7, IE8, Chrome, Safari */
        if(e.preventDefault) { e.preventDefault(); } /* Chrome, Safari, Firefox */
        e.returnValue = false; /* IE7, IE8 */
    }


    // Restaura el movimiento del mouse
    function restoreWheel(){
        document.onmousewheel = null;  /* IE7, IE8 */
        if(document.addEventListener){ /* Chrome, Safari, Firefox */
            document.removeEventListener('DOMMouseScroll', stopWheel, false);
        }
    }

    /// Quitar banner de cookie
    function removeCookieBanner(){
        $header.removeClass($addCookies).addClass($removeCookies);
        setTimeout(function(){
            $header.removeClass($removeCookies);
            $firstScroll = false;
        }, 1200);
    }

    /// Agregar la Cookie
    function addCookie(){
        document.cookie = $cookie + '=' + $cookieValue;
        $noCookie = false;
    }
    
    /// Leer la cookie
    function readCookie(){
        var cookies = document.cookie.split(';');
        if(cookies.length > 0){
            cookies.map(function(item){
                var splitCookie = item.split('=');
                if(splitCookie[0] == $cookie){
                    if(splitCookie[1] != $cookieValue){
                        console.log('No existe la cookie, mostrar banner');
                        $header.addClass($addCookies);
                    } else {
                        console.log('La cookie ya existe, no mostrar banner');
                        $noCookie = false;
                    }
                } else {
                    console.log('No existe la cookie, mostrar banner');
                    $header.addClass($addCookies);
                }
                return item;
            });
        } else {
            console.log('No existe la cookie, mostrar banner');
            $header.addClass($addCookies);
        }
    }

    /// Unir el scroll para poner la clase activa 
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(),
            fromTop = scrollTop + $margenScroll,
            heightWindow = ($(this).height()) / 2,
            cur = $scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                    return this;
            });
        
        /// Si el scroll llega a más de la mitad del alto de la ventana, 
        /// quitar banner de cookie si la cookie no existe
        if($noCookie){
            if(scrollTop > heightWindow && $firstScroll){
                removeCookieBanner();
            } else {
                if(scrollTop == 0){
                    $header.addClass($addCookies);
                    $firstScroll = true;
                }
            }
        }
        
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        if (id && lastId !== id) {
            lastId = id;
            var itemActivo = $itemsMenu.filter("[href='#"+id+"']");
            $itemsMenu.removeClass($claseActiva);
            itemActivo.addClass($claseActiva);
            logoInfantil(itemActivo.attr($dataLogoInfantil));
            //noFixed(itemActivo.attr($dataFixed), scrollTop);
            setTimeout(function(){
                //scrollIt('#'+id, 2000);
            }, 1000);
        }
    });

    /// Iniciar
    $(document).ready(function(){
        readCookie();
        scrollIt('body');
        clickMenu($itemsMenu, 'menu');
        clickMenu($itemsPreguntas, 'faq');
        clickMenu($itemModalFaq, 'closeModal');
        clickMenu($itemsLegales, 'legales');
        clickMenu($cerrarLegales, 'closeModal');
        clickMenu($itemsPresentacion, 'showPresentacion');
        clickMenu($cerrarPresentacion, 'hidePresentacion');
        openVideo($videoBtn);
        clickMenu($videoBtnClose, 'closeVideo');
        clickMenu($addCookiesBtn, 'addCookie');
        $logoInfantil.hide();
        // document.cookie = 'aceptarAderogyl=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });

})(jQuery);