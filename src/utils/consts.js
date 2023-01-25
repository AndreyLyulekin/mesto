const buttonProfileEdit = document.querySelector('.profile__edit-btn');
const buttonPopupAddCard = document.querySelector('.profile__add-btn');
const buttonPopupChangeAvatar = document.querySelector('.profile__avatar-case');
const formProfile = document.querySelector('.popup_profile').querySelector('.popup__form');
const formCard = document.querySelector('.popup_card').querySelector('.popup__form');
const formAvatar = document.querySelector('.popup_avatar').querySelector('.popup__form');
const formDelete = document.querySelector('.popup_card-delete').querySelector('.popup__form');

const deleteCardIdKey = 'cardDeleteId';

const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn-inactive',
  inputErrorClass: 'input_red-error',
  errorClass: 'popup__btn-inactive',
};

export {
  buttonProfileEdit,
  buttonPopupAddCard,
  formCard,
  formAvatar,
  formProfile,
  formDelete,
  validationSettings,
  deleteCardIdKey,
  buttonPopupChangeAvatar,
};

export const apiCredentials = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  token: '8e3ad974-ef23-4fdc-9e86-84348071758d',
};
