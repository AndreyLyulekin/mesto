import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this.currentPopup.querySelector(".popup__image");
    this.subtitle = this.currentPopup.querySelector(".popup__subtitle");
    this.open = this.open.bind(this);
  }

  setEventListeners() {
    this.closeBtn.addEventListener("click", () => this.close());
  }

  open(evt) {
    super.open();
    this.image.src = evt.target.src;
    this.image.alt = evt.currentTarget.nextElementSibling.innerText;
    this.subtitle.textContent = evt.currentTarget.nextElementSibling.innerText;
    this.setEventListeners();
  }
}
