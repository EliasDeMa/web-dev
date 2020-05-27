import { HangMan, States } from './hangman.js';
import * as Drawing from './drawing.js';

const url = 'https://random-word-api.herokuapp.com/word?number=1';
const draws = [ 
    Drawing.drawGallow, 
    Drawing.drawHead, 
    Drawing.drawTorso, 
    Drawing.drawLeftArm, 
    Drawing.drawRightArm, 
    Drawing.drawLeftLeg, 
    Drawing.drawRightLeg 
];

const getWord = async (url) => {
    let result = await fetch(url);
    let word   = await result.json();

    return word;
}

let logWord;

const loadWord = async () => {
    let word = await getWord(url);
    logWord = new HangMan(word[0]);
    par.innerHTML = logWord.toString();
};

loadWord();

const submitButton = document.getElementById('submit-btn');
const letter = document.getElementById('input-letter');
const par = document.getElementById('letters');
const hangContainer = document.getElementById('hangman-container');
let myCanvas = document.getElementById('hangman-canvas');
let ctx = myCanvas.getContext('2d');

const resetCanvas = () => {
    myCanvas.remove();
    myCanvas = document.createElement('canvas');
    myCanvas.setAttribute('width', '300');
    myCanvas.setAttribute('height', '400');
    ctx = myCanvas.getContext('2d');

    hangContainer.appendChild(myCanvas);
}

submitButton.addEventListener('click', () => {
    // body
    logWord.guess(letter.value);
    par.innerHTML = logWord.toString();

    resetCanvas();

    for (let i = 0; i < logWord.mistakes; i++) {
        draws[i](ctx);
    }

    if (logWord.state === States.Lost) {
        alert("You Lost");
        loadWord();
        resetCanvas();
    } else if (logWord.state === States.Won) {
        alert("You Won");
        loadWord();
        resetCanvas();
    }
});
