$(document).ready(function () {
    $('a'). click(function () {
        $href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $($href).offset().top
        }, 500)
        return false;
    });
    $('html, body').scroll(function () { 
        $(this).animate({
            
        })
    });
});