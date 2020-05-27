import { HangMan, States } from './hangman.js';
import { drawGallow } from './drawing.js';

const url = 'https://random-word-api.herokuapp.com/word?number=1';
const draws = [];

const getWord = async (url) => {
    let result = await fetch(url);
    let word   = await result.json();

    return word;
}

let logWord;

(async () => {
    let word = await getWord(url);
    logWord = new HangMan(word[0]);
    window.h = logWord;
    par.innerHTML = logWord.toString();
})();

const submitButton = document.getElementById('submit-btn');
const letter = document.getElementById('input-letter');
const par = document.getElementById('letters');
const myCanvas = document.getElementById('hangman-canvas');
const ctx = myCanvas.getContext('2d');

drawGallow(ctx);

submitButton.addEventListener('click', () => {
    // body
    logWord.guess(letter.value);
    par.innerHTML = logWord.toString();
    for (let i = 0; i < logWord.mistakes; i++) {
        draws[i](ctx);
    }
});
