
//Открыть/закртыть форму редактирования

let editForm = document.querySelector('.profile-info__edit-button');
let overlayOpen = document.querySelector('.overlay');

editForm.addEventListener('click', function () {
  overlayOpen.classList.toggle('overlay__on');
});

let overlayCLose = document.querySelector('.overlay__close-button');

overlayCLose.addEventListener('click', function () {
  overlayOpen.classList.remove('overlay__on');
});

//Изменить через форму, имя и описание профиля + закрытие поп-ап через сохранить

let formElement = document.querySelector('.overlay__form');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
let nameInput = document.querySelector('.overlay_form__nameInput').value;
let jobInput = document.querySelector('.overlay_form__jobInput').value;
let newName = document.getElementById('name');
newName.textContent = nameInput;
let newJob = document.getElementById('job');
newJob.textContent = jobInput;
overlayOpen.classList.remove('overlay__on');
}

formElement.addEventListener('submit', formSubmitHandler); 