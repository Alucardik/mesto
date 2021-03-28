import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import data from "../utils/constants.js";
import "./index.css";

// initialising server API
const serverApi = new Api(data.serverAutData);

const cardApi = {
  delCard: serverApi.deleteCard.bind(serverApi),
  addLike: serverApi.addLike.bind(serverApi),
  rmLike: serverApi.rmLike.bind(serverApi)
}

const profile = new UserInfo({
  usrNameSel: ".profile__name",
  usrStatusSel: ".profile__description"
});

// Profile

// hide userInfo until getting a response from server

profile.setUserInfo({usrName: "...",
  usrStatus: "..."});

serverApi.getProfileInfo()
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return new Promise.reject(res.status);
  })
  .catch(err => {
    console.log("Error while loading profile data:", err);
  })
  .then(res => {
    serverApi.id = res._id;
    data.avatarImg.src = res.avatar;
    profile.setUserInfo({usrName: res.name,
                         usrStatus: res.about});
  });

// Gallery

const imgPopup = new PopupWithImage("#image-view");
imgPopup.setEventListeners();

const cardRmPopup = new Popup("#conf-removal");
cardRmPopup.setEventListeners();

const Gallery = new Section({items: [],
  renderer: item => {
    Gallery.addItem(new Card(item, "#gallery-item",
      "gallery", imgPopup.open.bind(imgPopup),
      cardRmPopup, cardApi).createCard());
  }}, ".gallery");

serverApi.getInitialCards()
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  })
  .catch(err => {
    console.log("Error while loading images:", err);
  })
  .then(res => {
    res.forEach(item => {
      item.owner = (item.owner._id === serverApi.id);
      item.liked = item.likes.some(curLike => {
        return curLike._id === serverApi.id;
      })
      Gallery.addItem(new Card(item, "#gallery-item",
        "gallery", imgPopup.open.bind(imgPopup),
        cardRmPopup, cardApi).createCard())
    });
  });

// setting up form popups

const chAvFormPopup = new PopupWithForm("#ch-img-popup", {
  formName: "avatar-info",
  handleSubm: (formValues) => {
    serverApi.updateAvatar(formValues["avatar-url"])
    .then(res => {
      if (res.ok) {
        data.avatarImg.src = formValues["avatar-url"];
        return;
      }

      return new Promise.reject(res.status);
    })
    .catch(err => {
      console.log("Error while updating avatar image:", err);
    });
    chAvFormPopup.close();
  }
});

const editFormPopup = new PopupWithForm("#edit-popup", {
    formName: "profile-info",
    handleSubm: (formValues) => {
      const curInfo = {
        usrName: formValues["profile-name"],
        usrStatus: formValues["profile-description"]
      };

      serverApi.updateProfile(curInfo)
      .then(res => {
        if (res.ok) {
          profile.setUserInfo(curInfo);
          return;
        }
        return new Promise.reject(res.status);
      })
      .catch(err => {
        console.log("Error while updating profile info:", err);
      });
      editFormPopup.close();
    }
});

const addFormPopup = new PopupWithForm("#add-popup", {
    formName: "add-card",
    handleSubm: (formValues) => {
      const curItem = {name: formValues["card-name"],
        link: formValues["card-url"],
        likes: 0,
        owner: true,
        liked: false};
      serverApi.publishCard(curItem)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return new Promise.reject(res.status);
      })
      .catch(err => {
        console.log("Error while publishing card", err);
      })
      .then(res => {
        console.log(res);
        curItem.likes = [];
        Gallery.addItem(new Card(curItem, "#gallery-item",
          "gallery", imgPopup.open.bind(imgPopup),
          cardRmPopup, cardApi).createCard());
      })
      addFormPopup.close();
    }
});

chAvFormPopup.setEventListeners();
addFormPopup.setEventListeners();
editFormPopup.setEventListeners();

// enabling form validation

const chAvFormValidator = new FormValidator(document.querySelector("#ch-img-popup"), data.config);
const editFormValidator = new FormValidator(document.querySelector("#edit-popup"), data.config);
const addFormValidator = new FormValidator(document.querySelector("#add-popup"), data.config);
chAvFormValidator.enableValidation();
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

data.avatarBtn.addEventListener("click", () => {
  chAvFormValidator.resetValidation();
  chAvFormPopup.open();
});
