const addButtons = document.querySelectorAll('.button__add');
const activeButtons = document.querySelectorAll('.button__active');

console.log(addButtons);

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.display = 'none'; 

        dataButton = button.getAttribute("data-button-name");

        activeButtons.forEach(button => {
            dataSearchButton = button.getAttribute("data-button-name");

            if (dataButton === dataSearchButton) {
                button.style.display = 'flex';
            }
        })
    })
})