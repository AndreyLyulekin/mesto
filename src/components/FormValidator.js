export class FormValidator {
  constructor(form, settings) {
    this._isInputsGood = false;
    this._form = form;
    this.inputSelector = settings.inputSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
    this._submitButton = this._form.querySelector(
      settings.submitButtonSelector
    );
  }

  _toggleBtnStateActive() {
    if (!this._isInputsGood) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this.errorClass);
    this._submitButton.disabled = true;
  }
  _enableSubmitButton() {
    this._submitButton.classList.remove(this.errorClass);
    this._submitButton.disabled = false;
  }

  _showErrors(currentInput) {
    currentInput.classList.add(this.inputErrorClass);
    const errorMessageElement = this._form.querySelector(
      `#errorMessage-${currentInput.name}`
    );
    errorMessageElement.textContent = currentInput.validationMessage;
    this._toggleBtnStateActive();
  }

  _hideErrors(currentInput) {
    currentInput.classList.remove(this.inputErrorClass);
    const errorMessageElement = this._form.querySelector(
      `#errorMessage-${currentInput.name}`
    );
    errorMessageElement.textContent = "";
    this._toggleBtnStateActive();
  }

  _checkValidity(currentInput) {
    if (currentInput.validity.valid) {
      this._hideErrors(currentInput);
    } else {
      this._showErrors(currentInput);
    }
  }

  _findInputs() {
    this._inputs = Array.from(this._form.querySelectorAll(this.inputSelector));
  }

  enableValidation() {
    this._findInputs();
    this._inputs.forEach((currentInput) => {
      currentInput.addEventListener("input", () => {
        this._isInputsGood = this._inputs.every(
          (input) => input.validity.valid
        );
        this._checkValidity(currentInput);
      });
    });
  }
}
