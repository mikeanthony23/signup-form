'use strict'

import iconClose from 'url:./images/icon-close.svg'

const form = document.querySelector('.form')
const formSubmitOverlay = document.querySelector('.form-overlay')
const firstName = document.querySelector('.form__input-field--firstname')
const lastName = document.querySelector('.form__input-field--lastname')
const email = document.querySelector('.form__input-field--email')
const password = document.querySelector('.form__input-field--password')
const formInput = document.querySelectorAll('.form__input')

const validateEmail = function (email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

const validatePassword = function (password) {
  // validates 6-12 characters, special characaters (!@#$%^&*) and numbers only
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$/
  return re.test(password)
}

const renderError = function (el, msg) {
  el.classList.add('form__input--invalid')
  el.classList.remove('form__input--valid')
  const markup = `<p class="form__status-msg form__item--error form__item--error-msg">${msg}</p>`
  const statusContainer = el.nextElementSibling
  statusContainer.innerHTML = markup
}

const renderSuccess = function (el, msg) {
  el.classList.remove('form__input--invalid')
  el.classList.add('form__input--valid')
  const markup = `<p class="form__status-msg form__item--success form__item--success-msg">${msg}</p>`
  const statusContainer = el.nextElementSibling
  statusContainer.innerHTML = ''
  statusContainer.innerHTML = markup
}

const capitalize = function (str) {
  return str
    .split(' ')
    .map(str => str[0].toUpperCase() + str.slice(1))
    .join(' ')
}

const firstNameValidation = function () {
  if (firstName.value.trim() === '') {
    renderError(firstName, 'First Name cannot be empty')
    return false
  } else {
    renderSuccess(firstName, `${capitalize(firstName.value)} is valid`)

    return true
  }
}

const lastNameValidation = function () {
  if (lastName.value.trim() === '') {
    renderError(lastName, 'Last Name cannot be empty')
    return false
  } else {
    renderSuccess(lastName, `${capitalize(lastName.value)} is valid`)
    return true
  }
}

const emailValidation = function () {
  if (email.value.trim() === '') {
    renderError(email, 'Email cannot be empty')
    return false
  }
  if (!validateEmail(email.value.trim())) {
    renderError(email, 'Looks like this is not an email')
    return false
  }
  if (validateEmail(email.value)) {
    renderSuccess(email, `${email.value} is valid`)
    return true
  }
}

const passwordValidation = function () {
  if (password.value.trim() === '') {
    renderError(password, 'Password cannot be empty')
    return false
  }
  if (
    password.value.length >= 6 &&
    password.value !== '' &&
    password.value.length <= 18 &&
    validatePassword(password.value)
  ) {
    renderSuccess(password, `Password is valid`)
    return true
  }

  if (
    password.value.length <= 6 ||
    password.value.length > 18 ||
    !validatePassword(password.value)
  ) {
    renderError(
      password,
      `Password too weak! It must contain 6-12 characters long, a number and a special character(!@#$%^&*).`
    )
    return false
  }
}
const inputValidation = function () {
  firstNameValidation()

  lastNameValidation()

  emailValidation()

  passwordValidation()

  if (
    firstNameValidation() &&
    lastNameValidation() &&
    emailValidation() &&
    passwordValidation()
  )
    return true
  return false
}

const createMarkup = function () {
  const markup = `
    <div class="form-overlay__details">
      <p class="form-overlay__msg">Registration Submitted Please Check your Email.</p>
      <button class="form-overlay__close-btn"><img src="${iconClose}" alt="close button"></button>
    </div>
  `
  formSubmitOverlay.innerHTML = markup
}

const displaySuccessOverlay = function () {
  setTimeout(createMarkup, 1000)
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  inputValidation()
  if (!inputValidation()) return
  formSubmitOverlay.classList.toggle('hidden')
  displaySuccessOverlay()
})

// reset all styles in the form
const clear = function () {
  formSubmitOverlay.innerHTML = ''
  firstName.value = ''
  firstName.nextElementSibling.innerHTML = ''
  lastName.value = ''
  lastName.nextElementSibling.innerHTML = ''
  email.value = ''
  email.nextElementSibling.innerHTML = ''
  password.value = ''
  password.nextElementSibling.innerHTML = ''
  formInput.forEach(el => {
    el.classList.remove('form__input--valid')
  })
}

formSubmitOverlay.addEventListener('click', function (e) {
  const btn = e.target.closest('.form-overlay__close-btn')
  if (!btn) return
  clear()
  formSubmitOverlay.classList.toggle('hidden')
})
