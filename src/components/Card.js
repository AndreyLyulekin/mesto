export class Card {
  constructor(data, cardTemplateSelector, handlers) {
    const { link, name, likes, owner, _id } = data;
    const { handleImageClick, handleLikeClick, handleDeleteClick } = handlers;

    this._cardId = _id;
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
    this.handleImageClick = handleImageClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteClick = handleDeleteClick;
  }

  _setLikesCount(quantity) {
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

  _setEventListeners() {
    this._trashButton.addEventListener('click', () => this._openDeletePopup());
    this.likeButton.addEventListener('click', () => this._handleLikeClick());
    this._cardImage.addEventListener('click', () => this._handleImageClick());
  }

  _openDeletePopup() {
    this.handleDeleteClick();
  }

  _handleLikeClick() {
    this.handleLikeClick();
  }

  _checkIsOwnLikesExist() {
    return this._likes && this._likes.some((item) => item._id === this._userId);
  }

  _setOwnActiveLikes() {
    if (this._checkIsOwnLikesExist()) {
      this.likeButton.classList.add('element__like_active');
    }
  }

  _handleImageClick() {
    this.handleImageClick(this._name, this._link);
  }

  setLoadingState(state) {
    this._cardLikesCountElement.textContent = state;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getCardId() {
    return this._cardId;
  }

  checkIsLiked() {
    return this.likeButton.classList.contains('element__like_active');
  }

  setLikeActive(quantity) {
    this._setLikesCount(quantity);
    this.likeButton.classList.add('element__like_active');
  }
  setLikeInActive(quantity) {
    this._setLikesCount(quantity);
    this.likeButton.classList.remove('element__like_active');
  }

  generateCard() {
    this._manageTrashButtonVisibility();
    this._setOwnActiveLikes();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.id = this._cardId;
    this._title.textContent = this._name;
    this._cardLikesCountElement.textContent = this.likesQuantity;
    this._setEventListeners();

    return this._element;
  }
}
