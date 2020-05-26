import { Car } from './car.js';
import { 
    openForm, 
    closeForm, 
    resetFormElements, 
    getFormElements, 
    setFormElements,
    highLight
} from './formManipulation.js';
import { CarList } from './carList.js';

/**
 * 
 * @param {string} key 
 * @param {any} value 
 */
const listReviver = (key, value) => {
    if (!isNaN(key) && key.length > 0) {
        return Object.assign(new Car(), value);
    }
    else if (key.length === 0) {
        return Object.assign(new CarList(), value);
    }

    return value;
}

const addButton = document.getElementById('add-button');
const deleteButton = document.getElementById('delete-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-btn');
const cancelButton = document.getElementById('cancel-btn');
const popupForm = document.getElementById("popup-Form");
const ul = document.getElementById('car-ul');

let selectedItem = null;
let edit = false;
const carList = (() => {
    const storage = localStorage.getItem('list');

    if (storage) {
        return JSON.parse(storage, listReviver);
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

        highLight(ul, selectedItem);
    })
    return li;
}

(() => {
    carList.cars.forEach((element, index) => {
        ul.appendChild(createLi(element, index));
    });
})();

const updateStorage = () => {
    localStorage.setItem('list', JSON.stringify(carList))
}

addButton.addEventListener('click', () => {
    edit = false;
    resetFormElements();
    openForm(popupForm);
});

deleteButton.addEventListener('click', () => {
    if (selectedItem !== null) {
        let index = Number(selectedItem.getAttribute('id').replace('car-', ''));
        selectedItem.remove();
        carList.deleteCarIndex(index);
        updateStorage();
        selectedItem = null;

        highLight(ul, selectedItem);
    }
});

editButton.addEventListener('click', () => {
    if (selectedItem !== null) {
        const index = Number(selectedItem.getAttribute('id').replace('car-', ''));
        let car = carList.cars[index];

        setFormElements(car.make, car.model, car.year);
        edit = true;

        openForm(popupForm);
        highLight(ul, selectedItem);
    }
});

submitButton.addEventListener('click', function () {
    const {make, model, year} = getFormElements();
    let car = new Car(make, model, year);

    if (edit) {
        const index = Number(selectedItem.getAttribute('id').replace('car-', ''));
        carList.cars[index] = car;
        selectedItem.innerHTML = car.toString();
        selectedItem = null;
    }
    else {
        carList.addCar(car);
        ul.appendChild(createLi(car, carList.cars.length-1));
    }

    highLight();
    resetFormElements();
    updateStorage(); 
    closeForm(popupForm);
});

cancelButton.addEventListener('click', () => closeForm(popupForm));
