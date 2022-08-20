const popupImage = document.querySelector('.popup__image');
const popupDescElement = document.querySelector('.popup__desc');
const popupShowImageElement = document.querySelector('.popup_view_show-image');

function handleWindowKeydown(event) {
    const key = event.key;
    if (key === 'Escape') {
        closeOpenedPopup();
    };
}

function closeOpenedPopup() {
    const popupOpenedElement = document.querySelector('.popup_opened');
    closePopup(popupOpenedElement);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleWindowKeydown);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleWindowKeydown);
}

function openPopupImage(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupDescElement.textContent = name;
    openPopup(popupShowImageElement);
}

function closePopupImage() {
    closePopup(popupShowImageElement);
}


export {closePopup, openPopup, openPopupImage, closePopupImage, popupShowImageElement};
