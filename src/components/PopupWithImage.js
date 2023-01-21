import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this.currentPopup.querySelector(".popup__image");
    this.subtitle = this.currentPopup.querySelector(".popup__subtitle");
    this.open = this.open.bind(this);
  }

  open(name, link) {
    super.open();
    this.image.src = link;
    this.image.alt = name;
    this.subtitle.textContent = name;
  }
}
