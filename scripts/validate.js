import {FormValidator} from "./FormValidator.js";

const validationConfig = {
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
        const formValidator = new FormValidator(config, form);
        formValidator.enableValidation();
    });
}

enableValidation(validationConfig);
