class Card {
    constructor({name, link, likes, id, ownerId}, userId, api, config, handleCardClick, handleLikeClick, handleRemoveClick) {
        this._name = name;
        this._link = link;
        this._id = id;
        this._canDelete = ownerId === userId;
        this._userId = userId;
        this._api = api;
        this._config = config;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveClick = handleRemoveClick;
        this._setLikes(likes);
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._config.cardTemplateSelector)
            .content
            .querySelector(this._config.cardSelector)
            .cloneNode(true);
        return cardElement;
    }

    _setLikes(likes) {
        this._likes = likes;
        this._liked = false;
        this._likes.forEach((like) => {
            if (like._id === this._userId) {
                this._liked = true;
            }
        });
    }

    updateLikes(likes) {
        this._setLikes(likes);
        this._updateLikeState();
    }

    _updateLikeState() {
        if (this._liked) {
            this._likeBtnElement.classList.add(this._config.likeBtnActive);
        } else {
            this._likeBtnElement.classList.remove(this._config.likeBtnActive);
        }
        this._counterElement.textContent = this._likes.length;
    }

    getId() {
        return this._id;
    }

    isLiked() {
        return this._liked;
    }

    removeCard() {
        this._api.removeCard(this._id)
            .then(() => {
                this._cardElement.remove(); 
                this._cardElement = null;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _addEventListeners() {
        this._likeBtnElement.addEventListener('click', () => {
            this._handleLikeClick(this);
        });

        this._removeBtnElement.addEventListener('click', () => {
            this._handleRemoveClick(this);
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

        this._updateLikeState();

        this._addEventListeners();

        return this._cardElement;
    }
}

export default Card;
