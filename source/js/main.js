'use strict';

(function () {
  var mainHeader = document.querySelector('.main-header');
  var loginButton = document.querySelector('#login-button');
  var loginPopup = document.querySelector('#login');
  var loginInputName = loginPopup.querySelector('#login-name');
  var overlay = document.querySelector('#overlay');
  var faqAccordeon = document.querySelector('#faq-accordeon');
  var filterPopup = document.querySelector('#filter');
  var filterButton = document.querySelector('#filter-button');
  var catalogAccordeon = document.querySelector('#catalog-accordeon');
  var slider = document.querySelector('.splide');
  var range = document.querySelector('#range');
  var addButton = document.querySelector('#add-button');
  var addPopup = document.querySelector('#add');
  var body = document.querySelector('body');
  var ESCAPE = 'Escape';
  var REGULAR_EXPRESSION = /\S+@\S+\.\S+/;
  var ERROR_MESSAGE = 'Enter correct E-mail';


  var toggleJSClass = function (target) {
    target.classList.toggle(target.className.split(' ')[0] + '--js-on');
  };

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
      for (var i = 0; i < itemsGroup.length; i++) {
        toggleHidden(itemsGroup[i]);
        initToggleHidden(itemsGroup[i]);
      }
    }
  };

  var setLocalStorage = function (input) {
    if (input) {
      localStorage.setItem(input.name, input.value);
    }
  };


  var onFormLinkClick = function (form) {
    if (form) {
      var submitButton = form.querySelector('.button');
      submitButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        form.submit();
      });
    }
  };

  var onFormSubmit = function (form) {
    if (form) {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        var nameInput = form.querySelector('input[name="name"]');
        if (nameInput.value.match(REGULAR_EXPRESSION)) {
          setLocalStorage(nameInput);
          form.submit();
        } else {
          nameInput.setCustomValidity(ERROR_MESSAGE);
        }
      });
    }
  };

  var closePopup = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      var popupButton = popup.querySelector('button');
      popup.classList.remove('popup');
      popupButton.removeEventListener('click', closePopup);
    }
    if (overlay) {
      overlay.classList.add('overlay--closed');
      overlay.classList.remove('overlay--dark');
      overlay.removeEventListener('click', closePopup);
    }
    body.classList.remove('scroll-disabled');
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === ESCAPE) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var openPopup = function (popup) {
    if (popup) {
      popup.classList.add('popup');
      var popupButton = popup.querySelector('.close-button');
      popup.classList.remove(popup.className.split(' ')[0] + '--closed');
      popupButton.addEventListener('click', closePopup);

      if (overlay) {
        overlay.classList.remove('overlay--closed');
        overlay.addEventListener('click', closePopup);
        if (popup) {
          if (popup.className.split(' ')[0] === 'added') {
            overlay.classList.add('overlay--dark');
          }
        }
      }

      if (popup.className.split(' ')[0] === 'login') {
        if (loginInputName) {
          loginInputName.focus();
          var form = popup.querySelector('form');
          if (form) {
            onFormLinkClick(form);
            onFormSubmit(form);
          }
        }
      }
    }

    body.classList.add('scroll-disabled');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var initPopupButton = function (target, popup) {
    target.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup(popup);
    });
  };

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
    if (mainHeader) {
      toggleJSClass(mainHeader);
      toggleHidden(mainHeader);
      initToggleHidden(mainHeader);
    }

    if (loginButton) {
      if (loginPopup) {
        initPopupButton(loginButton, loginPopup);
      }
    }

    if (faqAccordeon) {
      var faqAccordeonItems = faqAccordeon.querySelectorAll('li');
      initAccordeon(faqAccordeonItems);
    }

    if (filterPopup) {
      if (filterButton) {
        toggleJSClass(filterPopup);
        toggleHidden(filterPopup);
        initPopupButton(filterButton, filterPopup);
      }
    }

    if (catalogAccordeon) {
      var catalogAccordeonItems = catalogAccordeon.querySelectorAll('.catalog__sub-menu');
      toggleHidden(catalogAccordeon);
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
          767: {
            perPage: 2,
            fixedWidth: '130px'
          }
        }
      }).mount();

      mobilePagination();

      window.addEventListener('resize', mobilePagination);
    }

    if (range) {
      noUiSlider.create(range, {
        start: [36, 67],
        behaviour: 'snap',
        connect: true,
        range: {
          'min': 20,
          'max': 80
        }
      });
    }

    if (addButton) {
      if (addPopup) {
        initPopupButton(addButton, addPopup);
      }
    }
  };

  initJS();
})();
