// using old hideErrorMsg function to hide previous errors on popup opening
// in order not to create another FormValidator class instance

export default function hideErrorMsg(formElement, inputElement, config) {
  const errorMsg = formElement.querySelector(`.${config.errorClass}_type_${inputElement.name}`);
  errorMsg.classList.remove(config.errorClassActive);
  errorMsg.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}
