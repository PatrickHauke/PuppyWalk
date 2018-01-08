$(function(){
    // mobile menu slide from the left
    $('[data-toggle="collapse"]').on('click', function() {
        $navMenuCont = $($(this).data('target'));
        //Determine transition time   
        $navMenuCont.animate({'width':'toggle'}, 280);
    });
})