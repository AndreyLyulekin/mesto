import './index.css';
import {
  buttonProfileEdit,
  buttonPopupAddCard,
  formCard,
  formProfile,
  validationSettings,
  deleteCardIdKey,
  buttonPopupChangeAvatar,
  formAvatar,
  formDelete,
} from '../utils/consts.js';
import { FormValidator } from '../components/FormValidator';
import { UserInfo } from '../components/UserInfo';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { CardsService } from '../components/Api/CardsService';
import { UserService } from '../components/Api/UserService';

/*
 * Инициализируем валидаторы
 */
const validationFormProfile = new FormValidator(formProfile, validationSettings);
const validationFormCard = new FormValidator(formCard, validationSettings);
const validationFormAvatar = new FormValidator(formAvatar, validationSettings);
const validationFormDeleteCard = new FormValidator(formDelete, validationSettings);

/*
 * Инициализируем сервисы для работы с сервером
 */
const cardService = new CardsService();
const userService = new UserService();

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__subtitle',
  avatarSelector: '.profile__photo',
});

const newSectionElement = new Section((cardData) => {
  const cardElement = createCard(cardData);
  newSectionElement.addItem(cardElement);
}, '.elements');

/*
 * Инициализируем модальные окна
 */
const userInfoPopup = new PopupWithForm('.popup_profile', ({ userName, userJob }) => {
  userInfoPopup.changeSubmitButtonText('Сохраняем...');
  validationFormProfile.disableSubmitButton();
  userService
    .updateUserInfo({
      name: userName,
      about: userJob,
    })
    .then((userData) => {
      userInfoPopup.changeSubmitButtonText('Готово!');
      userInfo.setUserInfo(userData);
      setTimeout(() => {
        userInfoPopup.close();
        userInfoPopup.changeSubmitButtonText('Сохранить');
      }, 500);
    });
});
const popupWithImage = new PopupWithImage('.popup_scale-image');
const newCardPopup = new PopupWithForm('.popup_card', (values) => {
  newCardPopup.changeSubmitButtonText('Сохраняем...');
  validationFormCard.disableSubmitButton();
  cardService
    .addNewCard({
      link: values.urlCard,
      name: values.cardName,
    })
    .then((cardData) => {
      newSectionElement.addItem(createCard(cardData));
      newCardPopup.changeSubmitButtonText('Готово!');
      setTimeout(() => {
        newCardPopup.close();
        newCardPopup.changeSubmitButtonText('Сохранить');
      }, 500);
    });
});
const cardDeletePopup = new PopupWithForm('.popup_card-delete', () => {
  const cardId = localStorage.getItem(deleteCardIdKey);
  cardDeletePopup.changeSubmitButtonText('Удаляем...');
  validationFormDeleteCard.disableSubmitButton();
  cardService.deleteCard(cardId).then(() => {
    newSectionElement.deleteItem(cardId);
    cardDeletePopup.changeSubmitButtonText('Готово!');
    setTimeout(() => {
      cardDeletePopup.close();
      validationFormDeleteCard.enableSubmitButton();
    }, 500);
  });
});
const changeAvatarPopup = new PopupWithForm('.popup_avatar', ({ avatar }) => {
  changeAvatarPopup.changeSubmitButtonText('Сохраняем...');
  validationFormAvatar.disableSubmitButton();
  userService.changeAvatar({ avatar }).then(() => {
    changeAvatarPopup.changeSubmitButtonText('Готово!');
    setTimeout(() => {
      changeAvatarPopup.close();
      changeAvatarPopup.changeSubmitButtonText('Сохранить');
    }, 500);
  });
});

/*
 * Навешиваем слушатели и описываем обработчики
 */
const editProfileButtonHandler = () => {
  userInfoPopup.setInputValue(userInfo.getUserInfo());
  validationFormProfile.disableSubmitButton();
  userInfoPopup.open();
};
const addCardButtonHandler = () => {
  validationFormCard.disableSubmitButton();
  newCardPopup.open();
};
const avatarButtonHandler = () => {
  validationFormAvatar.disableSubmitButton();
  changeAvatarPopup.open();
};
buttonProfileEdit.addEventListener('click', editProfileButtonHandler);
buttonPopupAddCard.addEventListener('click', addCardButtonHandler);
buttonPopupChangeAvatar.addEventListener('click', avatarButtonHandler);
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
cardDeletePopup.setEventListeners();
changeAvatarPopup.setEventListeners();
popupWithImage.setEventListeners();

/*
 * Определяем утилитарную функцию создания карточек
 */
function handleLikeButton() {
  this._cardLikesCountElement.textContent = 'loading...';

  if (this.likeButton.classList.contains('element__like_active')) {
    cardService.setLikeInActive(this.cardId).then(({ likes }) => {
      this.setLikeInActive(likes?.length);
    });
  } else {
    cardService.setLikeActive(this.cardId).then(({ likes }) => {
      this.setLikeActive(likes?.length);
    });
  }
}

function handleDeletePopup() {
  cardDeletePopup.open();
  validationFormDeleteCard.enableValidation();
}

function createCard(cardData) {
  return new Card(cardData, '#card-template', {
    handleImagePopupOpen: popupWithImage.open,
    handleLikeButton,
    handleDeletePopup,
  }).generateCard();
}

/*
 * Запрашиваем карточки и данные пользователя
 */
Promise.allSettled([cardService.getAllCards(), userService.getCurrentUser()]).then(([cardsAnswer, userInfoAnswer]) => {
  if (cardsAnswer.status === 'fulfilled') {
    newSectionElement.renderItems(cardsAnswer.value);
  }
  if (userInfoAnswer.status === 'fulfilled') {
    const userData = userInfoAnswer.value;
    localStorage.setItem('userId', userInfo._id);
    userInfo.setUserInfo(userData);
  }
});

/*
 * Активируем валидацию
 */
validationFormProfile.enableValidation();
validationFormCard.enableValidation();
validationFormAvatar.enableValidation();
