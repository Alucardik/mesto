import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import data from "../utils/constants.js";
import "./index.css";

function createCard(cardInfo) {
  return new Card(cardInfo, "#gallery-item",
    "gallery", imgPopup.open.bind(imgPopup),
    cardRmPopup, cardApi).createCard();
}

// initialising server API
const serverApi = new Api(data.serverAutData);

const cardApi = {
  delCard: serverApi.deleteCard.bind(serverApi),
  addLike: serverApi.addLike.bind(serverApi),
  rmLike: serverApi.rmLike.bind(serverApi)
}

const profile = new UserInfo({
  usrNameSel: ".profile__name",
  usrStatusSel: ".profile__description",
  usrAvatarSel: ".profile__img"
});

// hide userInfo until getting a response from server

profile.setUserInfo({
  usrName: "...",
  usrStatus: "...",
  usrAvatar: data.avatarLoading
});

const imgPopup = new PopupWithImage("#image-view");
imgPopup.setEventListeners();

const cardRmPopup = new PopupWithConfirm("#conf-removal");
cardRmPopup.setEventListeners();

const gallery = new Section({items: [],
  renderer: item => {
    gallery.addItem(createCard(item));
  }}, ".gallery");

const profilePromise =  serverApi.getProfileInfo();

const cardsPromise = serverApi.getInitialCards();

Promise.all([profilePromise, cardsPromise])
  .then(results => {
    serverApi.id = results[0]._id;
    profile.setUserInfo({
      usrName: results[0].name,
      usrStatus: results[0].about,
      usrAvatar: results[0].avatar
    });
    results[1].forEach(item => {
      item.owner = (item.owner._id === serverApi.id);
      item.liked = item.likes.some(curLike => {
        return curLike._id === serverApi.id;
      });
      gallery.addItem(createCard(item));
    });
  })
  .catch(errs => {
    console.log("Errors encountered:", errs);
  });

const chAvFormPopup = new PopupWithForm("#ch-img-popup", {
  formName: "avatar-info",
  handleSubm: (formValues) => {
    chAvFormPopup.formLoading();
    serverApi.updateAvatar(formValues["avatar-url"])
    .then(() => {
      data.avatarImg.src = formValues["avatar-url"];
      chAvFormPopup.close();
    })
    .catch(err => {
      console.log("Error while updating avatar image:", err);
    })
    .finally(() => {
      chAvFormPopup.formLoaded();
    })
  }
});

const editFormPopup = new PopupWithForm("#edit-popup", {
    formName: "profile-info",
    handleSubm: (formValues) => {
      editFormPopup.formLoading();
      const curInfo = {
        usrName: formValues["profile-name"],
        usrStatus: formValues["profile-description"],
        usrAvatar: profile.getUserInfo().usrAvatar.src
      };

      serverApi.updateProfile(curInfo)
      .then(() => {
        profile.setUserInfo(curInfo);
        editFormPopup.close();
      })
      .catch(err => {
        console.log("Error while updating profile info:", err);
      })
      .finally(() => {
        editFormPopup.formLoaded();
      });
    }
});

const addFormPopup = new PopupWithForm("#add-popup", {
    formName: "add-card",
    handleSubm: (formValues) => {
      addFormPopup.formLoading();
      const curItem = {name: formValues["card-name"],
        link: formValues["card-url"],
        likes: 0,
        owner: true,
        liked: false};
      serverApi.publishCard(curItem)
      .then(res => {
        curItem.likes = [];
        curItem._id = res._id;
        gallery.addItem(createCard(curItem));
        addFormPopup.close();
      })
      .catch(err => {
        console.log("Error while publishing card", err);
      })
      .finally(() => {
        addFormPopup.formLoaded();
      });
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
