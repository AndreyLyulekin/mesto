
//Открыть/закртыть форму редактирования

let editForm = document.querySelector('.profile__edit-btn');
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
let nameInput = document.querySelector('.overlay__input_type_name').value;
let jobInput = document.querySelector('.overlay__input_type_job').value;
let newName = document.getElementById('name');
newName.textContent = nameInput;
let newJob = document.getElementById('job');
newJob.textContent = jobInput;
overlayOpen.classList.remove('overlay__on');
}

formElement.addEventListener('submit', formSubmitHandler); 