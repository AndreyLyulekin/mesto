export default function togglePopup(currentPopup) {
    event.stopPropagation()
    currentPopup.classList.toggle('popup_opened');

    if (!!document.querySelector('.popup_opened')) {
        document.addEventListener('keydown', closePopupByKeydownEsc)
    } else {
        document.removeEventListener('keydown', closePopupByKeydownEsc)
    }
}


function closePopupByKeydownEsc(evt) {

    if (evt.key === "Escape") {
        togglePopup(document.querySelector('.popup_opened'))
    }
}