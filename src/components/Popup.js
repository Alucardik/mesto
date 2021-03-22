export default class Popup {
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      // this._popupObj = document.querySelector(`.popup_opened`);
      if (document.querySelector(`.popup_opened`))
        this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains(`popup__close-btn`)) {
      // this._popupObj = evt.target.closest(`.popup`)
      this.close();
    } else if (!evt.target.closest(".popup__container")) {
      this.close();
    }
  }

  constructor(popupSelector) {
    // this._popupSelector = popupSelector;
    this._popupObj = document.querySelector(popupSelector);
  }

  // TODO check binds
  setEventListeners() {
    this._popupObj.addEventListener("click", this._handleClickClose.bind(this));
  }

  open() {
    this._popupObj.classList.add(`popup_opened`);
    // adding a global listener to catch keyboard events for popups, cause they don't produce those themselves
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popupObj.classList.remove(`popup_opened`);
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }
}
