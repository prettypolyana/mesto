class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputList = this._form.querySelectorAll(config.inputSelector);
    }

    enableValidation() {
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
        this._addFormInputEventListener();
        this.checkButtonState();
    }

    resetValidation() {
        this._setFormButtonEnabled();

        this._inputList.forEach((inputElement) => {
          this._setInputElementValid(inputElement);
          this._hideInputErrorMessage(inputElement);
        });
    }

    checkButtonState() {
        this._isValid = this._form.checkValidity();
        if (this._isValid) {
            this._setFormButtonEnabled();
        } else {
            this._setFormButtonDisabled();
        }
    }

    _addFormInputEventListener() {
        this._form.addEventListener('input', (event) => {
            this._handleFormInput(event);
        });
    }

    _handleFormInput(event) {
        const inputElement = event.target;
        this._form = event.currentTarget;
        
        this._checkInputError(inputElement); 
        this.checkButtonState();
    }

    _checkInputError(inputElement) {
        if (inputElement.validity.valid) {
            this._setInputElementValid(inputElement);
            this._hideInputErrorMessage(inputElement);
        } else {
            this._setInputElementInvalid(inputElement);
            this._showInputErrorMessage(inputElement);
        };
    }

    _setFormButtonEnabled() {
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }

    _setFormButtonDisabled() {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
    }

    _setInputElementInvalid(inputElement) {
        inputElement.classList.add(this._config.inputInvalidClass);
    }
    
    _setInputElementValid(inputElement) {
        inputElement.classList.remove(this._config.inputInvalidClass);
    }

    _showInputErrorMessage(inputElement) {
        const inputName = inputElement.getAttribute('name');
        const inputErrorElement = document.getElementById(`${inputName}${this._config.errorContainerClassEnd}`);
        inputErrorElement.textContent = inputElement.validationMessage;
    }
    
    _hideInputErrorMessage(inputElement) {
        const inputName = inputElement.getAttribute('name');
        const inputErrorElement = document.getElementById(`${inputName}${this._config.errorContainerClassEnd}`);
        inputErrorElement.textContent = '';
    }
}

export default FormValidator;