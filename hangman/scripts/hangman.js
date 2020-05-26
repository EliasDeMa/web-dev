export const States = {
    Playing: 0,
    Won: 1,
    Lost: -1
};

export class HangMan {
    constructor(word) {
        this.word = word;
        this.state = States.Playing;
        this.mistakes = 0;
        this.guessedLetters = [];
        this.guessed = [...Array(word.length).keys()]
            .map(_ => false);
    }

    guess(letter) {
        if (this.guessedLetters.indexOf(letter) === -1) {
            const positions = this.getPositions(letter);

            if (positions.length > 0) {
                positions.forEach(i => this.guessed[i] = true);
            } else {
                this.mistakes++;
            }

            this.guessedLetters.push(letter);
        }
        
        this.checkState();
    }

    checkState() {
        if (this.mistakes >= 7) {
            this.state = States.Lost;
        } else if (this.guessed.every(x => x)) {
            this.state = States.Won;
        }
    }

    getPositions(letter) {
        let i = this.word.indexOf(letter);
        let indices = [];

        while (i >= 0) {
            indices.push(i);
            i = this.word.indexOf(letter, i +1);
        }

        return indices;
    }

    toString() {
        return this.guessed.reduce((a, c, i) => c ? a + `${this.word[i]} ` : a + '_ ', '');
    }
}