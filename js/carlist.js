import {Car} from './car.js';

export class CarList {
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