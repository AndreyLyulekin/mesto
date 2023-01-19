//проверка на валидность инпутов

export class FormValidator {
  constructor(form, settings) {
    this._isInputsGood = false;
    this.form = form;
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
  }

  _toggleBtnStateActive(submitCurrentButton) {
    if (!this._isInputsGood) {
      submitCurrentButton.classList.add(this.errorClass);
      submitCurrentButton.disabled = true;
    } else {
      submitCurrentButton.classList.remove(this.errorClass);
      submitCurrentButton.disabled = false;
    }
  }

  _showErrors(currentInput, submitCurrentButton) {
    currentInput.classList.add(this.inputErrorClass);
    currentInput.nextElementSibling.textContent =
      currentInput.validationMessage;
    this._toggleBtnStateActive(submitCurrentButton);
  }

  _hideErrors(currentInput, submitCurrentButton) {
    currentInput.classList.remove(this.inputErrorClass);
    currentInput.nextElementSibling.textContent = "";
    this._toggleBtnStateActive(submitCurrentButton);
  }

  _checkValidity(currentInput, submitCurrentButton) {
    if (currentInput.validity.valid) {
      // убрать красную обводку
      this._hideErrors(currentInput, submitCurrentButton);
    } else {
      // добавить красную обводку
      this._showErrors(currentInput, submitCurrentButton);
    }
  }

  _setEventListeners() {
    this._toggleSubmitButtonSelector();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputvalidity(inputElement);
        this._toggleSubmitButtonselector();
      });
    });
  }

  _getInputs() {
    return Array.from(this.form.querySelectorAll(this.inputSelector));
  }
  _getSubmitCurrentButton() {
    return this.form.querySelector(this.submitButtonSelector);
  }

  enableValidation() {
    this._getInputs().forEach((currentInput) => {
      currentInput.addEventListener("input", () => {
        this._isInputsGood = this._getInputs().every(
          (input) => input.validity.valid
        );
        this._checkValidity(currentInput, this._getSubmitCurrentButton());
      });
    });
  }

  disableSubmitButton(button) {
    button.classList.add(this.inactiveButtonClass);
    button.disabled = true;
  }
}
