/// Video

var $videoBtn = $('.ad__header-video a'),
    $videoModal = $('#videoComercial'),
    $videoBtnClose = $('.ad__video-modal-content .close'),
    $videoModalIframe = $('#video'),
    $videoSrc = null;

//////////////////

/// Abrir el video
function openVideo(){
    $videoBtn.click(function(e){
        e.preventDefault();
        $videoSrc = $(this).data('src');
        /// Temporal: Cuando ya tengan el video ok, poner el de abajo (que es el youtube)
        $videoModalIframe.attr('src', $videoSrc);
        //$videoModalIframe.attr('src', $videoSrc + '?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1');
        showModal($videoModal, null, true);
    });
}