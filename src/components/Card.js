export class Card {
  constructor(data, cardTemplateSelector, handleImagePopupOpen) {
    this._link = data.link;
    this._name = data.name;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this.handleImagePopupOpen = handleImagePopupOpen;
  }

  _getTemplate() {
    return this._cardTemplate.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate().firstElementChild;
    this._likeButton = this._element.querySelector(".element__like");
    this._trashButton = this._element.querySelector(".element__trash");
    this._cardImage = this._element.querySelector(".element__image");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._trashButton.addEventListener("click", () => this._deleteCard());
    this._likeButton.addEventListener("click", () => this._cardLike());
    this._cardImage.addEventListener("click", () => this._cardPopup());
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _cardLike() {
    this._likeButton.classList.toggle("element__like_active");
  }

  _cardPopup() {
    this.handleImagePopupOpen(this._name, this._link);
  }
}
