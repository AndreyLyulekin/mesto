import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallBack) {
    super(popupSelector);
    this.submitFormCallBack = submitFormCallBack;
    this.submitFormButton = this.currentPopup.querySelector(".popup__btn");
  }
  _getInputValues() {
    const inputsFromCurrentForm = Array.from(
      this.currentPopup.querySelectorAll(".popup__input")
    );
    return inputsFromCurrentForm.reduce((acc, item) => {
      return { ...acc, [item.name]: item.value };
    }, {});
  }

  close() {
    super.close();
    this.currentPopup.querySelector("form").reset();
    this.submitFormButton.disabled = true;
    this.submitFormButton.classList.add("popup__btn-inactive");
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this.submitFormCallBack(this._getInputValues());
    this.close();
  }
  setEventListeners(openButton) {
    super.setEventListeners(openButton);
    this.submitFormButton.addEventListener("click", (evt) =>
      this._handleSubmit(evt)
    );
  }
}
