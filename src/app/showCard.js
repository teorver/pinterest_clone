import createPopUp from "./showModal.js";

const root = document.getElementById('root');

export default function createCard(value) {
    // Create card wrapper and elements
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card');

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = value.urls.regular;

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('card-description');

    let cardImg = document.createElement('img');
    cardImg.classList.add('card-image');
    cardImg.src = value.user.profile_image.medium;

    let cardDescription = document.createElement('span');
    cardDescription.classList.add('card-text');

    if (value.description) {
        cardDescription.textContent = `${value.description}`;
    } else {
        cardDescription.textContent = `${value.alt_description}`;
    }

    // Show card on the page
    descriptionWrapper.append(cardImg, cardDescription);
    cardWrapper.append(cardContent, descriptionWrapper);
    root.appendChild(cardWrapper);

    // Show pop-up on card click
    cardContent.addEventListener('click', () => {
        createPopUp(cardContent, value);
    });
}