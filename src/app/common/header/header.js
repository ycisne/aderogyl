/// Header

/// Para el logo infantil
var $logoInfantil = $('.ad__header-logo-infantil'),
    $dataLogoInfantil = 'data-infantil',
/// Para el menú
    $menuItemsCollapse = $('.ad__header-menu-principal').find('a'),
    $btnMenuCollapse = $('.navbar-toggle');

//////////////////

/// Mostrar / Ocultar el logo infantil
function logoInfantil(infantil){
    if(infantil){ 
        $logoInfantil.show().prev().hide();
    } else {
        $logoInfantil.hide().prev().show();
    }
}

/// Agregar toggle collapse al menú
function appendToggle(){
    if($btnMenuCollapse.css('display') == 'block'){
        $menuItemsCollapse.attr({
            'data-toggle': "collapse",
            'data-target': ".navbar-collapse"
        });
    } else {
        $menuItemsCollapse.removeAttr('data-toggle data-target');
    }
}