import createPopUp from "./showModal.js";

const root = document.getElementById('root');
const headerSearch = document.getElementById('header-search');

export default function createCard(value) {
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

    descriptionWrapper.append(cardImg, cardDescription);
    cardWrapper.append(cardContent, descriptionWrapper);
    root.appendChild(cardWrapper);

    cardContent.addEventListener('click', () => {
        createPopUp(cardContent, value);
    });
}

// Event listener for the header search input
headerSearch.addEventListener('input', () => {
    const searchValue = headerSearch.value.toLowerCase();

    // Get all cards
    const cards = document.querySelectorAll('.card');

    // Loop through each card and check if the description contains the search value
    cards.forEach(card => {
        const cardDescription = card.querySelector('.card-text').textContent.toLowerCase();
        if (cardDescription.includes(searchValue)) {
            card.style.display = 'block'; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
});
