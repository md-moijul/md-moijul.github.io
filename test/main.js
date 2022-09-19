let viewportHeight = window.innerHeight;



$(document).ready(function() {
    $(window).scroll(function() {
        if (($(this).scrollTop() > viewportHeight) && ($(this).scrollTop() < (viewportHeight * 1.99))) {
            $('nav').addClass("scrolled");
        } else {
            $("nav").removeClass("scrolled");
        }
    });

});