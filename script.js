const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainBtn = document.getElementById('play-again');
const guessInput = document.getElementById('letterInput');
const guessBtn = document.getElementById('guessBtn');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["javascript", "java", "python", "css", "html"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}
    `;

    const w = word_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        displayPopup('Tebrikler. Kazandınız!');
    }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length === items.length) {
        displayPopup('Maalesef Kaybettiniz.');
    }
}

function displayPopup(message) {
    popup.style.display = 'flex';
    message_el.innerText = message;
}

function displayMessage(msg) {
    message_el.innerText = msg;
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}

PlayAgainBtn.addEventListener('click', function () {
    resetGame();
});

guessBtn.addEventListener('click', function () {
    const guess = guessInput.value.toLowerCase();

    if (guess.length === 1 && guess.match(/[a-z]/i)) {
        handleGuess(guess);
    } else {
        displayMessage('Lütfen geçerli bir harf girin.');
    }

    guessInput.value = ''; // Giriş alanını temizle
});

function resetGame() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
}

function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        } else {
            displayMessage('Bu harfi zaten girdiniz.');
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLetters();
        } else {
            displayMessage('Bu harfi zaten girdiniz.');
        }
    }
}

function checkGameStatus() {
    const w = word_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        displayPopup('Tebrikler. Kazandınız!');
    } else if (wrongLetters.length === items.length) {
        displayPopup('Maalesef Kaybettiniz.');
    }
}

displayWord();
