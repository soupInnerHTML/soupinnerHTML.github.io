let encodeInput = document.querySelector('#encode_input'),
	decodeInput = document.querySelector('#decode_input'),
	encodeSubmitBtn = document.querySelector('#encode_btn'),
	decodeSubmitBtn = document.querySelector('#decode_btn'),
	getCode = code => {
		let alpha = (code.charCodeAt(0) - 1071) / 4 + 1.99
		return Math.trunc(alpha) + '' + Math.round( (alpha % 1).toFixed(1) * 4)
	},

	getChar = char => {
		let alpha = char != 11 ? (( (char + '')[0] - 2) * 4) + char % 10 + 1071 : 32
		return String.fromCharCode(alpha)
	}

encodeSubmitBtn.addEventListener('click', () => {
	// filter(char => !/[\da-zA-z]/g.test(char) || wrong() )
	let toEncode = encode_input.value.split``
	decode_input.value = toEncode.map(char => getCode(char.toLowerCase() ).replace(/-257-3/g, '11')).join``
})

decodeSubmitBtn.addEventListener('click', () => {
	let toDecode = decode_input.value.match(/\d{2}/g)
	encode_input.value = toDecode.map(getChar).join``
})

encodeInput.addEventListener('input', function() {
	if(/[\da-z]/gi.test(this.value) ) {
		encodeSubmitBtn.classList.add('btn-danger')
		encodeSubmitBtn.classList.remove('btn-light')
		encodeSubmitBtn.setAttribute('disabled', 'disabled')
	}
	else {
		encodeSubmitBtn.classList.remove('btn-danger')
		encodeSubmitBtn.classList.add('btn-light')
		encodeSubmitBtn.removeAttribute('disabled')

		let toEncode = encode_input.value.split``
		decode_input.value = toEncode.map(char => getCode(char.toLowerCase() ).replace(/-257-3/g, '11')).join``
	}

})

decodeInput.addEventListener('input', function() {
	let toDecode = decode_input.value.match(/\d{2}/g) || [],
		invalidCode = false


	if(toDecode.length){
		toDecode.forEach(int => {
			if(int > 94 | int % 10 > 4 | /10|12|13|14/.test(int)) {
				invalidCode = true
			}
		});
	}

	if(!/\D/g.test(this.value) && this.value.length > 1 && !invalidCode) {
		decodeSubmitBtn.classList.remove('btn-danger')
		decodeSubmitBtn.classList.add('btn-dark')
		decodeSubmitBtn.removeAttribute('disabled')


		encode_input.value = toDecode.map(getChar).join``
	}
	else {
		decodeSubmitBtn.classList.add('btn-danger')
		decodeSubmitBtn.classList.remove('btn-dark')
		decodeSubmitBtn.setAttribute('disabled', 'disabled')
	}

})



