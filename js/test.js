// 1
// alert('Hello World!');

// 2
const greet = name => alert(`Hello ${document.getElementById('name').value}`)

// 3
// alert('enter birthyear and one other year')

const clickDates = () => {
    printDates(document.getElementById('year1').value, document.getElementById('year2').value);
}

const printDates = (birthYear, otherYear) => {
    alert(`You were ${otherYear - birthYear}/${otherYear - birthYear - 1} years old then.`);
}

// 4
const calcRadius = (radius) => {
    alert(`The circumference is: ${radius * 2 * Math.PI}\nThe area is: ${radius * radius * Math.PI}\n`);
}

// 5
const calcTemp = (temp) => {
    alert(`the temperature in Fahrenheit is: ${temp * 1.8 + 32}`);
}

// 6
const sortLetters = (word) => {
    let sorted = word.toLowerCase()
        .split('')
        .sort((a, b) => a.localeCompare(b))
        .join('');

    alert(`the letters sorted give: ${sorted}`);
}

// 7
const longestWord = (sentence) => {
    let lengths = sentence.split(' ').map(l =>  l.length);
    let index = lengths.findIndex(x => x === Math.max(...lengths));

    alert(`${sentence.split(' ')[index]} is the longest word`);
}

// 8
const repeatingLetter = (word) => {
    let filtered = word
        .split('')
        .filter(l => word.split(l).length - 1 == 1);

    alert(`first nonrepeating letter is ${filtered[0]}`);
}

// 9
const evenOdd = () => {
    for (let i = 1; i < 21; i++) {
        if (i % 2 === 0)
            console.log(`${i}: even`);
        else
        console.log(`${i}: odd`);
    }
}

// evenOdd();

// 10
const filterEven = () => {
    let filtered = [...Array(20).keys()]
        .map(x => x + 1)
        .filter(x => x % 2 == 0);

    console.log(filtered);
}

// filterEven();

// 11
const inArray = (item, arr) => {
    let bool = false;

    for (const key of arr) {
        if (key === item) {
            bool = true;
        }
    }

    console.log(bool);
}

// 12-13
const sum = (...numbers) => {
    let sum = 0;
    
    for (const iterator of numbers) {
        sum += iterator;
    }

    console.log(sum);
}

// 14
const removeRange = (start, end, arr) => arr.filter(x => !(start < x && x < end));

// 15
const toPower = (x, y) => {
    if (y === 0)
        return 1;
    else
        return x * toPower(x, y - 1);
}
