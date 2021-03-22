import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";

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

// adding mock gallery to the page

const mockGallery = new Section({items: initialCards,
  renderer: item => {
    // Right now a new instance of PopupWithImage is created for each gallery item,
    // though they all refer to one popup with only altering image's src and name.
    // Maybe there should be only one instance of this class and
    // "open" method should take parameters instead of constructor?
    const imgPopup = new PopupWithImage("#image-view", item);
    imgPopup.setEventListeners();
    mockGallery.addItem(new Card(item, "#gallery-item",
      "gallery", imgPopup.open.bind(imgPopup)).createCard());
  }}, ".gallery" );

mockGallery.renderItems();

// const popupItemView = document.querySelector("#image-view");
// const popupViewImage = popupItemView.querySelector(".popup__image");
// const popupViewText = popupItemView.querySelector(".popup__image-text");

// function viewGalleryItem(item) {
//   popupViewImage.src = item.link;
//   popupViewImage.alt = item.name;
//   popupViewText.textContent = item.name;
//   openPopup(popupItemView);
// }
//
// // adding mock gallery to page
//
// const gallery = document.querySelector(".gallery");
//
// function addGalleryItems(...cards) {
//   cards.forEach(item => {
//
//   });
// }
//
// addGalleryItems(...initialCards);

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
// const popupEdit = document.querySelector("#edit-popup");
// const popupAdd = document.querySelector("#add-popup");
// const profName = document.querySelector(".profile__name");
// const profDescr = document.querySelector(".profile__description");
const editFormElement = document.querySelector("#edit-popup .popup__form");
// const addFormElement = document.querySelector("#add-popup .popup__form");
const editFormFieldName = editFormElement.querySelector(".popup__form-input_type_name");
const editFormFieldDescr = editFormElement.querySelector(".popup__form-input_type_description");
// const addFormFieldName = addFormElement.querySelector(".popup__form-input_type_name");
// const addFormFieldDescr = addFormElement.querySelector(".popup__form-input_type_description");

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//
//   // adding a global listener to catch keyboard events for popups, cause they don't produce those themselves
//   document.addEventListener("keydown", handleOverlayKeypress);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", handleOverlayKeypress);
// }


// using old hideErrorMsg function to hide previous errors on popup opening
// in order not to create another FormValidator class instance

function hideErrorMsg(formElement, inputElement, config) {
  const errorMsg = formElement.querySelector(`.${config.errorClass}_type_${inputElement.name}`);
  errorMsg.classList.remove(config.errorClassActive);
  errorMsg.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}


// addBtn.addEventListener("click", () => {
//   addFormElement.reset();
//
//   // disabling "add image" button by default
//   const submButton =  addFormElement.querySelector(".popup__submit-btn");
//   submButton.classList.add("popup__submit-btn_inactive");
//   submButton.disabled = true;
//
//   // hiding previous form's error messages
//   hideErrorMsg(addFormElement, addFormFieldName, config);
//
//   hideErrorMsg(addFormElement, addFormFieldDescr, config);
//
//   openPopup(popupAdd);
// });

// function handleOverlayClick(evt) {
//   if (evt.target.classList.contains("popup__close-btn")) {
//     closePopup(evt.target.closest(".popup"));
//   } else if (!evt.target.classList.contains("popup__container")) {
//     closePopup(evt.target);
//   }
// }

// const overlays = document.querySelectorAll(".popup");

// overlays.forEach(overlay => {
//   overlay.addEventListener("click", handleOverlayClick);
// });

// function handleOverlayKeypress(evt) {
//   if (evt.key === "Escape") {
//     const curPopup = document.querySelector(".popup_opened");
//     if (curPopup)
//       closePopup(curPopup);
//   }
// }

// function handleEditFormSubmit(evt) {
//   evt.preventDefault();
//
//   profName.textContent = editFormFieldName.value;
//   profDescr.textContent = editFormFieldDescr.value;
//   closePopup(popupEdit);
// }

// function handleAddFormSubmit(evt) {
//   evt.preventDefault();
//
//   addGalleryItems({name: addFormFieldName.value, link: addFormFieldDescr.value});
//
//   // form's fields are reset in addBtn eventListener
//   closePopup(popupAdd);
// }

// editFormElement.addEventListener("submit", handleEditFormSubmit);
// addFormElement.addEventListener("submit", handleAddFormSubmit);


// enabling form validation using FormValidator class

function enableFormValidation(config) {
  const formList = Array.from(document.querySelectorAll(`.${config.formSelector}`));
  formList.forEach(formElement => {
    new FormValidator(formElement, config).enableValidation();
  });
}

enableFormValidation(config);

const profile = new UserInfo({
  usrNameSel: ".profile__name",
  usrStatusSel: ".profile__description"
});

const editFormPopup = new PopupWithForm("#edit-popup", {
    formName: "profile-info",
    handleSubm: (evt) => {
      evt.preventDefault();
      const formValues = addFormPopup._getInputValues();
      profile.setUserInfo({ usrName: formValues[0],
        usrStatus: formValues[1]});
      editFormPopup.close();
    }
  },
  {
    hideErrorMsg,
    config
  }
);

const addFormPopup = new PopupWithForm("#add-popup", {
    formName: "add-card",
    handleSubm: (evt) => {
      evt.preventDefault();
      const formValues = addFormPopup._getInputValues();
      const curItem = {name: formValues[0],
        link: formValues[1]};
      const imgPopup = new PopupWithImage("#image-view", curItem);
      imgPopup.setEventListeners();
      mockGallery.addItem(new Card(curItem, "#gallery-item",
        "gallery", imgPopup.open.bind(imgPopup)).createCard());
      addFormPopup.close();
    }
  },
  {
    hideErrorMsg,
    config
  }
);

addFormPopup.setEventListeners();
editFormPopup.setEventListeners();

addBtn.addEventListener("click", addFormPopup.open.bind(addFormPopup));
editBtn.addEventListener("click", () => {
  const curInfo = profile.getUserInfo();
  editFormFieldName.value = curInfo.usrName;
  editFormFieldDescr.value = curInfo.usrStatus;
  editFormPopup.open();
});
