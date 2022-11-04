let editForm = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let formExit = document.querySelector('.popup__exit');
let newName = document.querySelector('.profile__name');
let newJob = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let popupForm = document.querySelector('.popup__container');

function openPopup() {
    popup.classList.add ('popup_opened');
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;
    }

function closePopup() {
    popup.classList.remove ('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    newName.textContent = nameInput.value;
    newJob.textContent = jobInput.value;
    
    closePopup();
}

editForm.addEventListener('click', openPopup);
formExit.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler); 