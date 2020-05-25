'use strict';
class Car {
    /** 
    * @param {string} make
    * @param {string} model
    * @param {number} year 
    */
    constructor(make, model, year) {
        this.make = make;
        this.year = year;
        this.model = model;
    }

    toString() {
        return `${this.make} ${this.model}: ${this.year}`;
    }
}

class CarList {
    /**
     * @param {Car[]} cars
     */
    constructor(cars = []) {
        this.cars = cars;
    }

    addCar(car) {
        this.cars.push(car);
    }

    deleteCarIndex(index) {
        this.cars.splice(index, 1);
    }
}

const highLight = () => {
    for (const item of document.getElementById("car-ul").children) {
        if (item == selectedItem) {
            item.style.background = "lightblue";
            item.style.color = "white";
        }
        else {
            item.style.background = "white";
            item.style.color = "black";
        }
    }
}

/**
 * 
 * @param {string} key 
 * @param {any} value 
 */
const listReviver = (key, value) => {
    if (!isNaN(key) && key.length > 0) {
        let car = new Car();
        Object.assign(car, value);
        return car;
    }
    else if (key.length === 0) {
        return Object.assign(new CarList(), value);
    }

    return value;
}

let selectedItem = null;
let edit = false;
let submitted = false;
const addButton = document.getElementById('add-button');
const deleteButton = document.getElementById('delete-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-btn');
const outside = document.getElementById('outside');
const ul = document.getElementById('car-ul');
const carList = (() => {
    const storage = localStorage.getItem('list');

    if (storage) {
        return JSON.parse(localStorage.getItem('list'), listReviver);
    } else {
        return new CarList();
    }
})();

/**
 * 
 * @param {Car} car 
 * @param {number} index
 */
const createLi = (car, index) => {
    const li = document.createElement('li');
    li.setAttribute('id', `car-${index}`);
    li.innerHTML = car.toString();

    li.addEventListener("click", () => {
        if (selectedItem === li)
            selectedItem = null;
        else
            selectedItem = li;

        highLight();
    })
    return li;
}

const loadList = (() => {
    carList.cars.forEach((element, index) => {
        ul.appendChild(createLi(element, index));
    });
})();

const updateStorage = () => {
    localStorage.setItem('list', JSON.stringify(carList))
}

const carPrompts = (makeInput = "", modelInput = "", yearInput = "") => {
    const make = prompt('enter make of car', makeInput);
    const model = prompt('enter model of car', modelInput);
    const year = Number(prompt('enter year of manufacture', yearInput));

    return {
        make, model, year
    };
}

addButton.addEventListener('click', () => {
    edit = false;
    openForm();
});

deleteButton.addEventListener('click', () => {
    if (selectedItem !== null) {
        let index = Number(selectedItem.getAttribute('id').replace('car-', ''));
        selectedItem.remove();
        carList.deleteCarIndex(index);
        updateStorage();
        selectedItem = null;

        highLight();
    }
});

editButton.addEventListener('click', () => {
    if (selectedItem !== null) {
        const index = Number(selectedItem.getAttribute('id').replace('car-', ''));
        let car = carList.cars[index];

        document.getElementById('make').value = car.make;
        document.getElementById('model').value = car.model;
        document.getElementById('year').value = car.year;
        edit = true;

        openForm();
        highLight();
    }
});

outside.addEventListener('click', () => {
    selectedItem = null;
    highLight();
});

submitButton.addEventListener('click', function () {
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;

    let car = new Car(make, model, year);
    if (edit) {
        const index = Number(selectedItem.getAttribute('id').replace('car-', ''));
        carList.cars[index] = car;
        selectedItem.innerHTML = car.toString();
        selectedItem = null;
        highLight();
    }
    else {
        carList.addCar(car);
        ul.appendChild(createLi(car, carList.cars.length-1));
    }

    document.getElementById('make').value = "";
    document.getElementById('model').value = "";
    document.getElementById('year').value = "";

    updateStorage(); 
    closeForm();
});

function openForm() {
    document.getElementById("popup-Form").style.display = "block";
}

function closeForm() {
    document.getElementById("popup-Form").style.display = "none";
} 