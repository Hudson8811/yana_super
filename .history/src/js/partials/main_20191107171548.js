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



    /////////////////homepage-apples

    var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

});
