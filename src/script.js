'use strict';

const form = document.querySelector('.form');

const validateEmail = function (email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

const validatePassword = function (password) {
  // validates 6-12 characters, special characaters (!@#$%^&*) and numbers only
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
  return re.test(password);
};

const renderError = function (el, msg) {
  el.classList.add('form__input--invalid');
  el.classList.remove('form__input--valid');
  const markup = `<p class="form__item--error form__item--error-msg">${msg}</p>`;
  const statusContainer = el.nextElementSibling;
  statusContainer.innerHTML = markup;
};

const renderSuccess = function (el, msg) {
  el.classList.remove('form__input--invalid');
  el.classList.add('form__input--valid');
  const markup = `<p class="form__item--success form__item--success-msg">${msg}</p>`;
  const statusContainer = el.nextElementSibling;
  statusContainer.innerHTML = '';
  statusContainer.innerHTML = markup;
};

const inputValidation = function () {
  const firstName = document.querySelector('.form__input-field--firstname');
  const lastName = document.querySelector('.form__input-field--lastname');
  const email = document.querySelector('.form__input-field--email');
  const password = document.querySelector('.form__input-field--password');

  // first name validation
  if (firstName.value.trim() === '') {
    renderError(firstName, 'First Name cannot be empty');
  } else {
    renderSuccess(firstName, `${firstName.value} is valid`);
  }

  // last name validation
  if (lastName.value.trim() === '') {
    renderError(lastName, 'Last Name cannot be empty');
  } else {
    renderSuccess(lastName, `${lastName.value} is valid`);
  }

  // email validation
  if (!validateEmail(email.value.trim())) {
    renderError(email, 'Looks like this is not an email');
  }
  if (validateEmail(email.value)) {
    renderSuccess(email, `${email.value} is valid`);
  }
  if (email.value === '') {
    renderError(email, 'Email cannot be empty');
  }

  // password validation
  if (
    password.value.length >= 6 &&
    password.value !== '' &&
    password.value.length <= 12 &&
    validatePassword(password.value)
  ) {
    renderSuccess(password, `Password is valid`);
  }

  if (
    password.value.length <= 6 ||
    password.value.length > 12 ||
    !validatePassword(password.value)
  ) {
    renderError(
      password,
      `Password must be 6-12 characters long and must contain atleast 1 number and 1 special character (! @ # $ % ^ & *).`
    );
  }
  if (password.value.trim() === '') {
    renderError(password, 'Password cannot be empty');
  }
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  inputValidation();
});
