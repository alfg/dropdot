var dragging = 0; //Get around chrome bug
$('#drop').on("dragenter", function(e){
    dragging++;
    $('#drop').addClass("gloss");
    e.preventDefault();
    return false;
});

$('#drop').on("dragover", function(e){
    $('#drop').addClass("gloss");
    e.preventDefault();
    return false;
});

$('#drop').on("dragleave", function(e){
    dragging--;
    if (dragging === 0) {
      $('#drop').removeClass("gloss");
    }
    e.preventDefault();
    return false;
});
$('.footer-link').click( function(){
    $('.footer-text').hide();
    
    $($(this).attr('href')).fadeIn('fast');
});
