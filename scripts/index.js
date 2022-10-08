import {Card} from './Card.js';
import {FormValidator} from "./FormValidator.js";
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';

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

const profileButton = document.querySelector('.profile__btn');
const profileNameElement = document.querySelector('.profile__name');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements__list');

const formCardElement = document.querySelector('.popup__content-card');
const cardNameInput = formCardElement.querySelector('.popup__card-name');
const cardLinkInput =  formCardElement.querySelector('.popup__link');

const cardAddButton = document.querySelector('.profile__btn-plus');

const profileValidation = new FormValidator(validationConfig, formProfileElement);
const addCardValidation = new FormValidator(validationConfig, formCardElement);

const userInfo = new UserInfo({
    name: '.profile__name',
    job: '.profile__subtitle',
});

const imagePopup = new PopupWithImage('.popup_view_show-image');
const profilePopup = new PopupWithForm('.popup_view_profile', handleFormProfileSubmit);
const addCardPopup = new PopupWithForm('.popup_view_add-card', handleFormCardSubmit);

function openPopupProfile() {
    profileValidation.resetValidation();
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
    profilePopup.open();
}

profileButton.addEventListener('click', openPopupProfile);

function handleFormProfileSubmit (evt) {
    evt.preventDefault();

    const values = profilePopup._getInputValues();

    userInfo.setUserInfo(values.name, values.job);

    profilePopup.close();
}

function openPopupAddCard() {
    formCardElement.reset();
    addCardValidation.resetValidation();
    addCardValidation.checkButtonState();
    addCardPopup.open();
}

function createCard(name, link) {
    const card = new Card(name, link, cardsConfig, (name, link) => {imagePopup.open(name, link)});
    return card.createCard();
}

function renderCard(name, link) {
    const cardElement = createCard(name, link)
    cardsContainer.prepend(cardElement);
}

cardAddButton.addEventListener('click', openPopupAddCard);

function handleFormCardSubmit (evt) {
    evt.preventDefault();

    renderCard(cardNameInput.value, cardLinkInput.value);

    addCardPopup.close();
} 

formCardElement.addEventListener('submit', handleFormCardSubmit); 

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

const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item.name, item.link)
        cardsSection.addItem(cardElement);
}}, '.elements__list');

cardsSection.renderItems();

imagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

profileValidation.enableValidation();
addCardValidation.enableValidation();  
