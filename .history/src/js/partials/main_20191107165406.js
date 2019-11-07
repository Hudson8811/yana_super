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
    ///////////////////////////section-1
    if ($('.s-trailer__title:visible').length > 0) {
        var scene_m = document.getElementById('main-parallax-scene');
        var parallaxInstance = new Parallax(scene_m);
    }

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
});

$('.mobile-menu').click(function () {
    $(this).toggleClass('active');
    $('.mobile-menu-container').toggleClass('active');
});
