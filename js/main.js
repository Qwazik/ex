



/*===============================================
plugins
===============================================*/

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
$(document).ready(function(){
$('.owl-carousel').owlCarousel({
    items: 1,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    loop: true,
    
    

    })
})

/*=============================================
        custom code
=============================================*/


//ajax message
        $('#form1, #form2, #form3').submit(function(){
        var dataForm = $(this).serialize();
        $.ajax({
            method : 'POST',
            url: '../mail.php',
            data: dataForm
        })
        .success(function() {
            alert('Спасибо за сообщение! Мы с вами обязательно свяжемся.')
        });
        return false;
    })
