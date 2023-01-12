const allPopups = document.querySelectorAll('.popup');
const buttonProfileEdit = document.querySelector('.profile__edit-btn');
const buttonPopupAddCard = document.querySelector('.profile__add-btn');
const cardTitleInput = document.querySelector('.popup__input_card_title');
const cardLinkInput = document.querySelector('.popup__input_card_link');
const cardsContainer = document.querySelector('.elements');
const card = document.querySelector('#card').content.querySelector('.element');
const formExitBtnProfile = document.querySelector('.popup__exit-profile');
const formExitBtnCard = document.querySelector('.popup__exit-card');
const formExitBtnImg = document.querySelector('.popup__exit-img');
const newName = document.querySelector('.profile__name');
const newJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const popupFormProfile = document.querySelector('.popup__container-profile');
const popupFormCard = document.querySelector('.popup__container-card');
const popupCard = document.querySelector('.popup_card');
const popupImg = document.querySelector('.popup_scale-image')
const popupSubtitle = document.querySelector('.popup__subtitle')
const popupProfile = document.querySelector('.popup_profile');
const imagePopup = document.querySelector('.popup__image')
const jobInput = document.querySelector('.popup__input_type_job');

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export {allPopups, buttonProfileEdit, buttonPopupAddCard, cardTitleInput, cardLinkInput,
cardsContainer, card, formExitBtnProfile, formExitBtnCard, formExitBtnImg,
newName, newJob, nameInput, popupFormProfile, popupFormCard, popupCard,
popupImg, popupSubtitle, popupProfile, imagePopup, jobInput, initialCards}