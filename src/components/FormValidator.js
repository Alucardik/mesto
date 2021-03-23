export default class FormValidator {
  constructor(form, config) {
    this._config = config;
    this._formElement = form;
  }

  _showErrorMsg(inputElement) {
    const errorMsg = this._formElement.querySelector(`.${this._config.errorClass}_type_${inputElement.name}`);
    errorMsg.classList.add(this._config.errorClassActive);
    errorMsg.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideErrorMsg(inputElement) {
    const errorMsg = this._formElement.querySelector(`.${this._config.errorClass}_type_${inputElement.name}`);
    errorMsg.classList.remove(this._config.errorClassActive);
    errorMsg.textContent = "";
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInpElemValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorMsg(inputElement);
    } else {
      this._hideErrorMsg(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(field => {
      return !field.validity.valid;
    });
  }

  _toggleSubmitBtnState() {
    if (this._hasInvalidInput()) {
      this._submButton.classList.add(this._config.inactiveButtonClass);
      this._submButton.disabled = true;
    } else {
      this._submButton.classList.remove(this._config.inactiveButtonClass);
      this._submButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._config.inputSelector}`));
    this._submButton = this._formElement.querySelector(`.${this._config.submitButtonSelector}`);
    this._toggleSubmitBtnState(this._inputList, this._submButton);
    this._inputList.forEach(inpElement => {
      inpElement.addEventListener("input", () => {
        this._checkInpElemValidity(inpElement);
        this._toggleSubmitBtnState();
      });
    });
  }

  // disable submit button and hide error messages before opening popup
  resetValidation() {
    this._submButton.classList.add(this._config.inactiveButtonClass);
    this._inputList.forEach(field => {
      this._hideErrorMsg(field);
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}
