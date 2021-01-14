// profile section script

let editBtn = document.querySelector(".profile__btn_type_edit");
let popup = document.querySelector(".popup");
let profName = document.querySelector(".profile__name");
let profDescr = document.querySelector(".profile__description");
let formElement = document.querySelector(".popup__form");
let formFields = formElement.querySelectorAll(".popup__form-field");

editBtn.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  formFields[0].value = profName.textContent;
  formFields[1].value = profDescr.textContent;
})

// popup section script

let closeBtn = document.querySelector(".popup__close-btn");

closeBtn.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
})

function handleFormSubmit (evt) {
  evt.preventDefault();

  profName.textContent = formFields[0].value;
  profDescr.textContent = formFields[1].value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener('submit', handleFormSubmit);

// gallery section script

let likeBtns = document.querySelectorAll(".gallery__like-btn");

for (let i = 0; i < likeBtns.length; ++i) {
  likeBtns[i].addEventListener("click", function () {
    likeBtns[i].classList.toggle("gallery__like-btn_active");
  })
}
