import {Card} from './Card.js';
import {closePopup, openPopup, closePopupImage} from './utils.js';
import {FormValidator} from "./FormValidator.js";
import {openPopupImage} from './utils.js';

const cardsConfig = {
    cardTemplateSelector: '.card-template',
    cardSelector: '.elements__card',
    likeBtnActive: 'elements__btn_active',
    photoSelector: '.elements__photo',
    cardNameSelector: '.elements__name',
    likeBtnSelector: '.elements__btn',
    removeBtnSelector: '.elements__trash'
};

const validationConfig = {
    formSelector: '.popup__content',
    fieldsetSelector: '.popup__input-field',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn-disabled',
    inputInvalidClass: 'popup__input_invalid',
    errorContainerClassEnd: '-error',
    errorClass: 'popup__error_visible'
};

const formProfileElement = document.querySelector('.popup__content-profile');
const nameInput = formProfileElement.querySelector('.popup__name');
const jobInput = formProfileElement.querySelector('.popup__job');
const popupProfileCloseButton = document.querySelector('.popup__close-profile');
const popupProfileElement = document.querySelector('.popup_view_profile');

const profileButton = document.querySelector('.profile__btn');
const profileNameElement = document.querySelector('.profile__name');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements__list');

const formCardElement = document.querySelector('.popup__content-card');
const popupAddCardCloseButton = document.querySelector('.popup__close-card');
const popupAddCardElement = document.querySelector('.popup_view_add-card');
const cardNameInput = formCardElement.querySelector('.popup__card-name');
const cardLinkInput =  formCardElement.querySelector('.popup__link');

const cardAddButton = document.querySelector('.profile__btn-plus');

const popupImageClose = document.querySelector('.popup__close-image');

const profileValidation = new FormValidator(validationConfig, formProfileElement);
const addCardValidation = new FormValidator(validationConfig, formCardElement);

function openPopupProfile() {
    openPopup(popupProfileElement);
    profileValidation.resetValidation();
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

function closePopupProfile() {
    closePopup(popupProfileElement);
}

profileButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);

function handleFormProfileSubmit (evt) {
    evt.preventDefault(); 

    profileNameElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;

    closePopupProfile();
}

formProfileElement.addEventListener('submit', handleFormProfileSubmit);

function openPopupAddCard() {
    formCardElement.reset();
    addCardValidation.resetValidation();
    addCardValidation.checkButtonState();
    openPopup(popupAddCardElement);
}

function closePopupAddCard() {
    closePopup(popupAddCardElement);
}

function createCard(name, link) {
    const card = new Card(name, link, cardsConfig, openPopupImage);
    return card.createCard();
}

function renderCard(name, link) {
    const cardElement = createCard(name, link)
    cardsContainer.prepend(cardElement);
}

cardAddButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);

function handleFormCardSubmit (evt) {
    evt.preventDefault();

    renderCard(cardNameInput.value, cardLinkInput.value);

    closePopupAddCard();
} 

formCardElement.addEventListener('submit', handleFormCardSubmit); 

popupImageClose.addEventListener('click', closePopupImage);

document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => { 
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) { 
            closePopup(popup); 
        };
    }); 
});

const initialCards = [
    {
      name: 'Ростов-на-Дону',
      link: './images/Rostov-on-Don.jpg'
    },
    {
      name: 'Судак',
      link: './images/Sudak.jpg'
    },
    {
      name: 'Дубна',
      link: './images/Dubna.jpg'
    },
    {
      name: 'Зеленоград',
      link: './images/Zelenograd.jpg'
    },
    {
      name: 'Великий Устюг',
      link: './images/VU.jpg'
    },
    {
      name: 'Обнинск',
      link: './images/Obninsk.jpg'
    }
];

initialCards.forEach(function (element) {
    renderCard(element.name, element.link);
});

profileValidation.enableValidation();
addCardValidation.enableValidation();  
