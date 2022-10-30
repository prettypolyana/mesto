import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;

        this._form = this._popup.querySelector('form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._btnTextElement = this._popup.querySelector('.popup__btn-text');
        this._btnTextProgressElement = this._popup.querySelector('.popup__btn-text-progress');
    }

    _getInputValues() {
        const values = {};

        this._inputs.forEach(input => {
            values[input.name] = input.value; 
        });

        return values;
    }

    _setFormInProgress() {
        this._btnTextElement.classList.add('popup__btn-text_in-progress');
        this._btnTextProgressElement.classList.add('popup__btn-text-progress_in-progress');
    }

    _unsetFormInProgress() {
        this._btnTextElement.classList.remove('popup__btn-text_in-progress');
        this._btnTextProgressElement.classList.remove('popup__btn-text-progress_in-progress');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._setFormInProgress();
            this._formSubmitHandler(this._getInputValues());
        });
    }

    setSubmitHandler(formSubmitHandler) {
        this._formSubmitHandler = formSubmitHandler;
    }

    close() {
        super.close();
        this._form.reset();
        setInterval(() => {this._unsetFormInProgress();}, 500);
    }
}