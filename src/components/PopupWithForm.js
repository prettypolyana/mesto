import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;

        this._form = this._popup.querySelector('form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._btnElement = this._form.querySelector('.popup__btn');
        this._btnText = this._btnElement.textContent;
    }

    _getInputValues() {
        const values = {};

        this._inputs.forEach(input => {
            values[input.name] = input.value; 
        });

        return values;
    }

    renderLoading(isLoading, loadingText='Сохранение...') {
        if (isLoading) {
          this._btnElement.textContent = loadingText;
        } else {
          this._btnElement.textContent = this._btnText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        });
    }

    setSubmitHandler(formSubmitHandler) {
        this._formSubmitHandler = formSubmitHandler;
    }

    close() {
        super.close();
        this._form.reset();
    }
}