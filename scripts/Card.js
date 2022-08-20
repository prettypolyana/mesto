import {openPopupImage} from './utils.js';

class Card {
    constructor(name, link, config) {
        this._name = name;
        this._link = link;
        this._config = config;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._config.cardTemplateSelector)
            .content
            .querySelector(this._config.cardSelector)
            .cloneNode(true);
        return cardElement;
    }

    _changeLike() {
        this._likeBtnElement.classList.toggle(this._config.likeBtnActive);
    }

    _removeCard() {
        this._cardElement.remove();
    }

    _addEventListeners() {
        this._likeBtnElement.addEventListener('click', () => {
            this._changeLike();
        });

        this._removeBtnElement.addEventListener('click', () => {
            this._removeCard();
        });

        this._cardPhotoElement.addEventListener('click', () => {
            openPopupImage(this._name, this._link);
        })
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardPhotoElement = this._cardElement.querySelector(this._config.photoSelector);
        this._cardNameElement = this._cardElement.querySelector(this._config.cardNameSelector);
        this._likeBtnElement = this._cardElement.querySelector(this._config.likeBtnSelector);
        this._removeBtnElement = this._cardElement.querySelector(this._config.removeBtnSelector);

        this._cardPhotoElement.src = this._link;
        this._cardPhotoElement.alt = this._name;
        this._cardNameElement.textContent = this._name;

        this._addEventListeners();

        return this._cardElement;
    }
}

export {Card};
