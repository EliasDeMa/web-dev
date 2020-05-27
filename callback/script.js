const succes = (num) => {
    console.log(`You won with a throw of: ${num}`);
}

const error = (num) => {
    console.error(`You threw a ${num}, you lose`);
}

const rollADice = (succesCallback, errorCallback) => {
    const num = Math.floor((Math.random() * 6) + 1);

    if (num !== 5) {
        succesCallback(num);
    } else {
        errorCallback(num);
    }
}

rollADice(succes, error);