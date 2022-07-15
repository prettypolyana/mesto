const formElement = document.querySelector('.popup__content-profile');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__job');
const popupProfileCloseButton = document.querySelector('.popup__close-profile');
const popupProfileElement = document.querySelector('.popup_view_profile');

const profileButton = document.querySelector('.profile__btn');
const profileNameElement = document.querySelector('.profile__name');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const cardList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template').content;

const formCardElement = document.querySelector('.popup__content-card');
const popupAddCardCloseButton = document.querySelector('.popup__close-card');
const popupAddCardElement = document.querySelector('.popup_view_add-card');
const cardNameInput = formCardElement.querySelector('.popup__card-name');
const cardLinkInput =  formCardElement.querySelector('.popup__link');

const addCardButton = document.querySelector('.profile__btn-plus');
const addCardLink = document.querySelector('.elements__photo');
const addCardName = document.querySelector('.elements__name');

const popupShowImageElement = document.querySelector('.popup_view_show-image');
const popupDescElement = document.querySelector('.popup__desc');
const popupImage = document.querySelector('.popup__image');
const popupImageClose = document.querySelector('.popup__close-image');

function openPopupProfile() {
    popupProfileElement.classList.add('popup_opened');
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

function closePopupProfile() {
    popupProfileElement.classList.remove('popup_opened');
}

profileButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);

function profileFormSubmitHandler (evt) {
    evt.preventDefault(); 

    profileNameElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;

    closePopupProfile();
}

formElement.addEventListener('submit', profileFormSubmitHandler); 


function openPopupAddCard() {
    cardLinkInput.value = '';
    cardNameInput.value = '';
    popupAddCardElement.classList.add('popup_opened');
}

function closePopupAddCard() {
    popupAddCardElement.classList.remove('popup_opened');
}

function openPopupImage(event) {
    popupShowImageElement.classList.add('popup_opened');
    popupImage.src = event.target.src;
    popupDescElement.textContent = event.target.alt;
}

function likePhoto(event) {
    event.target.classList.toggle('elements__btn_active');
}

function removeCard(event) {
    event.target.parentNode.remove();
}

function addCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true);
      
    cardElement.querySelector('.elements__photo').src = link;
    cardElement.querySelector('.elements__photo').alt = name;
    cardElement.querySelector('.elements__name').textContent = name;

    const cardElementBtn = cardElement.querySelector('.elements__btn');
    cardElementBtn.addEventListener('click', likePhoto);

    const removeCardBtn = cardElement.querySelector('.elements__trash');
    removeCardBtn.addEventListener('click', removeCard);

    const elementsPhoto = cardElement.querySelector('.elements__photo');
    elementsPhoto.addEventListener('click', openPopupImage);
   
    cardList.prepend(cardElement);
}

addCardButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);

function addCardSubmitHandler (evt) {
    evt.preventDefault();

    addCard(cardNameInput.value, cardLinkInput.value);

    closePopupAddCard();
} 

formCardElement.addEventListener('submit', addCardSubmitHandler); 

function closePopupImage(event) {
    popupShowImageElement.classList.remove('popup_opened')
}

popupImageClose.addEventListener('click', closePopupImage);

const initialCards = [
    {
      name: 'Ростов-на-дону',
      link: './images/Rostov-on-Don.jpg'
    },
    {
      name: 'Судак',
      link: './images/Sudak.jpg'
    },
    {
      name: 'Дубна',
      link: './images/Dubna.jpg'
    },
    {
      name: 'Зеленоград',
      link: './images/Zelenograd.jpg'
    },
    {
      name: 'Великий Устюг',
      link: './images/VU.jpg'
    },
    {
      name: 'Обнинск',
      link: './images/Obninsk.jpg'
    }
];

initialCards.forEach(function (element) {
    addCard(element.name, element.link);
});
