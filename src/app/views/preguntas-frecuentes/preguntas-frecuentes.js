/// Poner clase activa al acordeón

function activeAcordeon(acordeon, clase){
  var trigger = $(acordeon).find('.ad__faqs-title');
  
  //var containers = $(acordeon).find('.ad__collapse');
  

  trigger.click(function(e){
    e.preventDefault();
    /*var container = $(this).data('target');
    containers.removeClass(clase + ':not' + container);
    $(container).toggleClass(clase);*/
    $(this).parent().toggleClass(clase).siblings().removeClass(clase);
  });
}