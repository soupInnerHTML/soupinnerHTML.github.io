$(document).ready(function() {

	$.fancybox.defaults.animationEffect = "fade";

	$('[data-fancybox="gallery"]').fancybox({
		  smallBtn : true,

		  btnTpl: {

		    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left prev" title="{{PREV}}">' +
		      '<img src="img/Group 305.svg" alt="">' +
		      "</button>",

		    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right next" title="{{NEXT}}">' +
		      '<img src="img/Group 304.svg" alt="">' +
		      "</button>",

		      smallBtn  : '<button type="button" data-fancybox-close="" class="fancybox-button fancybox-close-small" title="Close"><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="-0.5" x2="35.8237" y2="-0.5" transform="matrix(0.687931 0.725776 -0.604482 0.796619 1.29712 1)" stroke="black" stroke-opacity="0.5"/><line y1="-0.5" x2="35.4477" y2="-0.5" transform="matrix(-0.733476 0.679715 -0.554618 -0.832105 26 1)" stroke="black" stroke-opacity="0.5"/></svg></button>'

		  }



	});

	$('[data-fancybox="image"]').fancybox({
		  smallBtn : true,

		  btnTpl: {

		      smallBtn  : '<button type="button" data-fancybox-close="" class="fancybox-button fancybox-close-small fancybox-close-small-image" title="Close"><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="-0.5" x2="35.8237" y2="-0.5" transform="matrix(0.687931 0.725776 -0.604482 0.796619 1.29712 1)" stroke="black" stroke-opacity="0.5"/><line y1="-0.5" x2="35.4477" y2="-0.5" transform="matrix(-0.733476 0.679715 -0.554618 -0.832105 26 1)" stroke="black" stroke-opacity="0.5"/></svg></button>'

		  }



	});

	$('.modal-body .btn-join').click(function(event) {
		event.preventDefault()
		$('input').change();
		let htm = $('.warning')
		if(!htm.eq(0).html() && !htm.eq(1).html() && !htm.eq(2).html() && !htm.eq(3).html()) {
			$('.close, .trigger-form-send').click();
			$('.modal-form')[0].reset();
			$('.check-from').attr('src', '')

		}
	});

	const
		base = name => $(`.modal-input[name="${name}"]`),

		inp  = base("user_name"),
		inp2 = base("user_loc"),
		inp3 = base("user_type"),
		inp4 = base("user_sex"),

		setError = (msg, state) => {
			state.parent().find($('.warning')).html(msg)
			state.parent().find($('.check-from')).attr('src', 'img/Group 326.svg')
		},
		setTrueCheck = state => {
			state.parent().find($('.warning')).html('')
			state.parent().find($('.check-from')).attr('src', 'img/Group 325.svg')
		},

		checkingForSpaces = state => !state.val().length && setError('Это поле обязательно к заполнению!', state),

		ezInputCheck = state => {
			state.change(function() {
				checkingForSpaces(state);

				/\w+/.test(state.val()) && setTrueCheck(state)
			})
		}

	inp.change(function() {

		checkingForSpaces(inp);

		/[a-zA-Zа-яА-Я]/.test(inp.val()) && setTrueCheck(inp);

		if( /\d/g.test(inp.val())  ) {
			setError('Введите свое настоящее имя. В нем должны быть только буквы.', inp)
		};

	});

	[inp2, inp3].forEach(el => ezInputCheck(el))

	inp3.change(function() {

		checkingForSpaces(inp3);

		/\w+/.test(inp3.val()) && setTrueCheck(inp3)
	})

	inp4.change(function() {
		if(inp4.val().toLowerCase() !== 'мужской' || inp4.val().toLowerCase() !== 'женский') {
			setError('Введите существующий пол: мужской или женский', inp4)
		}

		if(inp4.val().toLowerCase() == 'мужской' || inp4.val().toLowerCase() == 'женский') {
			setTrueCheck(inp4)
		}
	})


	$('.plus, .btn.btn-link').click(function() {

		$('.plus').html('+')

  		let tgl = $(this).hasClass('plus') ? $(this) : $(this).parent().find($('.plus'))

  		if( !tgl.parent().parent().parent().find( $('.collapse') ).hasClass('show') ) {
  			tgl.html('-')
  		}

  		else tgl.html('+')

  		
    });


	let x = $('svg line')
    $('.close, .fancybox-close-small').hover(function() {
    	x.attr({'stroke': '#7C0105', 'stroke-opacity': '1'})
    }, function() {
    	x.attr({'stroke': 'black', 'stroke-opacity': '.5'})
    })

    $('.fancybox-button').click(function() {
    	console.log('1')
    })

    $('nav a').click(function() {
        $href = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $($href).offset().top - 200
        }, 500)

        return false;
    });

	
	function animate_number(obj) {
	
		var target_block = $(obj),
			blockStatus = true;
		
		$(window).scroll(function() {
		
			var scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
			
			if(scrollEvent && blockStatus) {
			
				blockStatus = false; // Запрещаем повторное выполнение функции до следующей перезагрузки страницы.
				
				$({numberValue: 0}).animate({numberValue: obj.html()}, {
				
					duration: 2500, // Продолжительность анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд 
					easing: "linear",
					
					step: function(val) {
					
						$(obj).html(Math.ceil(val)); // Блок, где необходимо сделать анимацию
						
					}
					
				});
				
			}
			
		});
		
	}

	for(let i = 0; i < 3; i++){
		animate_number($(".numbers__big-num").eq(i))
	}
	
});