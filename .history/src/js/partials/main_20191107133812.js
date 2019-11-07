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

    var scene_m = document.getElementById('main-parallax-scene');
    var parallaxInstance = new Parallax(scene_m);

    ///////////////////////////section-2

    var video_m = $(".s-trailer__video-container video");
    if (video_m.length > 0) {
        video_m.controls = false;

        $(".s-trailer__video-container video, .s-trailer__video-container .play-btn").click(function () {
            var video = $(".team-video-block video")[0];
            $(".team-video-block .play-vid").attr("style", "display:none");
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
});
