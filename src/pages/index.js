import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {cardsConfig, validationConfig} from '../utils/utils';

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52",
    headers: {
        authorization: "18fd22a9-bd6c-4b30-bd49-59a46708c9f3",
        "Content-Type": "application/json",
    },
});

const formProfileElement = document.querySelector('.popup__content-profile');
const nameInput = formProfileElement.querySelector('.popup__name');
const jobInput = formProfileElement.querySelector('.popup__job');

const profileButton = document.querySelector('.profile__btn');
const profileNameElement = document.querySelector('.profile__name');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const formCardElement = document.querySelector('.popup__content-card');

const cardAddButton = document.querySelector('.profile__btn-plus');

const profileValidation = new FormValidator(validationConfig, formProfileElement);
const cardValidation = new FormValidator(validationConfig, formCardElement);

const userInfo = new UserInfo({
    name: '.profile__name',
    job: '.profile__subtitle',
});

const imagePopup = new PopupWithImage('.popup_view_show-image');
const profilePopup = new PopupWithForm('.popup_view_profile', handleFormProfileSubmit);
const cardPopup = new PopupWithForm('.popup_view_add-card', handleFormCardSubmit);

const cardsSection = new Section(
    (item) => {
        const cardElement = createCard({name: item.name, link: item.link});
        cardsSection.addItem(cardElement);
    },
    '.elements__list'
);

function openPopupProfile() {
    profileValidation.resetValidation();
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
    profilePopup.open();
}

profileButton.addEventListener('click', openPopupProfile);

function handleFormProfileSubmit (values) {
    userInfo.setUserInfo(values.name, values.job);
    profilePopup.close();
}

function openPopupAddCard() {
    formCardElement.reset();
    cardValidation.resetValidation();
    cardValidation.checkButtonState();
    cardPopup.open();
}

function createCard(item) {
    const card = new Card(item, cardsConfig, (name, link) => {imagePopup.open(name, link)});
    return card.createCard();
}

function renderCard(item) {
    const cardElement = createCard(item);
    cardsSection.addItem(cardElement);
}

cardAddButton.addEventListener('click', openPopupAddCard);

function handleFormCardSubmit(values) {
    renderCard({name: values.card_name, link: values.card_link});
    cardPopup.close();
}

api.getInitialCards()
    .then((result) => {
        cardsSection.renderItems(result);
    })
     .catch((err) => {
        console.log(err);
    });



imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();

profileValidation.enableValidation();
cardValidation.enableValidation();  
