import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallBack) {
    super(popupSelector);
    this.submitFormCallBack = submitFormCallBack;
    this._form = this.currentPopup.querySelector('form');
    this._submitButton = this.currentPopup.querySelector('.popup__btn');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    return Array.from(this._inputList).reduce((acc, item) => {
      return { ...acc, [item.name]: item.value };
    }, {});
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this.submitFormCallBack(this._getInputValues());
  }

  setInputValue(userInfo) {
    Array.from(this._inputList).forEach((input) => {
      if (Object.hasOwn(userInfo, input.name)) {
        input.value = userInfo[input.name];
      }
    });
  }

  changeSubmitButtonText(newText) {
    if (!newText) return;
    this._submitButton.textContent = newText;
  }

  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleSubmit(evt));
  }
}
