export default class Card {
  // passing one prefix for all template elements to constructor
  constructor(cardInfo, cardTempSelector,
              cardTempContentSelPrefix, handleCardClick, rmConfPopup) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._tempSelector = cardTempSelector;
    this._contPrefix = cardTempContentSelPrefix;
    this._imgView = handleCardClick;
    this._likeCounter = 0;
    this._rmPopup = rmConfPopup;
  }

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

  _delCard(evt) {
    evt.target.closest(`.${this._contPrefix}__item`).remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle(`${this._contPrefix}__like-btn_active`);
    // update like counter
    (evt.target.classList.contains(`${this._contPrefix}__like-btn_active`)) ?
      (++this._likeCounter) :
      (--this._likeCounter);
    // if like counter equals 0 - hide it
    (this._likeCounter) ?
      (this._temp.querySelector(`.${this._contPrefix}__like-counter`).textContent = this._likeCounter) :
      (this._temp.querySelector(`.${this._contPrefix}__like-counter`).textContent = "");
  }

  _addEvListeners() {
    this._temp.querySelector(`.${this._contPrefix}__image-container`).addEventListener("click", () => {
      this._imgView(this._name, this._link);
    });

    this._temp.querySelector(`.${this._contPrefix}__del-btn`).addEventListener("click", evt => {
      this._rmPopup.open();
      this._rmPopup._popupObj.querySelector(".popup__submit-btn").addEventListener("click", () => {
        this._rmPopup.close();
        this._delCard(evt);
      });
    });

    this._temp.querySelector(`.${this._contPrefix}__like-btn`).addEventListener("click", evt =>
      this._likeCard(evt));
  }

  createCard() {
    this._fillInfo();
    this._addEvListeners();
    return this._temp;
  }
}
