function detectmob() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        $(window).width() < 1024
    ) {
        return true;
    } else {
        return false;
    }
}

$(document).ready(function () {
    $('.mobile-menu').click(function () {
        $(this).toggleClass('active');
        $('.mobile-menu-container').toggleClass('active');
    });



    ///////////////////////////section-2

    var video_m = $(".s-trailer__video-container video");
    if (video_m.length > 0) {
        video_m.controls = false;

        $(".s-trailer__video-container video, .s-trailer__video-container .play-vid").click(function () {
            var video = video_m[0];
            $(".s-trailer__video-container .play-vid").attr("style", "display:none !important;");
            $(video).attr("style", "display:block !important;");
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }



    /////////////////homepage-apples

    if ($('#home-apples').length > 0) {
        var spy = new Gumshoe('#home-apples a');
    }


    ///////////////////////////section-1
    if ($('.s-trailer__title:visible').length > 0) {
        var scene_m = $('.main-parallax-scene');
        var parallaxInstance = new Parallax(scene_m[0]);
    }
});

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}

$(document).ready(function () {

    if ($('.s-main-top').length > 0) {
        $("a:not([href='javascript:;']):not([href=''])").click(function () {
            $("html, body").animate({
                scrollTop: $(($(this).attr("href")).offset().top + getPosition($(".s-main-top")[0].y)) + "px"
            }, {
                duration: 500,
                easing: "swing"
            });

            if ($('.mobile-menu.active').length > 0) {
                $('.mobile-menu').click();
            }
            return false;
        });
    }


});
