const States = {
    Running: 1,
    Paused: 0
};

let current = States.Paused;
let tInterval;

const startWatch = () => {
    if (current == States.Paused) {    
        tInterval = setInterval(function stopClicked() {
            console.log(formatTime(startTime));
            startTime += 10;
            document.getElementById("time").innerHTML = formatTime(startTime);
        },
        10);

        current = States.Running;
    }
}

const stopWatch = () => {
    if (current === States.Running) {
        current = States.Paused;
        clearInterval(tInterval);
    }
}

const clearWatch = () => {
    startTime = 0
    document.getElementById("time").innerHTML = formatTime(startTime);
}

const formatTime = (time) => {
    let ms = ((time % 1000) / 10).toFixed(0);
    let seconds = (time / 1000).toFixed(0);
    let minutes = (time / (1000 * 60)).toFixed(0);
    let hours = (time / (1000 * 60 * 60)).toFixed(0);

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}.${ms.padStart(2, '0')}`;
}


const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const clearButton = document.getElementById("clear-button");
let startTime = 0;

startButton.addEventListener("click", startWatch)
stopButton.addEventListener("click", stopWatch)
clearButton.addEventListener("click", clearWatch)
