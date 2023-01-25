import { deleteCardIdKey } from '../utils/consts';

export class Card {
  constructor(data, cardTemplateSelector, handlers) {
    const { link, name, likes, owner, _id } = data;
    const { handleImagePopupOpen, handleLikeButton, handleDeletePopup } = handlers;

    this.cardId = _id;
    this._link = link;
    this._name = name;
    this._likes = likes;
    this.likesQuantity = this._likes?.length || 0;
    this._owner = owner;
    this._userId = localStorage.getItem('userId');
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._element = this._getTemplate().firstElementChild;
    this.likeButton = this._element.querySelector('.element__like');
    this._trashButton = this._element.querySelector('.element__trash');
    this._cardImage = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
    this._cardLikesCountElement = this._element.querySelector('.element__likesCount');
    this.handleImagePopupOpen = handleImagePopupOpen;
    this.handleLikeButton = handleLikeButton;
    this.handleDeletePopup = handleDeletePopup;
  }

  _increaseLikesCount(quantity) {
    if (quantity === undefined) return;
    this._cardLikesCountElement.textContent = quantity;
  }

  _decreaseLikesCount(quantity) {
    if (quantity === undefined) return;
    this._cardLikesCountElement.textContent = quantity;
  }

  _getTemplate() {
    return this._cardTemplate.cloneNode(true);
  }

  _manageTrashButtonVisibility() {
    if (this._owner._id !== this._userId) {
      this._trashButton.hidden = true;
    }
  }

  generateCard() {
    this._manageTrashButtonVisibility();
    this._checkOwnActiveLikes();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.id = this.cardId;
    this._title.textContent = this._name;
    this._cardLikesCountElement.textContent = this.likesQuantity;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._trashButton.addEventListener('click', () => this._openDeletePopup());
    this.likeButton.addEventListener('click', () => this._cardLike());
    this._cardImage.addEventListener('click', () => this._cardPopup());
  }

  _openDeletePopup() {
    this.handleDeletePopup();
    localStorage.setItem(deleteCardIdKey, this.cardId);
  }

  _cardLike() {
    this.handleLikeButton();
  }

  setLikeActive(quantity) {
    this._increaseLikesCount(quantity);
    this.likeButton.classList.add('element__like_active');
  }
  setLikeInActive(quantity) {
    this._decreaseLikesCount(quantity);
    this.likeButton.classList.remove('element__like_active');
  }

  _checkOwnActiveLikes() {
    if (this._likes && this._likes.some((item) => item._id === this._userId)) {
      this.likeButton.classList.add('element__like_active');
    }
  }

  _cardPopup() {
    this.handleImagePopupOpen(this._name, this._link);
  }
}
