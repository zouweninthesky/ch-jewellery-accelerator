'use strict';
var mainHeader = document.querySelector('.main-header');
var toggleButton = mainHeader.querySelector('#toggle-button');


var toggleMenu = function () {
  mainHeader.classList.toggle('main-header--closed');
};


toggleMenu();

toggleButton.addEventListener('click', toggleMenu);
