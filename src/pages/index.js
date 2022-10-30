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

const formAvatarElement = document.querySelector('.popup__content-avatar');
const avatarLinkInput = formAvatarElement.querySelector('.popup__avatar-link');

const profileButton = document.querySelector('.profile__btn');
const profileNameElement = document.querySelector('.profile__name');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const avatarButton = document.querySelector('.profile__overlay');
const avatarElement = document.querySelector('.profile__avatar');

const formCardElement = document.querySelector('.popup__content-card');

const cardAddButton = document.querySelector('.profile__btn-plus');

const profileValidation = new FormValidator(validationConfig, formProfileElement);
const cardValidation = new FormValidator(validationConfig, formCardElement);
const avatarValidation = new FormValidator(validationConfig, formAvatarElement);

const userInfo = new UserInfo({
    name: '.profile__name',
    job: '.profile__subtitle',
    avatar: '.profile__avatar'
});

const imagePopup = new PopupWithImage('.popup_view_show-image');
const profilePopup = new PopupWithForm('.popup_view_profile', handleFormProfileSubmit);
const cardPopup = new PopupWithForm('.popup_view_add-card', handleFormCardSubmit);
const avatarPopup = new PopupWithForm('.popup_view_edit-avatar', handleFormAvatarSubmit);
const questionPopup = new PopupWithForm('.popup_view_delete-question', () => {});

const cards = [];

const cardsSection = new Section(
    cards,
    (item) => {
        const cardElement = createCard({
            name: item.name,
            link: item.link,
            likes: item.likes,
            id: item._id
        }, false);
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
    api.setUserInfo(values.name, values.job)
        .then((result) => {
            userInfo.setUserInfo(result.name, result.about);
            profilePopup.close();
        })
        .catch((err) => {
            console.log(err);
        });
}

function openAvatarPopup() {
    avatarValidation.resetValidation();
    avatarLinkInput.value = avatarElement.src;
    avatarPopup.open();
}

avatarButton.addEventListener('click', openAvatarPopup);

function handleFormAvatarSubmit (values) {
    api.setAvatar(values.avatar_link)
        .then((result) => {
            userInfo.setAvatar(result.avatar);
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(err);
        });
}

function openPopupAddCard() {
    formCardElement.reset();
    cardValidation.resetValidation();
    cardValidation.checkButtonState();
    cardPopup.open();
}

function createCard(item, canDelete) {
    const card = new Card(item, canDelete, userInfo.id, api, cardsConfig, (name, link) => {imagePopup.open(name, link)}, questionPopup);
    return card.createCard();
}

function renderCard(item, canDelete) {
    const cardElement = createCard(item, canDelete);
    cardsSection.addItem(cardElement);
}

cardAddButton.addEventListener('click', openPopupAddCard);

function handleFormCardSubmit(values) {
    api.addCard(values.card_name, values.card_link)
        .then((result) => {
            renderCard({
                name: result.name,
                link: result.link,
                likes: result.likes,
                id: result._id
            }, true);
            cardPopup.close();
        })
        .catch((err) => {
            console.log(err);
        });
}

api.getUserInfo()
    .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
        userInfo.setId(result._id);
        userInfo.setAvatar(result.avatar);
    })
     .catch((err) => {
        console.log(err);
    });

api.getInitialCards()
    .then((result) => {
        result.reverse().forEach((card) => {
            cards.push(card);
        });
        cardsSection.renderItems();
    })
     .catch((err) => {
        console.log(err);
    });

imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();
avatarPopup.setEventListeners();
questionPopup.setEventListeners();

profileValidation.enableValidation();
cardValidation.enableValidation();  
avatarValidation.enableValidation();
