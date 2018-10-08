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