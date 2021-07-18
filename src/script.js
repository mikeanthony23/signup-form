'use strict';
const form = document.querySelector('.form');
const formItem = document.querySelectorAll('.form-item');
const inputEl = document.querySelectorAll('.form__input-field');
const submitBtn = document.querySelector('.form__input--btn');

const validateEmail = function (email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

//Last Name cannot be empty

const renderError = function (el, msg) {
  el.classList.add('form__input--invalid');
  el.classList.remove('form__input--valid');
  const markup = `<p class="form__item--error form__item--error-msg">${msg}</p>`;
  const errContainer = el.nextElementSibling;
  console.log(errContainer);
  errContainer.innerHTML = markup;
};

const renderSuccess = function (el, msg) {
  el.classList.remove('form__input--invalid');
  el.classList.add('form__input--valid');
  const markup = `<p class="form__item--success form__item--success-msg">${msg}</p>`;
  const errContainer = el.nextElementSibling;
  errContainer.innerHTML = '';

  errContainer.innerHTML = markup;
};

const inputValidation = function () {
  const firstName = document.querySelector('.form__input-field--firstname');
  const lastName = document.querySelector('.form__input-field--lastname');
  const email = document.querySelector('.form__input-field--email');
  const password = document.querySelector('.form__input-field--password');

  // first name validation
  if (firstName.value === '') {
    renderError(firstName, 'First Name cannot be empty');
  } else {
    renderSuccess(firstName, `${firstName.value} is valid`);
  }

  // last name validation
  if (lastName.value === '') {
    renderError(lastName, 'Last Name cannot be empty');
  } else {
    renderSuccess(lastName, `${lastName.value} is valid`);
  }

  // email validation
  if (!validateEmail(email.value)) {
    renderError(email, 'Looks like this is not an email');
  }
  if (validateEmail(email.value)) {
    renderSuccess(email, `Email is valid`);
  }
  if (email.value === '') {
    renderError(email, 'Email cannot be empty');
  }

  // password validation
  if (password.value.length <= 6) {
    renderError(password, 'Password must be 6 characters long or above');
  }
  if (password.value === '') {
    renderError(password, 'Password cannot be empty');
  }
  if (password.value.length >= 6 && password.value !== '') {
    renderSuccess(password, `Password is valid`);
  }
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  inputValidation();
});

inputEl.forEach((el) => {
  el.addEventListener('keypress', function (e) {
    const target = e.target.closest('.form__input-field');
    if (!target) return;
    el.style.color = 'black';
  });
});
