const popupInputFieldList = document.querySelectorAll('.popup__input-field');
popupInputFieldList.forEach(function(popupInputFieldElement) {
    const popupInputElement = popupInputFieldElement.querySelector('.popup__input');
    const popupErrorElement = popupInputFieldElement.querySelector('.popup__input-error');
    popupInputElement.addEventListener('input', function () {
        if (popupInputElement.validity.valid) {
            popupErrorElement.textContent = '';
        } else {
            popupErrorElement.textContent = popupInputElement.validationMessage;
        }
    });
})
