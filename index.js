const wordEl = document.getElementById('word');
const hintEl = document.getElementById('hint'); 
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const wordsWithHints = [
  { word: 'application', hint: 'A software program designed to perform a specific function for the user.' },
  { word: 'programming', hint: 'The process of writing instructions for a computer to execute.' },
  { word: 'interface', hint: 'A point of interaction between two systems or components.' },
  { word: 'html', hint: 'A markup language used for creating and formatting web pages.' },
  { word: 'javascript', hint: 'A programming language commonly used to create interactive effects within web browsers.' },
  { word: 'java', hint: 'A high-level programming language used to create applications.' }
];

let selectedWordObj = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
let selectedWord = selectedWordObj.word;
let selectedHint = selectedWordObj.hint;

let playable = true;

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃';
		finalMessageRevealWord.innerText = '';
		popup.style.display = 'flex';

		playable = false;
	}
}

function updateWrongLettersEl() {
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
  `;
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost. 😕';
		finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}

function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

playAgainBtn.addEventListener('click', () => {
	playable = true;
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWordObj = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
	selectedWord = selectedWordObj.word;
	selectedHint = selectedWordObj.hint;

	displayWord();
	updateWrongLettersEl();

	popup.style.display = 'none';
});

function displayHint() {
    hintEl.innerText = selectedHint;
}

displayWord();
displayHint(); 
