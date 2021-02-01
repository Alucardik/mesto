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
const gallery = document.querySelector(".gallery");

function viewGalleryItem(evt) {
  popupItemView.querySelector(".popup__image").src = evt.target.nextElementSibling.src;
  popupItemView.querySelector(".popup__image").alt = evt.target.nextElementSibling.alt;
  popupItemView.classList.add("popup_opened");
  popupItemView.querySelector(".popup__close-btn").addEventListener("click", () =>
    popupItemView.classList.remove("popup_opened"));
}

function addGalleryItems(...cards) {
  cards.forEach(item => {
    const newCard = galleryItemTemp.querySelector(".gallery__item").cloneNode(true);
    newCard.querySelector(".gallery__item-image").src = item.link;
    newCard.querySelector(".gallery__item-image").alt = item.name;
    newCard.querySelector(".gallery__item-name").textContent = item.name;

    newCard.querySelector(".gallery__image-container").addEventListener("click", viewGalleryItem);

    newCard.querySelector(".gallery__del-btn").addEventListener("click", evt =>
      evt.target.closest(".gallery__item").remove());

    newCard.querySelector(".gallery__like-btn").addEventListener("click", evt =>
      evt.target.classList.toggle("gallery__like-btn_active"));

    gallery.prepend(newCard);
  });
}

addGalleryItems(...initialCards);

// popup forms implementation---------------------------------------------------------------------------------------

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

function openPopup (evt) {
  if (evt.target === editBtn) {
    popupEdit.classList.add("popup_opened");
    editFormFieldName.value = profName.textContent;
    editFormFieldDescr.value = profDescr.textContent;
  } else {
    popupAdd.classList.add("popup_opened");
  }
}

function closePopup (evt) {
  evt.target.closest(".popup").classList.remove("popup_opened");
}

editBtn.addEventListener("click", openPopup);
addBtn.addEventListener("click", openPopup);

const closeBtns = document.querySelectorAll(".popup__close-btn");

closeBtns.forEach(item => item.addEventListener("click", closePopup));

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  if (evt.target === editFormElement) {
    profName.textContent = editFormFieldName.value;
    profDescr.textContent = editFormFieldDescr.value;
  } else {
    addGalleryItems({name: addFormFieldName.value, link: addFormFieldDescr.value});

  }
  closePopup(evt);
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
addFormElement.addEventListener("submit", handleEditFormSubmit);
