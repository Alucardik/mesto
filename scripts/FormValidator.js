// form validation------------------------------------------------------------------------------------------------------

export default class FormValidator {
// private section

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

  _hasInvalidInput(inputList) {
    return inputList.some(field => {
      return !field.validity.valid;
    });
  }

  _toggleSubmitBtnState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(`.${this._config.inputSelector}`));
    const submButton = this._formElement.querySelector(`.${this._config.submitButtonSelector}`);
    this._toggleSubmitBtnState(inputList, submButton);
    inputList.forEach(inpElement => {
      inpElement.addEventListener("input", () => {
        this._checkInpElemValidity(inpElement);
        this._toggleSubmitBtnState(inputList, submButton);
      });
    });
  }

// public section

  constructor(form, config) {
    this._config = config;
    this._formElement = form;
  }

  enableValidation() {
    this._setEventListeners();
  }

}

function showErrorMsg(formElement, inputElement, config) {
  const errorMsg = formElement.querySelector(`.${config.errorClass}_type_${inputElement.name}`);
  errorMsg.classList.add(config.errorClassActive);
  errorMsg.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideErrorMsg(formElement, inputElement, config) {
  const errorMsg = formElement.querySelector(`.${config.errorClass}_type_${inputElement.name}`);
  errorMsg.classList.remove(config.errorClassActive);
  errorMsg.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

function checkInpElemValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showErrorMsg(formElement, inputElement, config);
  } else {
    hideErrorMsg(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(field => {
    return !field.validity.valid;
  });
}

function toggleSubmitBtnState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(`.${config.inputSelector}`));
  const submButton = formElement.querySelector(`.${config.submitButtonSelector}`);
  toggleSubmitBtnState(inputList, submButton, config);
  inputList.forEach(inpElement => {
    inpElement.addEventListener("input", () => {
      checkInpElemValidity(formElement, inpElement, config);
      toggleSubmitBtnState(inputList, submButton, config);
    });
  });
}
