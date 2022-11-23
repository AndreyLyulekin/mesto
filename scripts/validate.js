let isInputsGood = false

//проверка на валидность инпутов

function checkValidity(currentInput, submitCurrentButton, settings) {
    if (currentInput.validity.valid) {
        // убрать красную обводку
        hideErrors(currentInput, submitCurrentButton, settings)

    } else {
        // добавить красную обводку
        showErrors(currentInput, submitCurrentButton, settings)
    }
}

//функция описания инпутов и обьявления пользователю ошибки
function showErrors(currentInput, submitCurrentButton, settings) {

    currentInput.classList.add(settings.inputErrorClass)
    currentInput.nextElementSibling.textContent = currentInput.validationMessage
    toggleBtnStateActive(submitCurrentButton, settings)
}

function hideErrors(currentInput, submitCurrentButton, settings) {

    currentInput.classList.remove(settings.inputErrorClass)
    currentInput.nextElementSibling.textContent = ''
    toggleBtnStateActive(submitCurrentButton, settings)
}

// тогл кнопки сабмит
function toggleBtnStateActive(submitCurrentButton, settings) {
    if (!isInputsGood) {
        submitCurrentButton.classList.add(settings.errorClass)
        submitCurrentButton.disabled = true
    } else {
        submitCurrentButton.classList.remove(settings.errorClass)
        submitCurrentButton.disabled = false
    }
}

function enableValidation(settings) {
    const formElements = document.querySelectorAll(settings.formSelector)

    Array.from(formElements).forEach((currentForm) => {
        const inputs = currentForm.querySelectorAll(settings.inputSelector)
        const submitCurrentButton = currentForm.querySelector(settings.submitButtonSelector)
        Array.from(inputs).forEach((currentInput) => {
            currentInput.addEventListener('input', () => {
                isInputsGood = Array.from(inputs).every((input) => input.validity.valid)
                checkValidity(currentInput, submitCurrentButton, settings)
            })
        })
    })

}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'input_red-error',
    errorClass: 'popup__btn-inactive',
});