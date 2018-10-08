/// Administrar los clicks de los anchors de la página

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