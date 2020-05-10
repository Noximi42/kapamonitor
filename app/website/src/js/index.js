// --- style ---
import '../scss/index.scss';

let breakPoints = {
    xSmall: {
      min: 0,
      max: 575
    },
    small: {
      min: 576,
      max: 767
    },
    medium: {
      min: 768,
      max: 991
    },
    large: {
      min: 992,
      max: 1199
    },
    xLarge: {
      min: 1200,
      max: Infinity
    }
};

const getBreakpoint = function(screenWidth) {
    if (screenWidth < breakPoints.small.min) {
        return "xs";
    } else if (screenWidth < breakPoints.medium.min) {
        return "sm";
    } else if (screenWidth < breakPoints.large.min) {
        return "md";
    } else {
        return "lg";
    }
}

$(window).resize(function() {
    handleCarouselResize();
});
$(window).on('load', function() { 
    handleCarouselResize();
});

const handleCarouselResize = function() {
    let size = getBreakpoint($(window).width());
    
    if (size != "xs" && size != "sm") {
        $('#teamCarousel .carousel-item').each(function() {
            if ($(this).find('.personContainer').length == 1) {
                $(this).removeClass('carousel-item');
            }
        });
    } else {
        $('#teamCarousel .carousel-item-container').each(function() {
            $(this).parent().addClass('carousel-item');
        });
    }
}