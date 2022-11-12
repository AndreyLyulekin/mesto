let editForm = document.querySelector('.profile__edit-btn');
let popupProfile = document.querySelector('.popup_profile');
let formExitBtnProfile = document.querySelector('.popup__exit-profile');
let formExitBtnCard = document.querySelector('.popup__exit-card');
let formExitBtnImg = document.querySelector('.popup__exit-img');
let newName = document.querySelector('.profile__name');
let newJob = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let popupFormProfile = document.querySelector('.popup__container-profile');
let popupFormCard = document.querySelector('.popup__container-card');
let popupAddCardBtn = document.querySelector('.profile__add-btn');
let popupCard = document.querySelector('.popup_card');
let cardTitleInput = document.querySelector('.popup__input_card_title');
let cardLinkInput = document.querySelector('.popup__input_card_link');


const initialCards = [
  { name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'  },
  { name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'  },
  { name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'  },
  { name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'  },
  { name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'  },
  { name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'  }
];
// открытие/закрытие попапов

function openPopupEditProfile() {
    popupProfile.classList.add ('popup_opened');
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;
    }

editForm.addEventListener('click', openPopupEditProfile);

function openPopupAddCard() {
    popupCard.classList.add ('popup_opened');
    }

popupAddCardBtn.addEventListener('click', openPopupAddCard);


function formSubmitHandler (evt) {
    evt.preventDefault();

    newName.textContent = nameInput.value;
    newJob.textContent = jobInput.value;
    
    closePopup();
}

popupFormProfile.addEventListener('submit', formSubmitHandler);

function closePopup() {
    popupCard.classList.remove ('popup_opened');
    popupProfile.classList.remove ('popup_opened');
    popupImg.classList.remove ('popup_opened');
}

formExitBtnProfile.addEventListener('click', closePopup);
formExitBtnCard.addEventListener('click', closePopup);
formExitBtnImg.addEventListener('click', closePopup);

// Добавление карточек

function formSubmitHandlerCard (evt) {
    evt.preventDefault();
    initialCards.unshift({name: cardTitleInput.value, link: cardLinkInput.value})
    closePopup();
    addOneCard (cardLinkInput.value, cardTitleInput.value)
}

popupFormCard.addEventListener('submit', formSubmitHandlerCard);

function addOneCard (link, name) {
const card = document.querySelector('#card').content.querySelector('.element');
const elements = document.querySelector('.elements');    

const addElement = card.cloneNode(true);
    addElement.querySelector('.element__image').src = link;
    addElement.querySelector('.element__title').textContent = name;
    elements.prepend(addElement);
}

function elementCards() {

initialCards.forEach((item) => {
    addOneCard (item.link, item.name)
 })
}
elementCards()


// удаления карточки из дом

const trashCan = document.querySelectorAll('.element__trash')

function deleteCard (evt) {
const listItem = evt.currentTarget.closest('.element');
listItem.remove();
}

function listenerToDelete () {
    trashCan.forEach((del) => {
    del.addEventListener('click', deleteCard);
})}
listenerToDelete ()


// лайк

const elementLike = document.querySelectorAll('.element__like');

function likeOnOff (evt) {
    if (evt.currentTarget.style.opacity === '0.5') {
    evt.currentTarget.style.backgroundImage = 'url(./images/like-active.svg)'
    evt.currentTarget.style.opacity = '1'
    } else {
    evt.currentTarget.style.backgroundImage = 'url(./images/like.svg)'
    evt.currentTarget.style.opacity = '0.5'
    }
} 

function likeFillByTouch () {
    elementLike.forEach((likeBtn) => {
    likeBtn.addEventListener('click', likeOnOff)
})}
likeFillByTouch ()

const popupImg = document.querySelector('.popup__img')
const currentCard = document.querySelectorAll('.element__image')
const popupImage = document.querySelector('.popup__image')
const popupSubtitle = document.querySelector('.popup__subtitle')


function setPopupImgOpened(evt) {
    popupImg.classList.add ('popup_opened');
    popupImage.src = evt.currentTarget.src;
    popupSubtitle.textContent = evt.currentTarget.textContent;
}
function touchToCard () {
    currentCard.forEach((currentImage) => {
currentImage.addEventListener('click', setPopupImgOpened);
})}
touchToCard ()