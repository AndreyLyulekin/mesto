import './index.css';
import {
  buttonProfileEdit,
  buttonPopupAddCard,
  formCard,
  formProfile,
  validationSettings,
  buttonPopupChangeAvatar,
  formAvatar,
  formDelete,
  apiCredentials,
} from '../utils/consts.js';
import { FormValidator } from '../components/FormValidator';
import { UserInfo } from '../components/UserInfo';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { CardsService } from '../components/Api/CardsService';
import { UserService } from '../components/Api/UserService';
import { CardDeletePopup } from '../components/CardDeletePopup';

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
const cardService = new CardsService(apiCredentials);
const userService = new UserService(apiCredentials);

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__subtitle',
  avatarSelector: '.profile__photo',
});

const cardsSection = new Section((cardData) => {
  const cardElement = createCard(cardData);
  cardsSection.addItem(cardElement);
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
    })
    .catch((e) => {
      userInfoPopup.changeSubmitButtonText('Ошибка!');
      console.error(e?.reason || e?.message);
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
      cardsSection.addItem(createCard(cardData));
      newCardPopup.changeSubmitButtonText('Готово!');
      setTimeout(() => {
        newCardPopup.close();
        newCardPopup.changeSubmitButtonText('Сохранить');
      }, 500);
    })
    .catch((e) => {
      newCardPopup.changeSubmitButtonText('Ошибка!');
      console.error(e?.reason || e?.message);
    });
});
const cardDeletePopup = new CardDeletePopup('.popup_card-delete', (deleteCardInstance) => {
  const cardId = deleteCardInstance.getCardId();
  cardDeletePopup.changeSubmitButtonText('Удаляем...');
  validationFormDeleteCard.disableSubmitButton();
  cardService
    .deleteCard(cardId)
    .then(() => {
      deleteCardInstance.deleteCard();
      cardDeletePopup.changeSubmitButtonText('Готово!');
      setTimeout(() => {
        cardDeletePopup.close();
        validationFormDeleteCard.enableSubmitButton();
      }, 500);
    })
    .catch((e) => {
      cardDeletePopup.changeSubmitButtonText('Ошибка!');
      console.error(e?.reason || e?.message);
    });
});
const changeAvatarPopup = new PopupWithForm('.popup_avatar', ({ avatar }) => {
  changeAvatarPopup.changeSubmitButtonText('Сохраняем...');
  validationFormAvatar.disableSubmitButton();
  userService
    .changeAvatar({ avatar })
    .then(() => {
      userInfo.setAvatar(avatar);
      changeAvatarPopup.changeSubmitButtonText('Готово!');
      setTimeout(() => {
        changeAvatarPopup.close();
        changeAvatarPopup.changeSubmitButtonText('Сохранить');
      }, 500);
    })
    .catch((e) => {
      changeAvatarPopup.changeSubmitButtonText('Ошибка!');
      console.error(e?.reason || e?.message);
    });
});

/*
 * Навешиваем слушатели и описываем обработчики
 */
const openProfilePopup = () => {
  userInfoPopup.setInputValue(userInfo.getUserInfo());
  userInfoPopup.changeSubmitButtonText('Сохранить');
  userInfoPopup.open();
};
const openAddCardPopup = () => {
  validationFormCard.disableSubmitButton();
  newCardPopup.changeSubmitButtonText('Создать');
  newCardPopup.open();
};
const openAvatarPopup = () => {
  validationFormAvatar.disableSubmitButton();
  changeAvatarPopup.changeSubmitButtonText('Сохранить');
  changeAvatarPopup.open();
};
buttonProfileEdit.addEventListener('click', openProfilePopup);
buttonPopupAddCard.addEventListener('click', openAddCardPopup);
buttonPopupChangeAvatar.addEventListener('click', openAvatarPopup);
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
cardDeletePopup.setEventListeners();
changeAvatarPopup.setEventListeners();
popupWithImage.setEventListeners();

/*
 * Определяем утилитарную функцию создания карточек
 */
function handleLikeClick(cardInstance) {
  cardInstance.setLoadingState('loading...');
  const cardId = cardInstance.getCardId();

  if (cardInstance.checkIsLiked()) {
    cardService
      .setLikeInActive(cardId)
      .then(({ likes }) => {
        cardInstance.setLikeInActive(likes?.length);
      })
      .catch((e) => {
        cardInstance.setLoadingState('error');
        console.error(e?.reason || e?.message);
      });
  } else {
    cardService
      .setLikeActive(cardId)
      .then(({ likes }) => {
        cardInstance.setLikeActive(likes?.length);
      })
      .catch((e) => {
        cardInstance.setLoadingState('error');
        console.error(e?.reason || e?.message);
      });
  }
}

function handleDeleteClick(cardInstance) {
  cardDeletePopup.changeSubmitButtonText('Да');
  cardDeletePopup.open(cardInstance);
}

function createCard(cardData) {
  const cardInstance = new Card(cardData, '#card-template', {
    handleImageClick: popupWithImage.open,
    handleLikeClick: () => handleLikeClick(cardInstance),
    handleDeleteClick: () => handleDeleteClick(cardInstance),
  });

  return cardInstance.generateCard();
}

/*
 * Запрашиваем карточки и данные пользователя
 */
Promise.all([userService.getCurrentUser(), cardService.getAllCards()])
  .then(([userInfoAnswer, cardsAnswer]) => {
    userInfo.setUserInfo(userInfoAnswer);
    cardsSection.renderItems(cardsAnswer);
  })
  .catch((e) => console.error(e?.reason || e?.message));

/*
 * Активируем валидацию
 */
validationFormProfile.enableValidation();
validationFormCard.enableValidation();
validationFormAvatar.enableValidation();
