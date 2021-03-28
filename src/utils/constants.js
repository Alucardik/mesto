// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
//     likes: 0,
//     owner: false
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
//     likes: 0,
//     owner: false
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
//     likes: 0,
//     owner: false
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
//     likes: 0,
//     owner: false
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
//     likes: 5,
//     owner: false
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
//     likes: 0,
//     owner: false
//   }
// ];

const serverAutData = {
  baseUrl: "https://mesto.nomoreparties.co/v1/",
  token: "05d1c1fe-0e46-4725-9fcb-d2c6981b18f1",
  groupId: "cohort-21"
}

const config = {
  formSelector: 'popup__form',
  inputSelector: 'popup__form-input',
  submitButtonSelector: 'popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__form-input_invalid',
  errorClass: 'popup__form-input-error',
  errorClassActive: 'popup__form-input-error_active'
};

const avatarImg = document.querySelector(".profile__img");
const avatarBtn = document.querySelector(".profile__btn_type_ch-avatar");
const editBtn = document.querySelector(".profile__btn_type_edit");
const addBtn = document.querySelector(".profile__btn_type_add");
const editFormElement = document.querySelector("#edit-popup .popup__form");
const editFormFieldName = editFormElement.querySelector(".popup__form-input_type_name");
const editFormFieldDescr = editFormElement.querySelector(".popup__form-input_type_description");

export default { serverAutData, config, avatarImg, avatarBtn, editBtn, addBtn, editFormFieldName, editFormFieldDescr };
