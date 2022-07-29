const config = {
    formSelector: '.popup__content',
    fieldsetSelector: '.popup__input-field',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn-disabled',
    inputInvalidClass: 'popup__input_invalid',
    errorContainerClassEnd: '-error',
    errorClass: 'popup__error_visible'
};

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(function(form) {
        form.addEventListener('input', function(event) {
            handleFormInput(event, config);
        });
    });
}

function handleFormInput(event, config) {
    const inputElement = event.target;
    const form = event.currentTarget;

    checkInputError(inputElement, config);
    checkButtonState(form, config);
}

function checkButtonState(form, config) {
    const buttonElement = form.querySelector(config.submitButtonSelector);
    const isValid = form.checkValidity();
    if (isValid) {
        setFormButtonEnabled(buttonElement, config);
    } else {
        setFormButtonDisabled(buttonElement, config);
    }
}

function checkInputError(inputElement, config) {
    if (inputElement.validity.valid) {
        setInputElementValid(inputElement, config);
        hideInputErrorMessage(inputElement, config);
    } else {
        setInputElementInvalid(inputElement, config);
        showInputErrorMessage(inputElement, config);
    };
}

function setInputElementInvalid(inputElement, config) {
    inputElement.classList.add(config.inputInvalidClass);
}

function setInputElementValid(inputElement, config) {
    inputElement.classList.remove(config.inputInvalidClass);
}

function showInputErrorMessage(inputElement, config) {
    const inputName = inputElement.getAttribute('name');
    const inputErrorElement = document.getElementById(`${inputName}${config.errorContainerClassEnd}`);
    inputErrorElement.textContent = inputElement.validationMessage;
}

function hideInputErrorMessage(inputElement, config) {
    const inputName = inputElement.getAttribute('name');
    const inputErrorElement = document.getElementById(`${inputName}${config.errorContainerClassEnd}`);
    inputErrorElement.textContent = '';
}

function setFormButtonDisabled(buttonElement, config) {
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add(config.inactiveButtonClass);
}

function setFormButtonEnabled(buttonElement, config) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(config.inactiveButtonClass);
}

enableValidation(config);
