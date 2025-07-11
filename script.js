function addElementToArray (element, array) {
    let elementId = element.getAttribute('data-id');
    let elementName = element.getAttribute('data-name');
    let elementCategory = element.getAttribute('data-category');
    let elementCount = element.getAttribute('data-count');
    let elementPrice = element.getAttribute('data-price');

    let dessert = {
        id: elementId,
        name: elementName,
        category: elementCategory,
        count: elementCount,
        price: elementPrice,
    }

    array.push(dessert);
}

function changeCountDessert (element, array) {
    const elementId = element.getAttribute('data-id');
    const elementCount = element.getAttribute('data-count');

    array?.forEach(dessert => {
        if (dessert.id === elementId) {
            dessert.count = +elementCount;
        }
    })
}

function addElementToCart (element, array) {
    const wrapper = document.querySelector('.cart__wrapper');
    const elementId = element.getAttribute('data-id');

    array?.forEach(dessert => {
        if (elementId === dessert.id) {
            wrapper.insertAdjacentHTML(
                'beforeend', 
                `<div class="cart__item" data-id="${dessert.id}" >
                    <div class="item__left">
                        <span class="item__header">${dessert.name}</span>

                        <div class="item__info">
                            <span class="item__count">${dessert.count}x</span>
                                                
                            <span class="item__price">@$${dessert.price}</span>

                            <span class="item__full-price">$${dessert.price*dessert.count}</span>
                        </div>
                    </div>
                    <button class="item__button">
                        <img src="./assets/images/icon-remove-item.svg">
                    </button>
                </div>`
            );
            

        }
    })


}

function changeCountToCart (element) {
    const dataId = element.getAttribute('data-id');
    const dataCount = +element.getAttribute('data-count');
    const dataPrice = +element.getAttribute('data-price');
    const array = document.querySelectorAll('.cart__item');

    array.forEach(item => {
        const searchData = item.getAttribute('data-id');

        if (dataId === searchData) {

            let count = item.querySelector('.item__count');
            let fullPrice = item.querySelector('.item__full-price');
            
            count.textContent = `${dataCount}x`;
            fullPrice.textContent = `$${dataCount*dataPrice}`;
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
    console.log(array);
    changeCountDessert(element, array);
}

function deleteElementFromArray (dataElement, array) {
    array.forEach(item => {
        if (item.id === dataElement) {
            const index = array.indexOf(item);

            array.splice(index, 1);

            console.log(array);
        }
    })
}

function checkZero (element, newElement, array) {
    let dataCount = element.getAttribute('data-count');
    
    if (+dataCount === 0) {
        element.style.display = 'none';

        let dataElement = element.getAttribute('data-id');

        newElement.forEach(element => {
            let dataSearchElement = element.getAttribute('data-id');

            if (dataElement === dataSearchElement) {
                element.style.display = 'flex';
            }
        })

        deleteElementFromArray(dataElement, array);
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

        let dataButton = button.getAttribute('data-id');

        activeButtons.forEach(button => {
            let dataSearchButton = button.getAttribute('data-id');

            if (dataButton === dataSearchButton) {
                button.style.display = 'flex';
                changeDataCount('plus', button);
                addElementToArray(button, arrayDesserts);
                addElementToCart(button, arrayDesserts);

                console.log(arrayDesserts);
                
            }
        })
    })
});

incrementButtons.forEach(button => {
    button.addEventListener('click', () => {
        let parentBlock = button.parentNode;
        changeDataCount('plus', parentBlock, arrayDesserts);
        changeCountToCart(parentBlock);
    });
});

decrementButtons.forEach(button => {
    button.addEventListener('click', () => {
        let parentBlock = button.parentNode;
        changeDataCount('minus', parentBlock, arrayDesserts);
        changeCountToCart(parentBlock);
        checkZero(parentBlock, addButtons, arrayDesserts);
    });
});