import {Card} from './Card.js';
import {closePopup, openPopup, closePopupImage, popupShowImageElement} from './utils.js';
import {FormValidator} from "./FormValidator.js";

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
const popupAddCardSubmitButton = formCardElement.querySelector('.popup__btn');

const cardAddButton = document.querySelector('.profile__btn-plus');

const popupImageClose = document.querySelector('.popup__close-image');

function openPopupProfile() {
    openPopup(popupProfileElement);
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

function closePopupProfile() {
    closePopup(popupProfileElement);
}

function handlePopupProfileClick(event) {
    if (event.target == popupProfileElement) {
        closePopupProfile();
    }
}

profileButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupProfileElement.addEventListener('click', handlePopupProfileClick);

function handleFormProfileSubmit (evt) {
    evt.preventDefault(); 

    profileNameElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;

    closePopupProfile();
}

formProfileElement.addEventListener('submit', handleFormProfileSubmit); 

function disablePopupAddCardSubmitButton() {
    popupAddCardSubmitButton.classList.add('popup__btn-disabled');
    popupAddCardSubmitButton.setAttribute('disabled', 'disabled');
}

function openPopupAddCard() {
    formCardElement.reset();
    disablePopupAddCardSubmitButton();
    openPopup(popupAddCardElement);
}

function closePopupAddCard() {
    closePopup(popupAddCardElement);
}

function renderCard(name, link) {
    const card = new Card(name, link, cardsConfig);
    const cardElement = card.createCard();
    cardsContainer.prepend(cardElement);
}

function handlePopupAddCardClick(event) {
    if (event.target == popupAddCardElement) {
        closePopupAddCard();
    }
}

cardAddButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
popupAddCardElement.addEventListener('click', handlePopupAddCardClick);

function handleFormCardSubmit (evt) {
    evt.preventDefault();

    renderCard(cardNameInput.value, cardLinkInput.value);

    closePopupAddCard();
} 

formCardElement.addEventListener('submit', handleFormCardSubmit); 

function handlePopupImageClick(event) {
    if (event.target == popupShowImageElement) {
        closePopupImage();
    }
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(function(form) {
        const formValidator = new FormValidator(config, form);
        formValidator.enableValidation();
    });
}

popupImageClose.addEventListener('click', closePopupImage);
popupShowImageElement.addEventListener('click', handlePopupImageClick);

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

enableValidation(validationConfig);
