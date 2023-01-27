export class Popup {
  constructor(popupSelector) {
    this.currentPopup = document.querySelector(popupSelector);
    this.popupCloseButton = this.currentPopup.querySelector('.popup__exit');
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  open() {
    this.currentPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this.currentPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this.currentPopup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup')) {
        this.close();
      }
    });
    this.popupCloseButton.addEventListener('click', () => this.close());
  }
}
