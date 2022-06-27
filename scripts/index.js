let formElement = document.querySelector('.popup__content');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');
let popupCloseButton = document.querySelector('.popup__close');
let popupElement = document.querySelector('.popup');

let profileButton = document.querySelector('.profile__btn');
let profileNameElement = document.querySelector('.profile__name');
let profileSubtitleElement = document.querySelector('.profile__subtitle');


function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

profileButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileNameElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 
