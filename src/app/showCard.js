// import createPopUp from "./showModal.js";
//
// const root = document.getElementById('root');
//
// export default function createCard(photo) {
//     const cardWrapper = document.createElement('div');
//     cardWrapper.classList.add('card');
//
//     const cardContent = document.createElement('img');
//     cardContent.classList.add('card-content');
//     cardContent.src = photo.urls.regular;
//
//     const descriptionWrapper = document.createElement('div');
//     descriptionWrapper.classList.add('card-description');
//
//     let cardImg = document.createElement('img');
//     cardImg.classList.add('card-image');
//     cardImg.src = photo.user.profile_image.medium;
//
//     let cardDescription = document.createElement('span');
//     cardDescription.classList.add('card-text');
//
//     if (photo.description) {
//         cardDescription.textContent = `${photo.description}`;
//     } else {
//         cardDescription.textContent = `${photo.alt_description}`;
//     }
//
//     descriptionWrapper.append(cardImg, cardDescription);
//     cardWrapper.append(cardContent, descriptionWrapper);
//     root.appendChild(cardWrapper);
//
//     cardContent.addEventListener('click', () => {
//         createPopUp();
//     });
// }

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
        createPopUp(cardContent);
    });
}