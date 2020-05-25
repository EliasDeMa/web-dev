class Pizza {
  constructor(name = "pizza", toppings = []) {
    this.name = name;
    this.toppings = toppings;
  }
    
  toString() {
    return `${this.name}: ${this.toppings}`;
  }
}
  
class HawaiiPizza extends Pizza {
  constructor() {
    super("pizza hawaii", ["tomato sauce", 'pineapple', 'mozarella']);
  }
}

const arrow = () => {
    console.log(this);
}

let pizza = new HawaiiPizza();
  
console.log(pizza.toString());
console.log(pizza.toppings);