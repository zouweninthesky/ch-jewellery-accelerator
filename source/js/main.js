'use strict';

(function () {
  var mainHeader = document.querySelector('.main-header');
  var footerForm = document.querySelector('#footer-form');
  var loginButton = document.querySelector('#login-button');
  var loginPopup = document.querySelector('#login');
  var loginInputEmail = loginPopup.querySelector('#login-email');
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
  var ERROR_MESSAGE_EMAIL = 'Enter correct E-mail';
  var ERROR_MESSAGE_PASSWORD = 'Enter password';
  var sliderMobileWidth = '130px';
  var sliderTabletWidth = '324px';
  var sliderDesktopWidth = '23.1%';

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
        if (target === mainHeader) {
          body.classList.toggle('scroll-disabled');
        }
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

  var onTransition = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      var button = popup.querySelector('button');
      if (button) {
        button.focus();
      }
    }
  };

  var onFormLinkClick = function (form) {
    if (form) {
      var submitButton = form.querySelector('#submit');
      if (submitButton) {
        submitButton.addEventListener('click', function (evt) {
          evt.preventDefault();
          if (form.requestSubmit) {
            form.checkValidity();
            form.requestSubmit();
          } else {
            form.submit();
          }
        });
      }
    }
  };

  var checkEmail = function (input) {
    if (input) {
      if (input.value.match(REGULAR_EXPRESSION)) {
        input.setCustomValidity('');
      } else {
        input.setCustomValidity(ERROR_MESSAGE_EMAIL);
      }
    }
  };

  var checkPassword = function (input) {
    if (input) {
      if (input.value !== '') {
        input.setCustomValidity('');
      } else {
        input.setCustomValidity(ERROR_MESSAGE_EMAIL);
      }
    }
  };

  var onFormSubmit = function (form) {
    if (form) {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        var emailInput = form.querySelector('input[name="email"]');
        if (emailInput.value.match(REGULAR_EXPRESSION)) {
          emailInput.setCustomValidity('');
          var passwordInput = form.querySelector('input[name="password"]');
          if (passwordInput) {
            if (passwordInput.value) {
              passwordInput.setCustomValidity('');

              setLocalStorage(emailInput);
              form.submit();
            } else {
              passwordInput.setCustomValidity(ERROR_MESSAGE_PASSWORD);
              passwordInput.reportValidity();
              var checkThisPassword = function () {
                checkPassword(passwordInput);
              };
              passwordInput.addEventListener('input', checkThisPassword);
            }
          } else {
            form.submit();
          }
        } else {
          emailInput.setCustomValidity(ERROR_MESSAGE_EMAIL);
          emailInput.reportValidity();
          var checkThisEmail = function () {
            checkEmail(emailInput);
          };
          emailInput.addEventListener('input', checkThisEmail);
        }
      });
    }
  };

  var closePopup = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      var popupButton = popup.querySelector('button');
      popup.removeEventListener('transitionend', onTransition);
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
      popup.addEventListener('transitionend', onTransition);
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
        if (loginInputEmail) {
          loginInputEmail.focus();
          var form = popup.querySelector('form');
          if (form) {
            onFormLinkClick(form);
            onFormSubmit(form);
          }
        }
      } else {
        popupButton.focus();
      }
    }

    document.addEventListener('keydown', onPopupEscPress);
    body.classList.add('scroll-disabled');
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

    if (footerForm) {
      onFormLinkClick(footerForm);
      onFormSubmit(footerForm);
    }

    if (faqAccordeon) {
      var faqAccordeonItems = faqAccordeon.querySelectorAll('li');
      initAccordeon(faqAccordeonItems);
    }

    if (filterPopup) {
      if (filterButton) {
        toggleJSClass(filterPopup);
        initPopupButton(filterButton, filterPopup);
      }
    }

    if (catalogAccordeon) {
      var catalogAccordeonItems = catalogAccordeon.querySelectorAll('.catalog__sub-menu');
      if (catalogAccordeonItems) {
        initAccordeon(catalogAccordeonItems);
      }
    }

    if (slider) {
      new Splide(slider, {
        perPage: 4,
        fixedWidth: sliderDesktopWidth,
        breakpoints: {
          1024: {
            perPage: 2,
            fixedWidth: sliderTabletWidth
          },
          767: {
            perPage: 2,
            fixedWidth: sliderMobileWidth
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
