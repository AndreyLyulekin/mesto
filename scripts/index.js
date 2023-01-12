import {allPopups, buttonProfileEdit, buttonPopupAddCard, cardTitleInput, cardLinkInput,
cardsContainer, card, formExitBtnProfile, formExitBtnCard, formExitBtnImg,
newName, newJob, nameInput, popupFormProfile, popupFormCard, popupCard,
popupImg, popupSubtitle, popupProfile, imagePopup, jobInput, initialCards} from './consts.js'
import Card from './Card.js'
import FormValidator from './validate.js'

const validation = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'input_red-error',
    errorClass: 'popup__btn-inactive',
})

allPopups.forEach((item) => item.addEventListener('mousedown', (evt) => {
    if (evt.target === document.querySelector('.popup_opened')) {
        togglePopup(document.querySelector('.popup_opened'))
    }
}));


function closePopupByKeydownEsc(evt) {

    if (evt.key === "Escape") {
        togglePopup(document.querySelector('.popup_opened'))
    }
}

// открытие/закрытие попапов

export function togglePopup(currentPopup) {
    event.stopPropagation()
    currentPopup.classList.toggle('popup_opened');

    if (!!document.querySelector('.popup_opened')) {
        document.addEventListener('keydown', closePopupByKeydownEsc)
    } else {
        document.removeEventListener('keydown', closePopupByKeydownEsc)
    }
}

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
    validation.disableSubmitButton(evt)
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



//

validation.enableValidation()