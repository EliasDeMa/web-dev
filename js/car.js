export class Car {
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