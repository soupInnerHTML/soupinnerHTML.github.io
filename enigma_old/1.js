const   cipher = {                              
        21: 'a', 42: 'й', 64: 'у', 92: 'э',
        22: 'б', 43: 'к', 71: 'ф', 93: 'ю',
        23: 'в', 44: 'л', 72: 'х', 94: 'я',
        24: 'г', 51: 'м', 73: 'ц', 12: ' ',
        31: 'д', 52: 'н', 74: 'ч', 96: ',',
        32: 'е', 53: 'о', 81: 'ш', 97: '!',
        33: 'ё', 54: 'п', 82: 'щ', 11: '?',
        34: 'ж', 61: 'р', 83: 'ъ', 99: '.',
        35: 'з', 62: 'с', 84: 'ы', 'nn': 'v',
        41: 'и', 63: 'т', 91: 'ь'}, _cipher_ = {
                                        'а': 21, 'v': 'nn', 'й': 42, 'у': 64, 
                                        'б': 22, 'к': 43, 'ф': 71, 'ю': 93,
                                        'в': 23, 'л': 44, 'х': 72, 'я': 94,
                                        'г': 24, 'м': 51, 'ц': 73, ' ': 12,
                                        'д': 31, 'н': 52, 'ч': 74, ',': 96,
                                        'е': 32, 'о': 53, 'ш': 81, 'э': 92,
                                        'ё': 33, 'п': 54, 'щ': 82, ',': 96,
                                        'ж': 34, 'р': 61, 'ъ': 83, '!': 97,
                                        'з': 35, 'с': 62, 'ы': 84, '?': 11,
                                        'и': 41, 'т': 63, 'ь': 91, '.': 99,
};

let decode = () => {

        let Array = document.getElementById('input').value.match(/(.{2}|.)/g).
        map(n => !(`'${n}'` in cipher) ? cipher[n] : '$' );

        if( !!Array.includes(undefined) ) {
                document.getElementById('output').value = 'Что-то пошло не так, дорогой...';
                document.getElementById('output').classList.add('_');
        } else {
                document.getElementById('output').classList.remove('_');
                document.getElementById('output').value = Array.join('');
        }

}

let encode = () => {
        
        let Array_ = document.getElementById('input2').value.toLowerCase().split('').
        map(z => !(`'${z}'` in _cipher_ ) ? _cipher_[z] : '#' );

        if( !!Array_.includes(undefined) ) {
                document.getElementById('output2').value = 'Что-то пошло не так, дорогой...';
                document.getElementById('output2').classList.add('_');
        } else {
                document.getElementById('output2').classList.remove('_');
                document.getElementById('output2').value = Array_.join('');
        }

}
