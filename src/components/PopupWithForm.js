import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;

        this._form = this._popup.querySelector('form');
        this._inputs = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const values = {};

        this._inputs.forEach(input => {
            values[input.name] = input.value; 
        });

        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}