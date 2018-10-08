/// Scroll

var lastId = null,
    $margenScroll = 30,
    $claseActiva = 'active',

/// Cookie
    $removeCookies = 'ad__no-cookies',

/// Para el menú fixed
    $menu = $('.ad__header-menu-principal'),
    $itemsMenu = $menu.find('a'),
    $topHeader = $('.ad__header-top-menu'),
    $menuHeader = $('.ad__header-menu'),
    $logoHeader = $('.ad__header-logo'),
    $dataFixed = 'data-fixed-menu',
    
/// Para buscar el item al que se debe hace el scroll
    $scrollItems = $itemsMenu.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

//////////////////

/// Quitar banner de cookie
function removeCookieBanner(){
    $header.removeClass($addCookies).addClass($removeCookies);
    setTimeout(function(){
        $header.removeClass($removeCookies);
        $firstScroll = false;
    }, 1200);
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

//////////////////

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