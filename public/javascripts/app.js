var dragging = 0; //Get around chrome bug
$('#drop').on("dragenter", function(e){
    dragging++;
    $('#drop').addClass("bubble");
    e.preventDefault();
    return false;
});

$('#drop').on("dragover", function(e){
    $('#drop').addClass("bubble");
    e.preventDefault();
    return false;
});

$('#drop').on("dragleave", function(e){
    dragging--;
    if (dragging === 0) {
      $('#drop').removeClass("bubble");
    }
    e.preventDefault();
    return false;
});
