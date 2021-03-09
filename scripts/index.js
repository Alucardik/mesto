import Card from "./Card.js"
import FormValidator from "./FormValidator.js"

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// handling imagePopup opening

const popupItemView = document.querySelector("#image-view");
const popupViewImage = popupItemView.querySelector(".popup__image");
const popupViewText = popupItemView.querySelector(".popup__image-text");

function viewGalleryItem(item) {
  popupViewImage.src = item.link;
  popupViewImage.alt = item.name;
  popupViewText.textContent = item.name;
  openPopup(popupItemView);
}

// adding mock gallery to site

const gallery = document.querySelector(".gallery");

function addGalleryItems(...cards) {
  cards.forEach(item => {
    gallery.prepend(new Card(item, "#gallery-item",
      "gallery", viewGalleryItem).createCard());
  });
}

addGalleryItems(...initialCards);

// popup forms implementation-------------------------------------------------------------------------------------------

const config = {
  formSelector: 'popup__form',
  inputSelector: 'popup__form-input',
  submitButtonSelector: 'popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__form-input_invalid',
  errorClass: 'popup__form-input-error',
  errorClassActive: 'popup__form-input-error_active'
};

const editBtn = document.querySelector(".profile__btn_type_edit");
const addBtn = document.querySelector(".profile__btn_type_add");
const popupEdit = document.querySelector("#edit-popup");
const popupAdd = document.querySelector("#add-popup");
const profName = document.querySelector(".profile__name");
const profDescr = document.querySelector(".profile__description");
const editFormElement = document.querySelector("#edit-popup .popup__form");
const addFormElement = document.querySelector("#add-popup .popup__form");
const editFormFieldName = editFormElement.querySelector(".popup__form-input_type_name");
const editFormFieldDescr = editFormElement.querySelector(".popup__form-input_type_description");
const addFormFieldName = addFormElement.querySelector(".popup__form-input_type_name");
const addFormFieldDescr = addFormElement.querySelector(".popup__form-input_type_description");

function openPopup(popup) {
  popup.classList.add("popup_opened");

  // adding a global listener to catch keyboard events for popups, cause they don't produce those themselves
  document.addEventListener("keydown", handleOverlayKeypress);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleOverlayKeypress);
}

// using old hideErrorMsg function to hide previous errors on popup opening
// in order not to create another FormValidator class instance

function hideErrorMsg(formElement, inputElement, config) {
  const errorMsg = formElement.querySelector(`.${config.errorClass}_type_${inputElement.name}`);
  errorMsg.classList.remove(config.errorClassActive);
  errorMsg.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

editBtn.addEventListener("click", () => {
  editFormFieldName.value = profName.textContent;
  editFormFieldDescr.value = profDescr.textContent;

  // hiding previous form's error messages
  hideErrorMsg(editFormElement, editFormFieldName, config);

  hideErrorMsg(editFormElement, editFormFieldDescr, config);

  openPopup(popupEdit);
});

addBtn.addEventListener("click", () => {
  addFormElement.reset();

  // disabling "add image" button by default
  const submButton =  addFormElement.querySelector(".popup__submit-btn");
  submButton.classList.add("popup__submit-btn_inactive");
  submButton.disabled = true;

  // hiding previous form's error messages
  hideErrorMsg(addFormElement, addFormFieldName, config);

  hideErrorMsg(addFormElement, addFormFieldDescr, config);

  openPopup(popupAdd);
});

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup__close-btn")) {
    closePopup(evt.target.closest(".popup"));
  } else if (!evt.target.classList.contains("popup__container")) {
    closePopup(evt.target);
  }
}

const overlays = document.querySelectorAll(".popup");

overlays.forEach(overlay => {
  overlay.addEventListener("click", handleOverlayClick);
});

function handleOverlayKeypress(evt) {
  if (evt.key === "Escape") {
    const curPopup = document.querySelector(".popup_opened");
    if (curPopup)
      closePopup(curPopup);
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profName.textContent = editFormFieldName.value;
  profDescr.textContent = editFormFieldDescr.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  addGalleryItems({name: addFormFieldName.value, link: addFormFieldDescr.value});

  // form's fields are reset in addBtn eventListener
  closePopup(popupAdd);
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);

// enabling form validation using FormValidator class

function enableFormValidation(config) {
  const formList = Array.from(document.querySelectorAll(`.${config.formSelector}`));
  formList.forEach(formElement => {
    new FormValidator(formElement, config).enableValidation();
  });
}

enableFormValidation(config);
