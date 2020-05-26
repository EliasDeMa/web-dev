export const openForm = (form) =>
    form.style.display = "block";


export const closeForm = (form) =>
    form.style.display = "none";

export const resetFormElements = () => {
    document.getElementById('make').value = "";
    document.getElementById('model').value = "";
    document.getElementById('year').value = "";
}

export const getFormElements = () => {
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;

    return {make, model, year};
}

export const setFormElements = (make, model, year) => {
    document.getElementById('make').value = make;
    document.getElementById('model').value = model;
    document.getElementById('year').value = year;
}

export const highLight = (ul, selectedItem) => {
    for (const item of ul.children) {
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