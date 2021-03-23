export default class Popup {
  constructor(popupSelector) {
    this._popupObj = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      if (document.querySelector(`.popup_opened`))
        this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains(`popup__close-btn`)) {
      this.close();
    } else if (!evt.target.closest(".popup__container")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupObj.addEventListener("click", this._handleClickClose);
  }

  open() {
    this._popupObj.classList.add(`popup_opened`);
    // adding a global listener to catch keyboard events for popups, cause they don't produce those themselves
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupObj.classList.remove(`popup_opened`);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
