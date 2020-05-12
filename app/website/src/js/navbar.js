let scrollAnimationDuration = 1000;
let scrollAnimation = 'swing';
let logoHeight = $('#logo').height();
let navIconOffset = 200;

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

    if (scrollPos < getBottomPos($('.infoContainer'))) {
        $('#navbarItems .nav-item.active').removeClass('active');
        $('#homeLink').parent().addClass('active');
    } else if (scrollPos >= getBottomPos($('.aboutUsContainer'))) {
        $('#navbarItems .nav-item.active').removeClass('active');
        $('#teamLink').parent().addClass('active');
    }
    else if (scrollPos >= getBottomPos($('.functionContainer'))) {
        $('#navbarItems .nav-item.active').removeClass('active');
        $('#aboutLink').parent().addClass('active');
    }
    else if (scrollPos >= getBottomPos($('.advantageContainer'))) {
        $('#navbarItems .nav-item.active').removeClass('active');
        $('#functionLink').parent().addClass('active');
    }
    else if (scrollPos >= getBottomPos($('.infoContainer'))) {
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
        {scrollTop: getBottomPos($('.infoContainer'))}, 
        scrollAnimationDuration, 
        scrollAnimation
        );
    });
    
$('#functionLink').click(function() {
    $("html, body").animate(
        {scrollTop: getBottomPos($('.advantageContainer'))},
        scrollAnimationDuration, 
        scrollAnimation
     );
});

$('#aboutLink').click(function() {
    $("html, body").animate(
        {scrollTop: getBottomPos($('.functionContainer'))}, 
        scrollAnimationDuration, 
        scrollAnimation
     );
});

$('#teamLink').click(function() {
    $("html, body").animate(
        {scrollTop: getBottomPos($('.aboutUsContainer'))},
        scrollAnimationDuration, 
        scrollAnimation
     );
});

let getBottomPos = function($el) {
    return parseInt($el.offset().top + $el.outerHeight(false));
}