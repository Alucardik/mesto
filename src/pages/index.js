import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import data from "../utils/constants.js";
import "./index.css";

// adding mock gallery to the page

const imgPopup = new PopupWithImage("#image-view");
imgPopup.setEventListeners();

const mockGallery = new Section({items: data.initialCards,
  renderer: item => {
    mockGallery.addItem(new Card(item, "#gallery-item",
      "gallery", imgPopup.open.bind(imgPopup)).createCard());
  }}, ".gallery" );

mockGallery.renderItems();

// setting up form popups

const profile = new UserInfo({
  usrNameSel: ".profile__name",
  usrStatusSel: ".profile__description"
});

const editFormPopup = new PopupWithForm("#edit-popup", {
    formName: "profile-info",
    handleSubm: (formValues) => {
      profile.setUserInfo({ usrName: formValues["profile-name"],
        usrStatus: formValues["profile-description"]});
      editFormPopup.close();
    }
});

const addFormPopup = new PopupWithForm("#add-popup", {
    formName: "add-card",
    handleSubm: (formValues) => {
      const curItem = {name: formValues["card-name"],
        link: formValues["card-url"]};
      mockGallery.addItem(new Card(curItem, "#gallery-item",
        "gallery", imgPopup.open.bind(imgPopup)).createCard());
      addFormPopup.close();
    }
});

addFormPopup.setEventListeners();
editFormPopup.setEventListeners();

// enabling form validation

const editFormValidator = new FormValidator(document.querySelector("#edit-popup"), data.config);
const addFormValidator = new FormValidator(document.querySelector("#add-popup"), data.config);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// adding click events for buttons

data.addBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addFormPopup.open();
});

data.editBtn.addEventListener("click", () => {
  const curInfo = profile.getUserInfo();
  editFormValidator.resetValidation();
  data.editFormFieldName.value = curInfo.usrName;
  data.editFormFieldDescr.value = curInfo.usrStatus;
  editFormPopup.open();
});
