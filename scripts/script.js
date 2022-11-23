const popupMissClick = document.querySelectorAll('.popup');


popupMissClick.forEach((item) => item.addEventListener('mousedown', (evt) => {
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

function togglePopup(currentPopup) {
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
    addOneCard(cardLinkInput.value, cardTitleInput.value)
    cardTitleInput.value = ''
    cardLinkInput.value = ''
    togglePopup(popupCard)
}

popupFormCard.addEventListener('submit', handleCardFormSubmit);

function addOneCard(link, name) {
    const cardElement = card.cloneNode(true);
    cardElement.querySelector('.element__image').src = link;
    cardElement.querySelector('.element__image').alt = name;
    cardElement.querySelector('.element__title').textContent = name;
    cardElement.querySelector('.element__trash').addEventListener('click', deleteCard)
    cardElement.querySelector('.element__like').addEventListener('click', toggleLike)
    cardElement.querySelector('.element__image').addEventListener('click', setPopupCardImgOpened)
    cardsContainer.prepend(cardElement);
}

function addInitialCards() {
    initialCards.forEach((item) => {
        addOneCard(item.link, item.name)
    })
}

// удаления карточки из дом

function deleteCard(evt) {
    const listItem = evt.target.closest('.element');
    event.stopPropagation()
    listItem.remove();
}

// лайк

function toggleLike(evt) {
    evt.target.classList.toggle('element__like_active');
}

// просмотр карточки

function setPopupCardImgOpened(evt) {
    togglePopup(popupImg)
    popupImage.src = evt.target.src;
    popupImage.alt = evt.currentTarget.nextElementSibling.innerText;
    popupSubtitle.textContent = evt.currentTarget.nextElementSibling.innerText;
}

addInitialCards()