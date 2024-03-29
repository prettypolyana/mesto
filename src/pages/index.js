import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {cardsConfig, validationConfig} from '../utils/constants.js';

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52",
    headers: {
        authorization: "18fd22a9-bd6c-4b30-bd49-59a46708c9f3",
        "Content-Type": "application/json",
    },
});

const formProfileElement = document.forms["edit-profile"];
const nameInput = formProfileElement.querySelector('.popup__name');
const jobInput = formProfileElement.querySelector('.popup__job');

const formAvatarElement = document.forms["edit-avatar"];
const avatarLinkInput = formAvatarElement.querySelector('.popup__avatar-link');

const profileButton = document.querySelector('.profile__btn');
const avatarButton = document.querySelector('.profile__overlay');

const cardAddButton = document.querySelector('.profile__btn-plus');

const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

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

function handleLikeClick(card) {
    if (card.isLiked()) {
        api.removeLike(card.getId())
            .then((result) => {card.updateLikes(result.likes)})
            .catch((err) => {
                console.log(err);
            });
    } else {
        api.addLike(card.getId())
            .then((result) => {card.updateLikes(result.likes)})
            .catch((err) => {
                console.log(err);
            });
    }
}

function handleRemoveCard(card) {
    questionPopup.setSubmitHandler(() => {
        card.removeCard();
        questionPopup.close();
    });
    questionPopup.open();
}

const cardsSection = new Section(
    (item) => {
        const cardElement = createCard({
            name: item.name,
            link: item.link,
            likes: item.likes,
            id: item._id,
            ownerId: item.owner._id
        });
        cardsSection.addItem(cardElement);
    },
    '.elements__list'
);

function openPopupProfile() {
    const {name, job} = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    formValidators['edit-profile'].resetValidation();
    profilePopup.open();
}

profileButton.addEventListener('click', openPopupProfile);

function handleFormProfileSubmit (values) {
    profilePopup.renderLoading(true);
    api.setUserInfo(values.name, values.job)
        .then((result) => {
            userInfo.setUserInfo(result);
            profilePopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            profilePopup.renderLoading(false);
        });
}

function openAvatarPopup() {
    const {avatar} = userInfo.getUserInfo();
    avatarLinkInput.value = avatar;
    formValidators['edit-avatar'].resetValidation();
    avatarPopup.open();
}

avatarButton.addEventListener('click', openAvatarPopup);

function handleFormAvatarSubmit (values) {
    avatarPopup.renderLoading(true);
    api.setAvatar(values.avatar_link)
        .then((result) => {
            userInfo.setUserInfo(result);
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarPopup.renderLoading(false);
        });
}

function openPopupAddCard() {
    formValidators['add-card'].resetValidation();
    cardPopup.open();
}

function createCard(item) {
    const card = new Card(item, userInfo.id, api, cardsConfig, (name, link) => {imagePopup.open(name, link)}, handleLikeClick, handleRemoveCard);
    return card.createCard();
}

function renderCard(item) {
    const cardElement = createCard(item);
    cardsSection.addItem(cardElement);
}

cardAddButton.addEventListener('click', openPopupAddCard);

function handleFormCardSubmit(values) {
    cardPopup.renderLoading(true);
    api.addCard(values.card_name, values.card_link)
        .then((result) => {
            renderCard({
                name: result.name,
                link: result.link,
                likes: result.likes,
                id: result._id,
                ownerId: result.owner._id
            });
            cardPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            cardPopup.renderLoading(false);
        });
}

function handleUserData(userData) {
    userInfo.setUserInfo(userData);
}

function handleCardsData(cardsData) {
    cardsSection.renderItems(cardsData.reverse());
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        handleUserData(userData);
        handleCardsData(cardsData);
    })
     .catch((err) => {
        console.log(err);
    });

imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();
avatarPopup.setEventListeners();
questionPopup.setEventListeners();

enableValidation(validationConfig);
