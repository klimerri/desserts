function changeDataCount () {

}

const addButtons = document.querySelectorAll('.button__add');
const activeButtons = document.querySelectorAll('.button__active');
const incrementButtons = document.querySelectorAll('.increment');
const decrementButtons = document.querySelectorAll('.decrement'); 

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.display = 'none'; 

        dataButton = button.getAttribute("data-button-name");

        activeButtons.forEach(button => {
            dataSearchButton = button.getAttribute("data-button-name");

            if (dataButton === dataSearchButton) {
                button.style.display = 'flex';

                const span = button.querySelector('span');

                dataCount = button.getAttribute("data-count");
                newData = +dataCount + 1;
                span.textContent = newData;

                button.setAttribute("data-count", newData);
            }
        })
    })
})

incrementButtons.forEach(button => {
    button.addEventListener('click', () => {
        parentBlock = button.parentNode;
        const span = parentBlock.querySelector('span');

        dataCount = parentBlock.getAttribute("data-count");
        newData = +dataCount + 1;
        span.textContent = newData;

        parentBlock.setAttribute("data-count", newData);
    })
})

decrementButtons.forEach(button => {
    button.addEventListener('click', () => {
        parentBlock = button.parentNode;
        const span = parentBlock.querySelector('span');

        dataCount = parentBlock.getAttribute("data-count");
        newData = +dataCount - 1;
        span.textContent = newData;

        parentBlock.setAttribute("data-count", newData);
    })
})