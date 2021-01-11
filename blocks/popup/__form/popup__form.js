let profName = document.querySelector(".profile__name");
let profDescr = document.querySelector(".profile__description");
let formElement = document.querySelector(".popup__form");
let formFields = formElement.querySelectorAll(".popup__form-field");

formFields[0].setAttribute("value", profName.textContent);
formFields[1].setAttribute("value", profDescr.textContent);

function handleFormSubmit (evt) {
  evt.preventDefault();

  profName.textContent = formFields[0].value;
  profDescr.textContent = formFields[1].value;
}

formElement.addEventListener('submit', handleFormSubmit);
