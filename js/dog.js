function Dog(name = "Dog") {
    this.name = name;

}

Dog.prototype.wiggle = function() {
    console.log(`${this.name} wiggles its tail.`);
}