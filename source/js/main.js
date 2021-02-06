'use strict';
var mainHeader = document.querySelector('.main-header');

var faqAccordeon = document.querySelector('#faq-accordeon');
var catalogMenu = document.querySelector('#catalog-menu');
var catalogAccordeon = document.querySelector('#catalog-accordeon');

var toggleHidden = function (target) {
  target.classList.toggle(target.className.split(' ')[0] + '--closed');
};

var initToggleHidden = function (target) {
  if (target) {
    var button = target.querySelector('button');
    button.addEventListener('click', function () {
      toggleHidden(target);
    });
  }
};

var initAccordeon = function (itemsGroup) {
  if (itemsGroup) {
    for (var i = 0; i <= itemsGroup.length; i++) {
      initToggleHidden(itemsGroup[i]);
    }
  }
};

// var openPopup = function (target) {

// };

// var initFilter = function () {
//   if(catalogMenu) {
//     toggleHidden(catalogMenu);
//   }
// }

var initJS = function () {
  if (faqAccordeon) {
    var faqAccordeonItems = faqAccordeon.querySelectorAll('li');
    initAccordeon(faqAccordeonItems);
  }

  // if (catalogMenu) {

  // }

  if (catalogAccordeon) {
    var catalogAccordeonItems = catalogAccordeon.querySelectorAll('.catalog__sub-menu');
    initAccordeon(catalogAccordeonItems);
  }

  toggleHidden(mainHeader);

  initToggleHidden(mainHeader);

  initToggleHidden(catalogMenu);
};

initJS();

var range = document.querySelector('#range');

if (range) {
  noUiSlider.create(range, {
    start: [40, 60],
    behaviour: 'snap',
    connect: true,
    range: {
      'min': 20,
      'max': 80
    }
  });
}
