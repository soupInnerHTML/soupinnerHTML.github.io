$(document).ready(function() {

	console.time("script time");

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

		checkingForSpaces = state => !state.val().replace(/\s/g, '').length && setError('Это поле обязательно к заполнению!', state),

		ezInputCheck = state => {
			state.blur(function() {
				checkingForSpaces(state);
				typeof checkingForSpaces(state) === 'boolean' && setTrueCheck(state)
			})
		}

	inp.blur(function() {

		/[a-zA-Zа-яА-Я]/g.test(inp.val()) && setTrueCheck(inp);

		if( /[^a-zA-Zа-яА-Я\s]/g.test(inp.val())  ) {
			setError('Введите свое настоящее имя. В нем должны быть только буквы.', inp)
		};

		checkingForSpaces(inp);

	});

	[inp2, inp3].forEach(el => ezInputCheck(el))


	inp4.blur(function() {
		/мужской|женский/gi.test(inp4.val()) ? setTrueCheck(inp4) : setError('Введите существующий пол: мужской или женский', inp4)
		checkingForSpaces(inp4);
	})

	$('.modal-body .btn-join').click(function(event) {
		console.time("form time");

		event.preventDefault()
		$('input').blur();
		let checkMark = 0;
		[0, 1, 2, 3].forEach(i => {
			if($('.check-from').eq(i).attr('src') === 'img/Group 325.svg') checkMark++
		})
		if(checkMark === 4) {
			$.ajax({
				url: 'https://oknavostok.com/wp-content/themes/vostok/ajax.php',
				data: {
				    inp      : inp.val(),
				    inp2     : inp2.val(),
				    inp3     : inp3.val(),
				    inp4     : inp4.val(),
				    caesar_mailing : true,
				},
				method  : 'GET',
				cache   : false,
				error    : ()   => {
					$('#modalError').modal('show')
				},
				success : data => {
					$('#modalSuccess').modal('show')
					ObjectOfResponse = {
						"Имя" : data.split('\n')[0],
						"Родной населенный пункт" : data.split('\n')[1],
						"Род деятельности" : data.split('\n')[2],
						"Пол" : data.split('\n')[3],
					}
					console.table(ObjectOfResponse)
					console.timeEnd("form time");
				}
			})

			$('.close').click();
			$('.modal-form')[0].reset();
			$('.check-from').attr('src', '')

		}

	});


	$('.plus, .btn.btn-link').click(function() {

		$('.plus').html('+')

  		let tgl = $(this).hasClass('plus') ? $(this) : $(this).parent().find($('.plus'))

  		if( !tgl.parentsUntil("#accordionMobile").find( $('.collapse') ).hasClass('show') ) {
  			tgl.html('-')
  		}

  		else tgl.html('+')

  		
    });


	setInterval( () => {
		let x = $('svg line')
	    $('.close, .fancybox-close-small').hover(function() {
	    	x.attr({'stroke': '#7C0105', 'stroke-opacity': '1'})
	    }, function() {
	    	x.attr({'stroke': 'black', 'stroke-opacity': '.5'})
	    })
	}, 1000)

    $('nav a').click(function() {
        $href = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $($href).offset().top - 200
        }, 1000)

        return false;
    });

    $('.thumb').click(function() {
    	$(this).siblings().removeClass('d-none')
    	$(this).addClass('d-none')
    })

    $('.carousel-control-next, .carousel-control-prev').click(function() {
    	$('.thumb').removeClass('d-none')
    	$('.thumb').eq($('.carousel-item.active').index() + 1 > 3 ? 0 : 
    		$('.carousel-item.active').index() + 1).addClass('d-none')
    })

	
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

	let similarReviews = () => {
		if(window.innerWidth <= 575) {
			$('.review-diff').removeClass('review-diff')
		}

		else {
			$('.review').eq(1).addClass('review-diff')
		}
	}

	similarReviews()

	$( window ).resize(similarReviews)

	console.timeEnd("script time");
});