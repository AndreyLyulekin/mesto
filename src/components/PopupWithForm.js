import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallBack) {
    super(popupSelector);
    this.submitFormCallBack = submitFormCallBack;
    this._form = this.currentPopup.querySelector("form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }
  _getInputValues() {
    return Array.from(this._inputList).reduce((acc, item) => {
      return { ...acc, [item.name]: item.value };
    }, {});
  }

  close() {
    super.close();
    this._form.reset();
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this.submitFormCallBack(this._getInputValues());
    this.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => this._handleSubmit(evt));
  }
}
