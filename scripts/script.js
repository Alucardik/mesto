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
const gallery = document.querySelector(".gallery");

function addGalleryItems(...cards) {
  cards.forEach(function (item) {
    const newCard = galleryItemTemp.querySelector(".gallery__item").cloneNode(true);
    newCard.querySelector(".gallery__item-image").src = item.link;
    newCard.querySelector(".gallery__item-image").alt = item.name;
    newCard.querySelector(".gallery__item-name").textContent = item.name;
    gallery.append(newCard);
  });
}

addGalleryItems(...initialCards);

// popup edit-form implementation---------------------------------------------------------------------------------------

const editBtn = document.querySelector(".profile__btn_type_edit");
const popup = document.querySelector(".popup");
const profName = document.querySelector(".profile__name");
const profDescr = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__form");
const formFieldName = formElement.querySelector(".popup__form-field_type_name");
const formFieldDescr = formElement.querySelector(".popup__form-field_type_description");

function openPopup () {
  popup.classList.add("popup_opened");
  formFieldName.value = profName.textContent;
  formFieldDescr.value = profDescr.textContent;
}

function closePopup () {
  popup.classList.remove("popup_opened");
}

editBtn.addEventListener("click", openPopup);

const closeBtn = document.querySelector(".popup__close-btn");

closeBtn.addEventListener("click", closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();

  profName.textContent = formFieldName.value;
  profDescr.textContent = formFieldDescr.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
