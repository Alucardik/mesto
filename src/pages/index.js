import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import data from "../utils/constants.js";
import hideErrorMsg from "../utils/utility.js";
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
    handleSubm: (evt) => {
      evt.preventDefault();
      const formValues = editFormPopup._getInputValues();
      profile.setUserInfo({ usrName: formValues[0],
        usrStatus: formValues[1]});
      editFormPopup.close();
    }
  },
  {
    hideErrorMsg,
    config: data.config
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
    config: data.config
  }
);

addFormPopup.setEventListeners();
editFormPopup.setEventListeners();

data.addBtn.addEventListener("click", addFormPopup.open.bind(addFormPopup));
data.editBtn.addEventListener("click", () => {
  const curInfo = profile.getUserInfo();
  data.editFormFieldName.value = curInfo.usrName;
  data.editFormFieldDescr.value = curInfo.usrStatus;
  editFormPopup.open();
});

// enabling form validation using FormValidator class

function enableFormValidation(config) {
  const formList = Array.from(document.querySelectorAll(`.${config.formSelector}`));
  formList.forEach(formElement => {
    new FormValidator(formElement, config).enableValidation();
  });
}

enableFormValidation(data.config);
