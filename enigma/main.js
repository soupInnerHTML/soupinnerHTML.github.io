// param
const encodeInput = document.querySelector('#encode_input'),
decodeInput = document.querySelector('#decode_input'),
encodeSubmitBtn = document.querySelector('#encode_btn'),
decodeSubmitBtn = document.querySelector('#decode_btn'),
codeRatio = 1071

// func
getCode = code => {
	let alpha = ((code.charCodeAt(0) == 32 ? 'Ь' : code).charCodeAt(0) - codeRatio) / 4 + 1.99
	return ~~alpha + '' + Math.round( (alpha % 1) * 4)
},
getChar = char => {
	let beta = (( (char + '')[0] - 2) * 4) + char % 10 + codeRatio
	return String.fromCharCode(beta).replace('Ь', ' ')
};

// main

// encodeSubmitBtn.addEventListener('click', () => {
// 	let toEncode = encode_input.value.split``
// 	console.log(toEncode)
// 	decode_input.value = toEncode.map(char => getCode(char.toLowerCase() )).join``
// })

// decodeSubmitBtn.addEventListener('click', () => {
// 	let toDecode = decode_input.value.match(/\d{2}/g)
// 	encode_input.value = toDecode.map(getChar).join``
// })

encodeInput.addEventListener('input', function() {
	if(/[^а-я\s]/gi.test(this.value) ) {
		encodeSubmitBtn.classList.add('btn-danger')
		encodeSubmitBtn.classList.remove('btn-light')
		encodeSubmitBtn.setAttribute('disabled', 'disabled')
	}
	else {
		encodeSubmitBtn.classList.remove('btn-danger')
		encodeSubmitBtn.classList.add('btn-light')
		encodeSubmitBtn.removeAttribute('disabled')

		let toEncode = [...encode_input.value]
		decode_input.value = toEncode.map(char => getCode(char.toLowerCase() )).join``
	}

});

decodeInput.addEventListener('input', function() {
	let toDecode = decode_input.value.match(/\d{2}/g) || [],
		invalidCode = false


	if(toDecode.length){
		toDecode.forEach(int => {
			if(int > 94 | int % 10 > 4 | !(int % 10) | /1(0|2|3|4)/.test(int)) {
				invalidCode = true
			}
		})
	}

	if(!/\D/g.test(this.value) & this.value.length != 1 & !invalidCode) {
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

});