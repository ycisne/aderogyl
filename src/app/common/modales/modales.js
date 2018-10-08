/// Modales

/// Preguntas frecuentes
var $preguntas = $('.ad__faqs-listado'),
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
    $dataAddPresentacion = 'data-add-class';

//////////////////

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