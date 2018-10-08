/// Cookies

var $header = $('.ad__header'),
    $addCookies = 'ad__has-cookies',
    $firstScroll = true,
    $cookie = 'aceptarAderogyl',
    $cookieValue = 'true',
    $addCookiesBtn = $('.ad__cookies-button a'),
    $noCookie = true;

//////////////////

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