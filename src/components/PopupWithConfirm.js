import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  _setCardDelListener(cardMethod) {
    // console.log("Given", cardMethod);
    this._triggerDelCard = cardMethod;
    // console.log("Binded", this._triggerDelCard);
    this._btn = this._popupObj.querySelector(".popup__submit-btn");
    this._btn.addEventListener("click", this._triggerDelCard);
  }

  close() {
    super.close();
    this._btn.removeEventListener("click", this._triggerDelCard);
  }
}
