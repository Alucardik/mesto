// gallery item addition implementation---------------------------------------------------------------------------------

export default class Card {
// private section
  _createTemp() {
    this._temp = document.querySelector(this._tempSelector).content.
    querySelector(`.${this._contPrefix}__item`).cloneNode(true);
    this._tempImage = this._temp.querySelector(`.${this._contPrefix}__item-image`);
  }

  _fillInfo() {
    this._createTemp();
    this._tempImage.src = this._link;
    this._tempImage.alt = this._name;
    this._temp.querySelector(`.${this._contPrefix}__item-name`).textContent = this._name;
  }

// eventListeners subsection
  _delCard(evt) {
    evt.target.closest(`.${this._contPrefix}__item`).remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle(`${this._contPrefix}__like-btn_active`);
  }

  _addEvListeners() {
    this._temp.querySelector(`.${this._contPrefix}__image-container`).addEventListener("click", () =>
      this._imgView({name: this._name, link: this._link}));

    this._temp.querySelector(`.${this._contPrefix}__del-btn`).addEventListener("click", evt =>
      this._delCard(evt));

    this._temp.querySelector(`.${this._contPrefix}__like-btn`).addEventListener("click", evt =>
      this._likeCard(evt));
  }

// public section
  // passing one prefix for all template elements to constructor
  constructor(cardInfo, cardTempSelector,
              cardTempContentSelPrefix, cardImgViewFunc) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._tempSelector = cardTempSelector;
    this._contPrefix = cardTempContentSelPrefix;
    this._imgView = cardImgViewFunc;
  }

  createCard() {
    this._fillInfo();
    this._addEvListeners();
    return this._temp;
  }
}
