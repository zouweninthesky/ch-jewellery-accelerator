'use strict';
var mainHeader = document.querySelector('.main-header');

var faqAccordeon = document.querySelector('#faq-accordeon');
var catalogMenu = document.querySelector('#catalog-menu');
var catalogAccordeon = document.querySelector('#catalog-accordeon');
var slider = document.querySelector('.splide');

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

var mobilePagination = function () {
  var pageButtons = slider.querySelector('.splide__pagination').querySelectorAll('button');
  var current = slider.querySelector('#current-page');
  var total = slider.querySelector('#total-pages');

  for (var i = 0; i < pageButtons.length; i++) {
    pageButtons[i].textContent = i + 1;
  }

  current.textContent = slider.querySelector('.splide__pagination').querySelector('.is-active').textContent;
  total.textContent = pageButtons.length;
};

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

  if (slider) {
    new Splide(slider, {
      perPage: 4,
      fixedWidth: '23.1%',
      breakpoints: {
        1024: {
          perPage: 2,
          fixedWidth: '324px'
        },
        768: {
          perPage: 2,
          fixedWidth: '130px'
        }
      }
    }).mount();

    mobilePagination();

    window.addEventListener('resize', mobilePagination);
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
