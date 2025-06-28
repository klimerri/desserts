function addElementToArray (element, array) {
    let elementName = element.getAttribute('data-name');
    let elementCategory = element.getAttribute('data-category');
    let elementCount = element.getAttribute('data-count');
    let elementPrice = element.getAttribute('data-price');

    let dessert = {
        name: elementName,
        category: elementCategory,
        count: elementCount,
        price: elementPrice,
    }

    array.push(dessert);
}

function changeCountDessert (element, array) {
    let elementName = element.getAttribute('data-name');
    let elementCount = element.getAttribute('data-count');

    array?.forEach(dessert => {
        if (dessert.name === elementName) {
            dessert.count = +elementCount;
        }
    })
}

function changeDataCount (operand, element, array) {
    const span = element.querySelector('span');

    let dataCount = element.getAttribute('data-count');
    let newData;

    if (operand === 'plus') {
        newData = +dataCount + 1;
    } else {
        newData = +dataCount - 1;
    }

    span.textContent = newData;

    element.setAttribute('data-count', newData);
    changeCountDessert(element, array);
}

function checkZero (element, newElement) {
    let dataCount = element.getAttribute('data-count');
    
    if (+dataCount === 0) {
        element.style.display = 'none';

        let dataElement = element.getAttribute('data-button-name');

        newElement.forEach(element => {
            let dataSearchElement = element.getAttribute('data-button-name');

            if (dataElement === dataSearchElement) {
                element.style.display = 'flex';
            }
        })
    }
}

const addButtons = document.querySelectorAll('.button__add');
const activeButtons = document.querySelectorAll('.button__active');
const incrementButtons = document.querySelectorAll('.increment');
const decrementButtons = document.querySelectorAll('.decrement'); 
let arrayDesserts = [];

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.display = 'none'; 

        let dataButton = button.getAttribute('data-button-name');

        activeButtons.forEach(button => {
            let dataSearchButton = button.getAttribute('data-button-name');

            if (dataButton === dataSearchButton) {
                button.style.display = 'flex';
                changeDataCount('plus', button);
                addElementToArray(button, arrayDesserts);
            }
        })
    })
})

incrementButtons.forEach(button => {
    button.addEventListener('click', () => {
        let parentBlock = button.parentNode;
        changeDataCount('plus', parentBlock, arrayDesserts);
    })
})

decrementButtons.forEach(button => {
    button.addEventListener('click', () => {
        let parentBlock = button.parentNode;
        changeDataCount('minus', parentBlock, arrayDesserts);
        checkZero(parentBlock, addButtons);
    })
})