const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    owner: false
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    owner: false
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    owner: false
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    owner: false
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    owner: false
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    owner: false
  }
];

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
const editFormElement = document.querySelector("#edit-popup .popup__form");
const editFormFieldName = editFormElement.querySelector(".popup__form-input_type_name");
const editFormFieldDescr = editFormElement.querySelector(".popup__form-input_type_description");

export default { initialCards, config, editBtn, addBtn, editFormFieldName, editFormFieldDescr };
