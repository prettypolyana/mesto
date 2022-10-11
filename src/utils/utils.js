import rostovondonImage from '../images/Rostov-on-Don.jpg';
import sudakImage from '../images/Sudak.jpg';
import dubnaImage from '../images/Dubna.jpg';
import zelenogradImage from '../images/Zelenograd.jpg';
import velUstImage from '../images/VU.jpg';
import obninskImage from '../images/Obninsk.jpg';

const cardsConfig = {
    cardTemplateSelector: '.card-template',
    cardSelector: '.elements__card',
    likeBtnActive: 'elements__btn_active',
    photoSelector: '.elements__photo',
    cardNameSelector: '.elements__name',
    likeBtnSelector: '.elements__btn',
    removeBtnSelector: '.elements__trash'
};

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

const initialCards = [
    {
      name: 'Ростов-на-Дону',
      link: rostovondonImage,
    },
    {
      name: 'Судак',
      link: sudakImage,
    },
    {
      name: 'Дубна',
      link: dubnaImage,
    },
    {
      name: 'Зеленоград',
      link: zelenogradImage,
    },
    {
      name: 'Великий Устюг',
      link: velUstImage,
    },
    {
      name: 'Обнинск',
      link: obninskImage,
    }
];

export {cardsConfig, validationConfig, initialCards};
