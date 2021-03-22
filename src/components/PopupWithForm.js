import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  _disableSubmit() {
    const submButton = this._popupObj.querySelector(".popup__submit-btn");
    submButton.classList.add("popup__submit-btn_inactive");
    submButton.disabled = true;
  }

  _getInputValues() {
    return this._inpArray.
    map(field => {
      return field.value;
    });
  }

  constructor(popupSelector, { formName, handleSubm }, { hideErrorMsg, config }) {
    super(popupSelector);
    this._submit = handleSubm;
    this._formName = formName;
    // function used to hide previous form errors
    this._hideErrorMsg = hideErrorMsg;
    // config object for hideError func
    this._config = config;
    // form's fields array
    this._inpArray = Array.from(document.forms[this._formName].
    querySelectorAll(".popup__form-input"));
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupObj.addEventListener("submit", this._submit);
  }

  close() {
    this._disableSubmit();
    this._popupObj.querySelector(".popup__form").reset();
    this._inpArray.forEach(field => {
      this._hideErrorMsg(document.forms[this._formName], field, this._config);
    });
    super.close();
  }

}
