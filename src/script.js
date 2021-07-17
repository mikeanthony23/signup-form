'use strict';
const errWrapper = document.querySelectorAll('.form__item--error');
const formItem = document.querySelectorAll('.form-item');
const inputEl = document.querySelectorAll('.form__input-field');
const submitBtn = document.querySelector('.form__input--btn');

const renderErrorMsg = function (propName) {
  if (propName == 'Email')
    return `<p class="form__item--error-msg">Looks like this is not an ${propName}</p>`;
  return `<p class="form__item--error-msg">${propName} cannot be empty</p>`;
};

const validateEmail = function (email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};
// console.log(validateEmail(`tasdsd@gmail.com`));

const validateInputs = function () {
  Array.from(inputEl).forEach((el, i) => {
    const clear = function () {
      errWrapper[i].innerHTML = '';
    };
    const render = function (propName) {
      errWrapper[i].insertAdjacentHTML('afterbegin', renderErrorMsg(propName));
    };

    if (el.dataset.label === 'first-name' && el.value === '') {
      clear();
      render('First Name');
    }
    if (el.dataset.label === 'last-name' && el.value === '') {
      clear();
      render('Last Name');
    }
    if (el.dataset.label === 'password' && el.value === '') {
      clear();
      render('Password');
    }
    if (el.dataset.label === 'email' && validateEmail(el.value) === true) {
      clear();
      render('Email');
    }

    if (el.value !== '') {
      clear();
    }
  });
};

submitBtn.addEventListener('click', function (e) {
  e.preventDefault(e);
  const btn = e.target.closest('.form__input--btn');
  if (!btn) return;
  validateInputs();
});

inputEl.forEach((el) => {
  el.addEventListener('keypress', function (e) {
    const target = e.target.closest('.form__input-field');
    if (!target) return;
    el.style.color = 'black';
  });
});
