// открытие/закрытие попапов

function togglePopup(currentPopup) {
    currentPopup.classList.toggle('popup_opened');
}
//закрытие попапа редактирования профайла
formExitBtnProfile.addEventListener('click', () => togglePopup(popupProfile));
//закрытие попапа просмотра карточки
formExitBtnImg.addEventListener('click', () => togglePopup(popupImg));
//попап добавления карточки
formExitBtnCard.addEventListener('click', () => togglePopup(popupCard));
buttonPopupAddCard.addEventListener('click', () => togglePopup(popupCard));

// редактирование профиля  cards

function openPopupEditProfile() {
    togglePopup(popupProfile)
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    newName.textContent = nameInput.value;
    newJob.textContent = jobInput.value;
    togglePopup(popupProfile)
}

popupFormProfile.addEventListener('submit', formSubmitHandler);
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
    cardElement.querySelector('.element__title').textContent = name;
    cardElement.querySelector('.element__trash').addEventListener('click', deleteCard)
    cardElement.querySelector('.element__like').addEventListener('click', likeOnOff)
    cardElement.querySelector('.element__image').addEventListener('click', setPopupCardImgOpened)
    cards.prepend(cardElement);
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

function likeOnOff(evt) {
    evt.target.classList.toggle('element__like_active');
}

// просмотр карточки

function setPopupCardImgOpened(evt) {
    togglePopup(popupImg)
    popupImage.src = evt.target.src;
    popupSubtitle.textContent = evt.currentTarget.nextElementSibling.innerText;
}

addInitialCards()