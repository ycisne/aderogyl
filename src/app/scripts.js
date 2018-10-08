
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