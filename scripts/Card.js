import togglePopup from './utils.js' 
import {imagePopup, popupSubtitle, popupImg} from './consts.js' 


export default class Card {
    constructor(data, cardTemplate) {
        this._link = data.link;
        this._name = data.name;
        this._cardTemplate = cardTemplate;
    }

    _getTemplate() {
        return this._cardTemplate.cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', evt => {
            this._deleteCard(evt);
        });
        this._element.querySelector('.element__like').addEventListener('click', evt => {
            this._cardLike(evt);
        });
        this._cardImage.addEventListener('click', evt => {
            this._cardPopup();
        });
    }

    _deleteCard(evt) {
        evt.target.closest('.element').remove();
    }

    _cardLike(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _cardPopup() {
        imagePopup.src = this._link;
        imagePopup.alt = this._name;
        popupSubtitle.textContent = this._name;
        togglePopup(popupImg);
    }
}