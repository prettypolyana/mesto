const formProfileElement = document.querySelector('.popup__content-profile');
const nameInput = formProfileElement.querySelector('.popup__name');
const jobInput = formProfileElement.querySelector('.popup__job');
const popupProfileCloseButton = document.querySelector('.popup__close-profile');
const popupProfileElement = document.querySelector('.popup_view_profile');

const profileButton = document.querySelector('.profile__btn');
const profileNameElement = document.querySelector('.profile__name');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template').content;

const formCardElement = document.querySelector('.popup__content-card');
const popupAddCardCloseButton = document.querySelector('.popup__close-card');
const popupAddCardElement = document.querySelector('.popup_view_add-card');
const cardNameInput = formCardElement.querySelector('.popup__card-name');
const cardLinkInput =  formCardElement.querySelector('.popup__link');
const popupAddCardSubmitButton = formCardElement.querySelector('.popup__btn');

const cardAddButton = document.querySelector('.profile__btn-plus');

const popupShowImageElement = document.querySelector('.popup_view_show-image');
const popupDescElement = document.querySelector('.popup__desc');
const popupImage = document.querySelector('.popup__image');
const popupImageClose = document.querySelector('.popup__close-image');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleWindowKeydown);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleWindowKeydown);
}

function closeOpenedPopup() {
    const popupOpenedElement = document.querySelector('.popup_opened');
    closePopup(popupOpenedElement);
}

function handleWindowKeydown(event) {
    const key = event.key;
    if (key === 'Escape') {
        closeOpenedPopup();
    };
}

function openPopupProfile() {
    openPopup(popupProfileElement);
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

function closePopupProfile() {
    closePopup(popupProfileElement);
}

function handlePopupProfileClick(event) {
    if (event.target == popupProfileElement) {
        closePopupProfile();
    }
}

profileButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupProfileElement.addEventListener('click', handlePopupProfileClick);

function handleFormProfileSubmit (evt) {
    evt.preventDefault(); 

    profileNameElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;

    closePopupProfile();
}

formProfileElement.addEventListener('submit', handleFormProfileSubmit); 

function disablePopupAddCardSubmitButton() {
    popupAddCardSubmitButton.classList.add('popup__btn-disabled');
    popupAddCardSubmitButton.setAttribute('disabled', 'disabled');
}

function openPopupAddCard() {
    formCardElement.reset();
    disablePopupAddCardSubmitButton();
    openPopup(popupAddCardElement);
}

function closePopupAddCard() {
    closePopup(popupAddCardElement);
}

function openPopupImage(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupDescElement.textContent = name;
    openPopup(popupShowImageElement);
}

function likePhoto(event) {
    event.target.classList.toggle('elements__btn_active');
}

function removeCard(event) {
    event.target.closest('.elements__card').remove();
}

function createCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardPhotoElement = cardElement.querySelector('.elements__photo');
      
    cardPhotoElement.src = link;
    cardPhotoElement.alt = name;
    cardElement.querySelector('.elements__name').textContent = name;

    const cardElementBtn = cardElement.querySelector('.elements__btn');
    cardElementBtn.addEventListener('click', likePhoto);

    const removeCardBtn = cardElement.querySelector('.elements__trash');
    removeCardBtn.addEventListener('click', removeCard);

    const elementsPhoto = cardPhotoElement;
    elementsPhoto.addEventListener('click', (event) => openPopupImage(event.target.alt, event.target.src));

    return cardElement;
}

function renderCard(name, link) {
    const cardElement = createCard(name, link);
    cardsContainer.prepend(cardElement);
}

function handlePopupAddCardClick(event) {
    if (event.target == popupAddCardElement) {
        closePopupAddCard();
    }
}

cardAddButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
popupAddCardElement.addEventListener('click', handlePopupAddCardClick);

function handleFormCardSubmit (evt) {
    evt.preventDefault();

    renderCard(cardNameInput.value, cardLinkInput.value);

    closePopupAddCard();
} 

formCardElement.addEventListener('submit', handleFormCardSubmit); 

function closePopupImage() {
    closePopup(popupShowImageElement);
}

function handlePopupImageClick(event) {
    if (event.target == popupShowImageElement) {
        closePopupImage();
    }
}

popupImageClose.addEventListener('click', closePopupImage);
popupShowImageElement.addEventListener('click', handlePopupImageClick);

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
    renderCard(element.name, element.link);
});
