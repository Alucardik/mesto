let editBtn = document.querySelector(".profile__btn_type_edit");
let popup = document.querySelector(".popup");
let profName = document.querySelector(".profile__name");
let profDescr = document.querySelector(".profile__description");
let formElement = document.querySelector(".popup__form");
let formFieldName = formElement.querySelector(".popup__form-field_type_name");
let formFieldDescr = formElement.querySelector(".popup__form-field_type_description");

function openPopup () {
  popup.classList.add("popup_opened");
  formFieldName.value = profName.textContent;
  formFieldDescr.value = profDescr.textContent;
}

function closePopup () {
  popup.classList.remove("popup_opened");
}

editBtn.addEventListener("click", openPopup);

let closeBtn = document.querySelector(".popup__close-btn");

closeBtn.addEventListener("click", closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();

  profName.textContent = formFieldName.value;
  profDescr.textContent = formFieldDescr.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
