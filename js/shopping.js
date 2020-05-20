const createItem = (itemString, bool = false) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute('class', 'item');

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = bool;

    let label = document.createElement("label");
    label.innerHTML = itemString;

    newDiv.appendChild(checkbox);
    newDiv.appendChild(label);

    let currentDiv = document.getElementById("list");

    label.addEventListener("click", function selectItem() {
        if (selectedItem === newDiv)
            selectedItem = null;
        else
            selectedItem = newDiv;

        highLight();
    })
    
    checkbox.addEventListener("change", e => {
        let item = e.target.parentNode.children[1].innerHTML;
        if (e.target.checked) {
            localStorage.setItem(item, "true");
        }
        else {
            localStorage.setItem(item, "false");
        }
    })

    currentDiv.appendChild(newDiv);
}

let selectedItem = null;
const items = localStorage.getItem('items');

if (items) {
    for (const token of items.split(' ')) {
        let checked = localStorage.getItem(token) === "true";
        createItem(token, checked);
    }
}

const highLight = () => {
    for (const item of document.getElementById("list").children) {

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

const addItem = () => {
    let item = prompt("Which item do you want to add?");
    localStorage.setItem(item, "false");
    
    let itemsInner = localStorage.getItem('items');
    if (!itemsInner) {
        localStorage.setItem('items', item);
    }
    else {
        localStorage.setItem('items', itemsInner + ` ${item}`);
    }

    if (item !== null) {
        createItem(item, false);
    }
}

const deleteItem = () => {
    if (selectedItem !== null) {
        let test = selectedItem.children[1].innerHTML;
        localStorage.removeItem(test);
        let itemsInner = localStorage.getItem('items');
        localStorage.setItem('items', itemsInner.replace(test, '').trim());
        selectedItem.remove();
        selectedItem = null;
    }
}

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);

const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", deleteItem);