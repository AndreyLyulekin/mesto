export class Popup {
  constructor(popupSelector) {
    this.currentPopup = document.querySelector(popupSelector);
    this.closeBtn = this.currentPopup.querySelector(".popup__exit");
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this.currentPopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this.currentPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners(openButton) {
    openButton.addEventListener("click", () => this.open());
    this.closeBtn.addEventListener("click", () => this.close());
  }
}
