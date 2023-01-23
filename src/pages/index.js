import "./index.css";
import {
  buttonProfileEdit,
  buttonPopupAddCard,
  formCard,
  formProfile,
  initialCards,
  validationSettings,
} from "../utils/consts.js";
import { FormValidator } from "../components/FormValidator";
import { UserInfo } from "../components/UserInfo";
import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage";
import { Section } from "../components/Section";
import { Card } from "../components/Card";

const validationFormProfile = new FormValidator(
  formProfile,
  validationSettings
);
const validationFormCard = new FormValidator(formCard, validationSettings);
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__subtitle",
});

const newSectionElement = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const cardElement = createCard(link, name);
      newSectionElement.addItem(cardElement);
    },
  },
  ".elements"
);

const popupProfileInstance = new PopupWithForm(".popup_profile", (values) => {
  const { userName, userJob } = values;
  userInfo.setUserInfo({ newName: userName, newJob: userJob });
});
const popupWithImage = new PopupWithImage(".popup_scale-image");
const popupCardInstance = new PopupWithForm(".popup_card", (values) => {
  const { cardName, urlCard } = values;
  newSectionElement.addItem(createCard(urlCard, cardName));
});

const editProfileButtonHandler = () => {
  popupProfileInstance.setInputValue(userInfo.getUserInfo());
  validationFormProfile.disableSubmitButton();
  popupProfileInstance.open();
};

const addCardButtonHandler = () => {
  validationFormCard.disableSubmitButton();
  popupCardInstance.open();
};

buttonProfileEdit.addEventListener("click", editProfileButtonHandler);
buttonPopupAddCard.addEventListener("click", addCardButtonHandler);
popupProfileInstance.setEventListeners();
popupCardInstance.setEventListeners();
popupWithImage.setEventListeners();

function createCard(link, name) {
  return new Card(
    { link, name },
    "#card-template",
    popupWithImage.open
  ).generateCard();
}

newSectionElement.renderItems();

validationFormProfile.enableValidation();
validationFormCard.enableValidation();
