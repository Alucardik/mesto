export default class Card {
  // passing one prefix for all template elements to constructor
  constructor(cardInfo, cardTempSelector,
              cardTempContentSelPrefix, handleCardClick, rmConfPopup, servMethods) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._likes = cardInfo.likes.length;
    this._isLiked = cardInfo.liked;
    this._owner = cardInfo.owner;
    this._tempSelector = cardTempSelector;
    this._contPrefix = cardTempContentSelPrefix;
    this._imgView = handleCardClick;
    this._rmPopup = rmConfPopup;
    this._id = cardInfo._id;
    this._rmFromServe = servMethods.delCard;
    this._addLike = servMethods.addLike;
    this._rmLike = servMethods.rmLike;
  }

  _createTemp() {
    this._temp = document.querySelector(this._tempSelector).content.
    querySelector(`.${this._contPrefix}__item`).cloneNode(true);
    this._tempImage = this._temp.querySelector(`.${this._contPrefix}__item-image`);
    this._likeCounter = this._temp.querySelector(`.${this._contPrefix}__like-counter`);
    // if card isn't created by current user then he is unable to delete the card
    if (!this._owner) {
      this._temp.querySelector(`.${this._contPrefix}__del-btn`).remove();
    }
  }

  _fillInfo() {
    this._createTemp();
    this._tempImage.src = this._link;
    this._tempImage.alt = this._name;
    this._temp.querySelector(`.${this._contPrefix}__item-name`).textContent = this._name;
    // set like button active if you have previously liked this card
    if (this._isLiked) {
      this._temp.querySelector(`.${this._contPrefix}__like-btn`).
      classList.add(`${this._contPrefix}__like-btn_active`);
    }
    this._setCounter();
  }

  _delCard() {
    this._rmPopup.close();
    this._rmFromServe(this._id)
    .then(() => {
      this._temp.remove();
    })
    .catch(err => {
      console.log("Error while removing card:", err);
    });
  }

  // if like counter equals 0 - hide it
  _setCounter() {
    (this._likes) ?
      (this._likeCounter.textContent = this._likes) :
      (this._likeCounter.textContent = "");
  }

  _likeCard(evt) {
    evt.target.classList.toggle(`${this._contPrefix}__like-btn_active`);
    // update like counter
    if (evt.target.classList.contains(`${this._contPrefix}__like-btn_active`)) {
      this._addLike(this._id)
      .then(res => {
        this._likes = res.likes.length;
        this._setCounter();
      })
      .catch(err => {
        console.log("Error while liking card:", err);
      });
    } else {
      this._rmLike(this._id)
        .then(res => {
          this._likes = res.likes.length;
          this._setCounter();
        })
        .catch(err => {
          console.log("Error while liking card:", err);
        });
    }
  }

  _addEvListeners() {
    this._temp.querySelector(`.${this._contPrefix}__image-container`).addEventListener("click", () => {
      this._imgView(this._name, this._link);
    });

    if (this._owner) {
      this._temp.querySelector(`.${this._contPrefix}__del-btn`).addEventListener("click", () => {
        this._rmPopup.open();
        this._rmPopup._setCardDelListener(this._delCard.bind(this));
      });
    }

    this._temp.querySelector(`.${this._contPrefix}__like-btn`).addEventListener("click", evt =>
      this._likeCard(evt));
  }

  createCard() {
    this._fillInfo();
    this._addEvListeners();
    return this._temp;
  }
}
