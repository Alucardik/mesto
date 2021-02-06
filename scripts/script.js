// gallery item addition implementation---------------------------------------------------------------------------------

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

const galleryItemTemp = document.querySelector("#gallery-item").content;
const popupItemView = document.querySelector("#image-view");
const popupViewImage = popupItemView.querySelector(".popup__image");
const popupViewText = popupItemView.querySelector(".popup__image-text");
const gallery = document.querySelector(".gallery");

function viewGalleryItem(item) {
  popupViewImage.src = item.link;
  popupViewImage.alt = item.name;
  popupViewText.textContent = item.name;
  openPopup(popupItemView);
}

function createCard(cardInfo) {
  const newCard = galleryItemTemp.querySelector(".gallery__item").cloneNode(true);
  newCard.querySelector(".gallery__item-image").src = cardInfo.link;
  newCard.querySelector(".gallery__item-image").alt = cardInfo.name;
  newCard.querySelector(".gallery__item-name").textContent = cardInfo.name;

  newCard.querySelector(".gallery__image-container").addEventListener("click", () =>
    viewGalleryItem(cardInfo));

  newCard.querySelector(".gallery__del-btn").addEventListener("click", evt =>
    evt.target.closest(".gallery__item").remove());

  newCard.querySelector(".gallery__like-btn").addEventListener("click", evt =>
    evt.target.classList.toggle("gallery__like-btn_active"));

  return newCard;
}

function addGalleryItems(...cards) {
  cards.forEach(item => {
    gallery.prepend(createCard(item));
  });
}

addGalleryItems(...initialCards);

// popup forms implementation-------------------------------------------------------------------------------------------

const editBtn = document.querySelector(".profile__btn_type_edit");
const addBtn = document.querySelector(".profile__btn_type_add");
const popupEdit = document.querySelector("#edit-popup");
const popupAdd = document.querySelector("#add-popup");
const profName = document.querySelector(".profile__name");
const profDescr = document.querySelector(".profile__description");
const editFormElement = document.querySelector("#edit-popup .popup__form");
const addFormElement = document.querySelector("#add-popup .popup__form");
const editFormFieldName = editFormElement.querySelector(".popup__form-field_type_name");
const editFormFieldDescr = editFormElement.querySelector(".popup__form-field_type_description");
const addFormFieldName = addFormElement.querySelector(".popup__form-field_type_name");
const addFormFieldDescr = addFormElement.querySelector(".popup__form-field_type_description");

function openPopup (popup) {
  popup.classList.add("popup_opened");
}

function closePopup (popup) {
  popup.classList.remove("popup_opened");
}

editBtn.addEventListener("click", () => {
  editFormFieldName.value = profName.textContent;
  editFormFieldDescr.value = profDescr.textContent;
  openPopup(popupEdit);
});

addBtn.addEventListener("click", () => {
  addFormElement.reset();
  hideErrorMsg(addFormElement, addFormFieldName);
  hideErrorMsg(addFormElement, addFormFieldDescr);
  openPopup(popupAdd);
});

const closeBtns = document.querySelectorAll(".popup__close-btn");

closeBtns.forEach(item => item.addEventListener("click", evt => {
  closePopup(evt.target.closest(".popup"));
}));

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profName.textContent = editFormFieldName.value;
  profDescr.textContent = editFormFieldDescr.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  addGalleryItems({name: addFormFieldName.value, link: addFormFieldDescr.value});

  // refreshing form values for a new card
  addFormFieldName.value = "";
  addFormFieldDescr.value = "";
  closePopup(popupAdd);
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);

// form validation------------------------------------------------------------------------------------------------------

function showErrorMsg(formElement, inputElement) {
  const errorMsg = formElement.querySelector(`.popup__form-input-error_type_${inputElement.name}`);
  errorMsg.classList.add("popup__form-input-error_active");
  errorMsg.textContent = inputElement.validationMessage;
  inputElement.classList.add("popup__form-input_invalid");
}

function hideErrorMsg(formElement, inputElement) {
  const errorMsg = formElement.querySelector(`.popup__form-input-error_type_${inputElement.name}`);
  errorMsg.classList.remove("popup__form-input-error_active");
  errorMsg.textContent = "";
  inputElement.classList.remove("popup__form-input_invalid");
}

function checkInpElemValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showErrorMsg(formElement, inputElement);
  } else {
    hideErrorMsg(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
   return inputList.some(field => {
    return !field.validity.valid;
  });
}

function toggleSubmitBtnState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-btn_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__submit-btn_inactive");
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
  const submButton = formElement.querySelector(".popup__submit-btn");
  toggleSubmitBtnState(inputList, submButton);
  inputList.forEach(inpElement => {
    inpElement.addEventListener("input", () => {
      checkInpElemValidity(formElement, inpElement);
      toggleSubmitBtnState(inputList, submButton);
    });
  });

}

function enableFormValidation() {
  setEventListeners(editFormElement);
  setEventListeners(addFormElement);
}

enableFormValidation();
