const buttonProfileEdit = document.querySelector(".profile__edit-btn");
const buttonPopupAddCard = document.querySelector(".profile__add-btn");
const cardsContainer = document.querySelector(".elements");
const card = document.querySelector("#card").content.querySelector(".element");
const formProfile = document
  .querySelector(".popup_profile")
  .querySelector(".popup__form");
const formCard = document
  .querySelector(".popup_card")
  .querySelector(".popup__form");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn-inactive",
  inputErrorClass: "input_red-error",
  errorClass: "popup__btn-inactive",
};

export {
  buttonProfileEdit,
  buttonPopupAddCard,
  cardsContainer,
  card,
  formCard,
  formProfile,
  validationSettings,
  initialCards,
};
