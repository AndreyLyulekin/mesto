import { Popup } from './Popup';

export class CardDeletePopup extends Popup {
  constructor(popupSelector, submitFormCallBack) {
    super(popupSelector);
    this.submitFormCallBack = submitFormCallBack;
    this._form = this.currentPopup.querySelector('form');
    this._submitButton = this.currentPopup.querySelector('.popup__btn');
    this._deleteCardInstance = null;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this.submitFormCallBack(this._deleteCardInstance);
  }
  changeSubmitButtonText(newText) {
    if (!newText) return;
    this._submitButton.textContent = newText;
  }

  open(cardInstance) {
    super.open();
    this._deleteCardInstance = cardInstance;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleSubmit(evt));
  }
}
