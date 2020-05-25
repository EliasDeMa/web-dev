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
    constructor() {
        this.cars = [];
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

let selectedItem = null;
const addButton = document.getElementById('add-button');
const deleteButton = document.getElementById('delete-button');
const editButton = document.getElementById('edit-button');
const ul = document.getElementById('car-ul');
const carList = (() => {
    const storage = localStorage.getItem('list');
    if (storage) {
        let carListInner = new CarList();
        Object.assign(carListInner, JSON.parse(storage));

        for (let index = 0; index < carListInner.cars.length; index++) {
            let car = new Car();
            Object.assign(car, carListInner.cars[index]);
            carListInner.cars[index] = car;
        }

        return carListInner;
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

addButton.addEventListener('click', () => {
    let make = prompt('enter make of car');
    let model = prompt('enter model of car');
    let year = Number(prompt('enter year of manufacture')); 

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
    // body
    if (selectedItem !== null) {
        const index = Number(selectedItem.getAttribute('id').replace('car-', ''));
        let car = carList.cars[index];

        let make = prompt('enter make of car', car.make);
        let model = prompt('enter model of car', car.model);
        let year = Number(prompt('enter year of manufacture', car.year)); 

        const newCar = new Car(make, model, year);
        carList.cars[index] = newCar;

        selectedItem.innerHTML = newCar.toString();
        
        updateStorage();
        selectedItem = null;

        highLight();
    }
});