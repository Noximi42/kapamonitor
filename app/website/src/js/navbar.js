let scrollAnimationDuration = 1000;
let scrollAnimation = 'swing';
let logoHeight = $('#logo').height();
let navIconOffset = 300;

$('.navbar-nav li a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

$(document).scroll(function() {
    let scrollPos = $(document).scrollTop();

    if (scrollPos <= 100) {
        $('#logo').height(logoHeight);
    } else {
        $('#logo').height('50');
    }

    if (scrollPos < Number($(".advantageContainer").offset().top - navIconOffset)) {
        $('#navbarItems .nav-item.active').removeClass('active');
        $('#homeLink').parent().addClass('active');
    } else if (scrollPos >= Number($(".teamContainer").offset().top - navIconOffset)) {
        $('#navbarItems .nav-item.active').removeClass('active');
        $('#teamLink').parent().addClass('active');
    }
    else if (scrollPos >= Number($(".aboutUsContainer").offset().top - navIconOffset)) {
        $('#navbarItems .nav-item.active').removeClass('active');
        $('#aboutLink').parent().addClass('active');
    }
    else if (scrollPos >= Number($(".functionContainer").offset().top - navIconOffset)) {
        $('#navbarItems .nav-item.active').removeClass('active');
        $('#functionLink').parent().addClass('active');
    }
    else if (scrollPos >= Number($(".advantageContainer").offset().top - navIconOffset)) {
        $('#navbarItems .nav-item.active').removeClass('active');
        $('#advantagesLink').parent().addClass('active');
    }

    $('.navbar-collapse').collapse('hide');
});

$('#homeLink').click(function() {
    $("html, body").animate(
        {scrollTop: 0}, 
        scrollAnimationDuration, 
        scrollAnimation
     );
});

$('#advantagesLink').click(function() {
    $("html, body").animate(
        {scrollTop: $(".advantageContainer").offset().top - 200}, 
        scrollAnimationDuration, 
        scrollAnimation
     );
});

$('#functionLink').click(function() {
    $("html, body").animate(
        {scrollTop: $(".functionContainer").offset().top - 200}, 
        scrollAnimationDuration, 
        scrollAnimation
     );
});

$('#aboutLink').click(function() {
    $("html, body").animate(
        {scrollTop: $(".aboutUsContainer").offset().top - 200}, 
        scrollAnimationDuration, 
        scrollAnimation
     );
});

$('#teamLink').click(function() {
    $("html, body").animate(
        {scrollTop: $(".teamContainer").offset().top - 200}, 
        scrollAnimationDuration, 
        scrollAnimation
     );
});