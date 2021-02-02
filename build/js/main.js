const mainHeader = document.querySelector('.main-header');
const toggleButton = mainHeader.querySelector('#toggle-button');


const toggleMenu = function () {
	mainHeader.classList.toggle('main-header--closed');
}


toggleMenu();

toggleButton.addEventListener('click', toggleMenu);