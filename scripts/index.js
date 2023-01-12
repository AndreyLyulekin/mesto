import {allPopups, buttonProfileEdit, buttonPopupAddCard, cardTitleInput, cardLinkInput,
cardsContainer, card, formExitBtnProfile, formExitBtnCard, formExitBtnImg,
newName, newJob, nameInput, popupFormProfile, popupFormCard, popupCard,
popupImg, popupSubtitle, popupProfile, imagePopup, jobInput, initialCards} from './consts.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import togglePopup from './utils.js'

const formProfile = document.querySelector('.popup_profile').querySelector('.popup__form');
const formCard = document.querySelector('.popup_card').querySelector('.popup__form');

const validationSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn-inactive',
    inputErrorClass: 'input_red-error',
    errorClass: 'popup__btn-inactive',
}

const validationFormProfile = new FormValidator(formProfile, validationSettings)
const validationFormCard = new FormValidator(formCard, validationSettings)

allPopups.forEach((item) => item.addEventListener('mousedown', (evt) => {
    const popupOpened = document.querySelector('.popup_opened')
    if (evt.target === popupOpened) {
        togglePopup(popupOpened)
    }
}));

//закрытие попапа редактирования профайла
formExitBtnProfile.addEventListener('click', () => togglePopup(popupProfile));
//закрытие попапа просмотра карточки
formExitBtnImg.addEventListener('click', () => togglePopup(popupImg));
//попап добавления карточки
formExitBtnCard.addEventListener('click', () => togglePopup(popupCard));
buttonPopupAddCard.addEventListener('click', () => togglePopup(popupCard));

// редактирование профиля

function openPopupEditProfile() {
    togglePopup(popupProfile)
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    newName.textContent = nameInput.value;
    newJob.textContent = jobInput.value;
    togglePopup(popupProfile)
}

popupFormProfile.addEventListener('submit', handleProfileFormSubmit);
buttonProfileEdit.addEventListener('click', openPopupEditProfile);

// Добавление карточек

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    createCard(cardLinkInput.value, cardTitleInput.value)
    evt.target.reset();
    togglePopup(popupCard)
    validationFormProfile.disableSubmitButton(evt.submitter)
    validationFormCard.disableSubmitButton(evt.submitter)
}

popupFormCard.addEventListener('submit', handleCardFormSubmit);


function createCard(link, name) {
    const cardInctance = new Card({link, name}, card)
    cardsContainer.prepend(cardInctance.generateCard())
}

function addInitialCards() {
    initialCards.forEach((item) => {
        createCard(item.link, item.name)
    })
}

// просмотр карточки

export function setPopupCardImgOpened(evt) {
    togglePopup(popupImg)
    imagePopup.src = evt.target.src;
    imagePopup.alt = evt.currentTarget.nextElementSibling.innerText;
    popupSubtitle.textContent = evt.currentTarget.nextElementSibling.innerText;
}


addInitialCards()
validationFormProfile.enableValidation()
validationFormCard.enableValidation()