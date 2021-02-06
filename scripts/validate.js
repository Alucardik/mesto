// form validation------------------------------------------------------------------------------------------------------

function showErrorMsg(formElement, inputElement) {
  const errorMsg = formElement.querySelector(`.popup__form-input-error_type_${inputElement.name}`);
  errorMsg.classList.add("popup__form-input-error_active");
  errorMsg.textContent = inputElement.validationMessage;
  inputElement.classList.add("popup__form-input_invalid");
}

function hideErrorMsg(formElement, inputElement) {
  const errorMsg = formElement.querySelector(`.popup__form-input-error_type_${inputElement.name}`);
  errorMsg.classList.remove("popup__form-input-error_active");
  errorMsg.textContent = "";
  inputElement.classList.remove("popup__form-input_invalid");
}

function checkInpElemValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showErrorMsg(formElement, inputElement);
  } else {
    hideErrorMsg(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(field => {
    return !field.validity.valid;
  });
}

function toggleSubmitBtnState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-btn_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__submit-btn_inactive");
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
  const submButton = formElement.querySelector(".popup__submit-btn");
  toggleSubmitBtnState(inputList, submButton);
  inputList.forEach(inpElement => {
    inpElement.addEventListener("input", () => {
      checkInpElemValidity(formElement, inpElement);
      toggleSubmitBtnState(inputList, submButton);
    });
  });

}

function enableFormValidation() {
  setEventListeners(editFormElement);
  setEventListeners(addFormElement);
}

enableFormValidation();
