function editNav() {
  let x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalForm = document.querySelector('.modal-body form');
const modalSuccessMessage = document.querySelector('.modal-body .confirmation');
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = modalBg.querySelectorAll(".close-modal");
const regex_numbers = /^[0-9]+$/;
const regex_email =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalBg.style.display = 'block';
}

// close modal event
closeModalBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// close modal form
function closeModal() {
  modalBg.style.display = 'none';
}

// get sibling element of a node, identified by a class
function getSibling(node, selector) {
  while (node.nextElementSibling != null) {
    if (node.nextElementSibling.classList.length > 0) {
      if (node.nextElementSibling.classList.contains(selector)) {
        return node.nextElementSibling;
      }
    }
    node = node.nextElementSibling;
  }
}

// Set given error (message: string) to a node element (elem: node)
function setErrorMessage(elem, message) {
  const errorMessageNode = getSibling(elem, 'error-message');
  errorMessageNode.innerHTML = message;
}

// reset all error messages from previous submissions
function resetErrorMessages() {
  const inputErrors = document.querySelectorAll('form[name="reserve"] input.form-error');
  const errorMessageNodes = document.querySelectorAll('form[name="reserve"] .error-message');
  inputErrors.forEach((input) => input.classList.remove('form-error'));
  errorMessageNodes.forEach((node) => node.innerHTML = '');
}

// Return true if a location is checked, false otherwise.
function hasSelectedLocation() {
  const locations = document.querySelectorAll('form[name="reserve"] input[type="radio"][name="location"]');
  for (let i = 0; i < locations.length; ++i) {
    if (locations[i].checked) {
      return true;
    }
  }
  return false;
}

// validate form data on submit
function validate() {
  let state = true;
  const firstname = document.forms['reserve']['first'];
  const lastname = document.forms['reserve']['last'];
  const email = document.forms['reserve']['email'];
  const birthdate = document.forms['reserve']['birthdate'];
  const quantity = document.forms['reserve']['quantity'];
  const locations = document.querySelector('.formData.locations');
  const legalNotice = document.forms['reserve']['checkbox1'];

  resetErrorMessages();

  // check firstname field
  if (firstname.value.length < 2) {
    firstname.classList.add('form-error');
    firstname.value.length === 0
      ? setErrorMessage(firstname, 'Ce champ est requis.')
      : setErrorMessage(firstname, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    state = false;
  }

  // check lastname field
  if (lastname.value.length < 2) {
    lastname.classList.add('form-error');
    lastname.value.length === 0
      ? setErrorMessage(lastname, 'Ce champ est requis.')
      : setErrorMessage(lastname, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    state = false;
  }

  // check email field
  if (email.value.length > 0) {
    if (!(email.value.match(regex_email))) {
      email.classList.add('form-error');
      setErrorMessage(email, 'L\'adresse e-mail n\'est pas valide.');
      state = false;
    }
  } else {
    email.classList.add('form-error');
    setErrorMessage(email, 'Ce champ est requis.');
    state = false;
  }

  // check birthdate field
  if (!(birthdate.value.length > 0)) {
    birthdate.classList.add('form-error');
    setErrorMessage(birthdate, 'Vous devez entrer votre date de naissance.');
    state = false;
  }

  // check if quantity input is a number
  if (quantity.value.length === 0 || !(quantity.value.match(regex_numbers))) {
    quantity.classList.add('form-error');
    setErrorMessage(quantity, 'Veuillez entrer un nombre valide.');
    state = false;
  }

  // check if location selection is filled
  if (!hasSelectedLocation()) {
    locations.querySelector('.error-message').innerHTML = 'Vous devez choisir une option.';
    state = false;
  }

  // check if legal notice is approved
  if (!legalNotice.checked) {
    setErrorMessage(legalNotice, 'Vous devez vérifier que vous acceptez les termes et conditions.');
  }

  // in case of success, hide form and display success message
  if (state) {
    modalForm.style.display = 'none';
    modalSuccessMessage.style.display = 'flex';
  }

  return state;
}