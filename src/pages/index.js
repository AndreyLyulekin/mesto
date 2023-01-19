import "./index.css";
import {
  buttonProfileEdit,
  buttonPopupAddCard,
  cardsContainer,
  card,
  formCard,
  formProfile,
  initialCards,
  validationSettings,
} from "../utils/consts.js";
import {
  Card,
  Section,
  UserInfo,
  PopupWithImage,
  PopupWithForm,
  FormValidator,
} from "../components";

const validationFormProfile = new FormValidator(
  formProfile,
  validationSettings
);
const validationFormCard = new FormValidator(formCard, validationSettings);

const popupProfileInstance = new PopupWithForm(".popup_profile", (values) => {
  const { userName, userJob } = values;
  const userInfo = new UserInfo({
    userNameSelector: ".profile__name",
    userInfoSelector: ".profile__subtitle",
  });
  userInfo.setUserInfo({ newName: userName, newInfo: userJob });
});
popupProfileInstance.setEventListeners(buttonProfileEdit);

const popupCardInstance = new PopupWithForm(".popup_card", (values) => {
  const { cardName, urlCard } = values;
  createCard(urlCard, cardName);
});
popupCardInstance.setEventListeners(buttonPopupAddCard);

function createCard(link, name) {
  const cardInstance = new Card(
    { link, name },
    card,
    new PopupWithImage(".popup_scale-image").open
  );
  cardsContainer.prepend(cardInstance.generateCard());
}

const newSectionElement = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const cardInstance = new Card(
        { name, link },
        card,
        new PopupWithImage(".popup_scale-image").open
      );
      const cardElement = cardInstance.generateCard();
      newSectionElement.addItem(cardElement);
    },
  },
  ".elements"
);

newSectionElement.renderItems();

validationFormProfile.enableValidation();
validationFormCard.enableValidation();
