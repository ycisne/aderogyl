/// Header

/// Para el logo infantil
var $logoInfantil = $('.ad__header-logo-infantil'),
    $dataLogoInfantil = 'data-infantil';

//////////////////

/// Mostrar / Ocultar el logo infantil
function logoInfantil(infantil){
    if(infantil){ 
        $logoInfantil.show().prev().hide();
    } else {
        $logoInfantil.hide().prev().show();
    }
}

/// Ocultar navbar en mobile
/*function hideNavMobile(){
    if($('.navbar-toggle').css('display') == 'block'){
        $('.navbar-collapse').find('li').find('a').attr({
            'data-toggle': 'collapse',
            'data-target': '.navbar-collapse'
        });
    } else {
        $('.navbar-collapse').find('li').find('a').removeAttr('data-toggle data-target');
    }
}*/