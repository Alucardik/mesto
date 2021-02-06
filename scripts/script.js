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
  const newCardImage = newCard.querySelector(".gallery__item-image");
  newCardImage.src = cardInfo.link;
  newCardImage.alt = cardInfo.name;
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

editBtn.addEventListener("click", () => {
  editFormFieldName.value = profName.textContent;
  editFormFieldDescr.value = profDescr.textContent;

  hideErrorMsg(editFormElement, editFormFieldName, {
    inputErrorClass: 'popup__form-input_invalid',
    errorClass: 'popup__form-input-error',
    errorClassActive: 'popup__form-input-error_active'
  });

  hideErrorMsg(editFormElement, editFormFieldDescr, {
    inputErrorClass: 'popup__form-input_invalid',
    errorClass: 'popup__form-input-error',
    errorClassActive: 'popup__form-input-error_active'
  });

  openPopup(popupEdit);
});

addBtn.addEventListener("click", () => {
  addFormElement.reset();

  toggleSubmitBtnState(Array.from(addFormElement.querySelectorAll(".popup__form-input")),
    addFormElement.querySelector(".popup__submit-btn"),
    {inactiveButtonClass: 'popup__submit-btn_inactive'});

  hideErrorMsg(addFormElement, addFormFieldName, {
    inputErrorClass: 'popup__form-input_invalid',
    errorClass: 'popup__form-input-error',
    errorClassActive: 'popup__form-input-error_active'
  });

  hideErrorMsg(addFormElement, addFormFieldDescr, {
    inputErrorClass: 'popup__form-input_invalid',
    errorClass: 'popup__form-input-error',
    errorClassActive: 'popup__form-input-error_active'
  });

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

  // refreshing form values for a new card
  addFormFieldName.value = "";
  addFormFieldDescr.value = "";
  closePopup(popupAdd);
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);
