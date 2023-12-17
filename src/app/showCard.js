import createPopUp from "./showModal.js";

const root = document.getElementById('root');

export default function createCard(photo) {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card');

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = photo.urls.regular;

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('card-description');

    let cardImg = document.createElement('img');
    cardImg.classList.add('card-image');
    cardImg.src = photo.user.profile_image.medium;

    let cardDescription = document.createElement('span');
    cardDescription.classList.add('card-text');

    if (photo.description) {
        cardDescription.textContent = `${photo.description}`;
    } else {
        cardDescription.textContent = `${photo.alt_description}`;
    }

    descriptionWrapper.append(cardImg, cardDescription);
    cardWrapper.append(cardContent, descriptionWrapper);
    root.appendChild(cardWrapper);

    cardContent.addEventListener('click', () => {
        createPopUp(cardContent, photo);
    });
}

// function renderCards(selectedBoard, searchTerm) {
//     const root = document.getElementById('root');
//     root.innerHTML = ''; // Clear existing cards
//
//     const localStorageKey = `board_${selectedBoard}`;
//     const localStoragePhotos = JSON.parse(localStorage.getItem(localStorageKey)) || [];
//
//     const filteredPhotos = localStoragePhotos.filter(photo => {
//         const description = photo.description || photo.alt_description || '';
//         return description.toLowerCase().includes(searchTerm.toLowerCase());
//     });
//
//     filteredPhotos.forEach(photo => {
//         createCard(photo);
//     });
// }
//
// // Event listener for the select board dropdown
// const selectBoard = document.getElementById('select-board');
// selectBoard.addEventListener('change', (event) => {
//     const selectedBoard = event.target.value;
//     const searchTerm = document.getElementById('header-search').value;
//     renderCards(selectedBoard, searchTerm);
// });
//
// // Event listener for the search input
// const searchInput = document.getElementById('header-search');
// searchInput.addEventListener('input', () => {
//     const selectedBoard = selectBoard.value;
//     const searchTerm = searchInput.value;
//     renderCards(selectedBoard, searchTerm);
// });
//
// // Initial rendering when the page loads
// const initialSelectedBoard = selectBoard.value; // or any default value
// const initialSearchTerm = searchInput.value; // or empty string
// renderCards(initialSelectedBoard, initialSearchTerm);