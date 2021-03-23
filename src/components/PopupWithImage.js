import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  _fillImgInfo(name, link) {
    const img = this._popupObj.querySelector(".popup__image");
    img.src = link;
    img.alt = name;
    this._popupObj.querySelector(".popup__image-text").textContent = name;
  }

  open(name, link) {
    this._fillImgInfo(name, link);
    super.open();
  }
}
