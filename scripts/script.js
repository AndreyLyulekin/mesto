const allPopups = document.querySelectorAll('.popup');


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
    createCard(cardLinkInput.value, cardTitleInput.value)
    evt.target.reset();
    togglePopup(popupCard)
    disableSubmitButton(evt)
}

popupFormCard.addEventListener('submit', handleCardFormSubmit);


function createCard(link, name) {
    addCard(prepareCard(link, name))
}

function prepareCard(link, name) {
    const cardElement = card.cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image')
    elementImage.src = link;
    elementImage.alt = name;
    cardElement.querySelector('.element__title').textContent = name;
    cardElement.querySelector('.element__trash').addEventListener('click', deleteCard)
    cardElement.querySelector('.element__like').addEventListener('click', toggleLike)
    elementImage.addEventListener('click', setPopupCardImgOpened)
    return cardElement
}


function addCard(cardElement) {
    cardsContainer.prepend(cardElement);
}

function addInitialCards() {
    initialCards.forEach((item) => {
        createCard(item.link, item.name)
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
    imagePopup.src = evt.target.src;
    imagePopup.alt = evt.currentTarget.nextElementSibling.innerText;
    popupSubtitle.textContent = evt.currentTarget.nextElementSibling.innerText;
}

addInitialCards()