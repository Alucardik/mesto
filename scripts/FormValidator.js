// form validation------------------------------------------------------------------------------------------------------

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

function enableFormValidation(config) {
  const formList = Array.from(document.querySelectorAll(`.${config.formSelector}`));
  formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
}

enableFormValidation({
  formSelector: 'popup__form',
  inputSelector: 'popup__form-input',
  submitButtonSelector: 'popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__form-input_invalid',
  errorClass: 'popup__form-input-error',
  errorClassActive: 'popup__form-input-error_active'
});
