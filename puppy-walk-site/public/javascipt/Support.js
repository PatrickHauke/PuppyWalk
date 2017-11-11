// console.log('Support.js Loaded!');

$('#endSession').click(function(){
  disconnect();
  window.location.href = '/';
  // console.log('run');
  return false;
});

$('#showStats').click(function(){
  $('.bandwidth-text').toggleClass('hideText');
});

$("#menu-toggle").click(function() {
  // e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  $("#menu-toggle").toggleClass("toggled");
});

//slider image toggle
$(document).ready(function(){
  $("#slide-toggle").click(function() {
    $(".slide-structure").toggleClass("toggled");
    $("#workspace").toggleClass("toggled");
    $(".slideBTN").toggleClass("toggled");
    $("#background").toggleClass("toggled");
    $("#drag1").toggleClass("toggled");
    $("#crosshair").toggleClass("toggled");
  });

  $("#side-comments").click(function() {
    $("#comment-arrow").toggleClass("toggled");
  });

  $("#details-info").click(function() {
    $("#details-arrow").toggleClass("toggled");
  });

});


// $("#muteSelf").click(function(){
//   $("#muteSelf").toggleClass("muteClicked");
//   muteSelf();
//   console.log('selfToggled');
// });

// $("#muteOther").click(function(){
//   $("#muteOther").toggleClass("muteClicked");
//   muteOther();
//   console.log('otherToggled');
// });


// $("#Capture").click(function(){
//   console.log('take picture');
// });

$("#Stitching").click(function(){
  console.log('start stitching');
});

// JOYSTICK RELATED FADE AND CTRL LISTENERS

$(document).ready(function(){
  requestValidation();

  $('#controller').mouseenter(function(){
    $('#controller').removeClass('hideJoystick');
    $('#streamLog').removeClass('push-up');
    // console.log('joystick entered!');
  });
  
  $('#controller').mouseleave(function(){
    $('#controller').addClass('hideJoystick');
    $('#streamLog').addClass('push-up');
    // console.log('joystick left. Should fade');
  });
  // ImageCapture();
});

// Disables validation for audio and viewer routes
// if(($('#mediaOut').attr("name") === 'n') || ($('#mediaOut').attr("name") === 'a')){
if(true){ // Bypass need for validation
  socketByPass();
  // console.log('message n!');
}
else {
  $("#validationPageLock").modal({backdrop:'static', keyboard:false});
  $('#streamLog').addClass('hide');
  $('#ToggleStats').addClass('hide');
  $('#endSession').addClass('adjustFF');
}

// console.log(adapter);
if(adapter.browserDetails.browser === 'firefox'){
  $('#streamLog').addClass('hide');
  $('#ToggleStats').addClass('hide');
  $('#endSession').addClass('adjustFF');
  // console.log('elem disabled');
}
