import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  _fillImgInfo() {
    console.log("fill-My obj:\t", this._popupObj);
    const img = this._popupObj.querySelector(".popup__image");
    img.src = this._imgLink;
    img.alt = this._imgName;
    this._popupObj.querySelector(".popup__image-text").textContent = this._imgName;
  }

  constructor(popupSelector, { name, link }) {
    super(popupSelector);
    this._imgName = name;
    this._imgLink = link;
    console.log("con-My obj:\t", this._popupObj);
  }

  open() {
    this._fillImgInfo();
    super.open();
  }
}
