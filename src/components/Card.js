import PopupWithForm from "./PopupWithForm.js";

class Card {
    constructor({name, link, counter, id}, canDelete, api, config, handleCardClick) {
        this._name = name;
        this._link = link;
        this._counter = counter;
        this._id = id;
        this._canDelete = canDelete;
        this._api = api;
        this._config = config;
        this._handleCardClick = handleCardClick;
        this._liked = false;
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
        if (this._liked) {
            this._api.removeLike(this._id)
                .then((result) => {
                    this._counter = result.likes.length;
                    this._updateCounter();
                    this._likeBtnElement.classList.remove(this._config.likeBtnActive);
                    this._liked = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this._api.addLike(this._id)
                .then((result) => {
                    this._counter = result.likes.length;
                    this._updateCounter();
                    this._likeBtnElement.classList.add(this._config.likeBtnActive);
                    this._liked = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    _updateCounter() {
        this._counterElement.textContent = this._counter;
    }

    _askRemoveCard() {
        this._questionPopup = new PopupWithForm('.popup_view_delete-question', () => {
            this._removeCard();
        });
        this._questionPopup.setEventListeners();
        this._questionPopup.open();
    }

    _closeQuestionPopup() {
        this._questionPopup.close();
    }

    _removeCard() {
        this._api.removeCard(this._id)
            .then(() => {
                this._cardElement.remove(); 
                this._cardElement = null;
                this._closeQuestionPopup();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _addEventListeners() {
        this._likeBtnElement.addEventListener('click', () => {
            this._changeLike();
        });

        this._removeBtnElement.addEventListener('click', () => {
            this._askRemoveCard();
        });

        this._cardPhotoElement.addEventListener('click', () => { 
            this._handleCardClick(this._name, this._link);
        });
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardPhotoElement = this._cardElement.querySelector(this._config.photoSelector);
        this._cardNameElement = this._cardElement.querySelector(this._config.cardNameSelector);
        this._likeBtnElement = this._cardElement.querySelector(this._config.likeBtnSelector);
        this._counterElement = this._cardElement.querySelector(this._config.counterSelector);
        this._removeBtnElement = this._cardElement.querySelector(this._config.removeBtnSelector);

        if (this._canDelete) {
            this._removeBtnElement.classList.add(this._config.removeBtnShownClass);
        }

        this._cardPhotoElement.src = this._link;
        this._cardPhotoElement.alt = this._name;
        this._cardNameElement.textContent = this._name;

        this._updateCounter();

        this._addEventListeners();

        return this._cardElement;
    }
}

export default Card;
