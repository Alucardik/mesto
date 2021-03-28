import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formName, handleSubm }) {
    super(popupSelector);
    this._submit = handleSubm;
    this._formName = formName;
    this._sbmBtn = this._popupObj.querySelector(".popup__submit-btn");
    this._sbmBtnText = this._sbmBtn.textContent;
    // form's fields array
    this._inpList = Array.from(document.forms[this._formName].
    querySelectorAll(".popup__form-input"));
  }

  _getInputValues() {
    this._formValues = {};
    this._inpList.forEach(field => {
      this._formValues[field.name] = field.value;
    });
    return this._formValues;
  }

  formLoading() {
    this._sbmBtn.textContent = this._sbmBtnText + "...";
  }

  formLoaded() {
    this._sbmBtn.textContent = this._sbmBtnText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupObj.addEventListener("submit", evt => {
      evt.preventDefault();
      this._submit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupObj.querySelector(".popup__form").reset();
  }

}
