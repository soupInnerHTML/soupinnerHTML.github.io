$("[data-inputmask]").inputmask({clearMaskOnLostFocus : false})

$("#navToggle").click(function () {
    $(this).toggleClass("active");
    $(".overlay").toggleClass("open");
    // this line ▼ prevents content scroll-behind
    $("body").toggleClass("locked");
});

$(".overlay a").click(function () {
    $("#navToggle").toggleClass("active");
    $(".overlay").toggleClass("open");
    $("body").toggleClass("locked");
});

$('.video-block__play').click(() =>
{
    $.fancybox.open({
        src  : 'https://www.youtube.com/watch?v=aRwjUejVkGw&amp;feature=emb_logo'
    });
})

let cachedBG = $('.carousel-item.active').data('bg')

$('.nav-dot').click(function() {
    $('.nav-dot').removeClass('active')
    $(this).addClass('active');

    setTimeout(() => {
        let BG = $('.carousel-item.active').data('bg')
        if(cachedBG !== BG){
            $('header').css({
                'background-image': `url("${BG}")`
            });
        }
        cachedBG = BG
        
    }, 0);
})


$('.dropdown-item').click(function (e) { 
    e.preventDefault();
    $('.dropdown-toggle').text($(this).text());
});
