import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  _getInputValues() {

  }

  constructor(popupSelector, { hadndleSubm }) {
    super(popupSelector);
    this._submit = hadndleSubm;
  }

  // open() {
  //   super.open();
  // }

  close() {
    this._popupObj.reset();
    super.close();
  }

}
