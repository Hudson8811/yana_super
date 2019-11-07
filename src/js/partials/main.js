function detectmob() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        $( window ).width() < 1024
    ) {
        return true;
    } else {
        return false;
    }
}

$(document).ready(function() {

    $('.mobile-menu').click(function () {
        $(this).toggleClass('active');
        $('.mobile-menu-container').toggleClass('active');
    });

});
