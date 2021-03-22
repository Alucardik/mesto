import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  _fillImgInfo() {
    const img = this._popupObj.querySelector(".popup__image");
    img.src = this._imgLink;
    img.alt = this._imgName;
    this._popupObj.querySelector(".popup__image-text").textContent = this._imgName;
  }

  constructor(popupSelector, { name, link }) {
    super(popupSelector);
    this._imgName = name;
    this._imgLink = link;
  }

  open() {
    this._fillImgInfo();
    super.open();
  }
}
