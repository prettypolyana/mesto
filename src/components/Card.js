class Card {
    constructor(name, link, config, handleCardClick) {
        this._name = name;
        this._link = link;
        this._config = config;
        this._handleCardClick = handleCardClick;
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
        this._cardElement = null;
    }

    _addEventListeners() {
        this._likeBtnElement.addEventListener('click', () => {
            this._changeLike();
        });

        this._removeBtnElement.addEventListener('click', () => {
            this._removeCard();
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
        this._removeBtnElement = this._cardElement.querySelector(this._config.removeBtnSelector);

        this._cardPhotoElement.src = this._link;
        this._cardPhotoElement.alt = this._name;
        this._cardNameElement.textContent = this._name;

        this._addEventListeners();

        return this._cardElement;
    }
}

export {Card};
