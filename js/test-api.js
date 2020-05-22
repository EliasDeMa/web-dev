const url = "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=";
const ul = document.getElementById('list');
const amount = document.getElementById('amount');
const button = document.getElementById('button');

const clearList = (ul) => {
    while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
    }
}

const getFacts = async (url) => {
    let result = await fetch(url);
    let facts  = await result.json();
        
    return facts;
}

const createList = (facts) => {
    clearList(ul)

    for (const item of facts) {
        let li = document.createElement('li');
        li.innerHTML = item.text;

        ul.appendChild(li);
    }
}

button.addEventListener('click',async () => {
    let factAmount = amount.value;

    if (factAmount !== "") {
        try {
            let facts = await getFacts(url + factAmount);
            createList(facts);
        } catch (error) {
            alert(error);
        }
    }
});