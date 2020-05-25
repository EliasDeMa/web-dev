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
const addButton = document.getElementById('add-button');
const deleteButton = document.getElementById('delete-button');
const editButton = document.getElementById('edit-button');
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
    const {make, model, year} = carPrompts();

    let car = new Car(make, model, year);
    carList.addCar(car);

    updateStorage();
    ul.appendChild(createLi(car, carList.cars.length-1));
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

        const {make, model, year} = carPrompts(car.make, car.model, car.year);

        const newCar = new Car(make, model, year);
        carList.cars[index] = newCar;

        selectedItem.innerHTML = newCar.toString();
        
        updateStorage();
        selectedItem = null;

        highLight();
    }
});