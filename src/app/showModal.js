// const root = document.getElementById('root');
//
// export default function createPopUp() {
//     const popUpWrapper = document.createElement('div');
//     popUpWrapper.classList.add('pop-up_hover');
//
//     // const closeBtn = document.createElement('button');
//     // closeBtn.classList.add('close-btn');
//     // closeBtn.innerHTML = '&#10006;';
//     //
//     // const closeButtonWrapper = document.createElement('div');
//     // closeButtonWrapper.classList.add('close-btn-wrapper');
//     // closeButtonWrapper.appendChild(closeBtn);
//
//     const addToBoardBtn = document.createElement('button');
//     addToBoardBtn.classList.add('hover__btn');
//     addToBoardBtn.textContent = 'Add a card to the board';
//
//     const hideCardBtn = document.createElement('button');
//     hideCardBtn.classList.add('hover__btn');
//     hideCardBtn.textContent = 'Leave a review';
//
//     popUpWrapper.append(addToBoardBtn, hideCardBtn);
//     root.append(popUpWrapper);
//
//     // Close pop-up on button click
//     // closeBtn.addEventListener('click', () => {
//     //    popUpWrapper.style.visibility = 'none';
//     // });
// }

// showModal.js
export default function createPopUp(cardContent) {
    const popUpWrapper = document.createElement('div');
    popUpWrapper.classList.add('pop-up_hover');

    const addToBoardBtn = document.createElement('button');
    addToBoardBtn.classList.add('hover__btn');
    addToBoardBtn.textContent = 'Add a card to the board';

    const hideCardBtn = document.createElement('button');
    hideCardBtn.classList.add('hover__btn');
    hideCardBtn.textContent = 'Leave a review';

    popUpWrapper.append(addToBoardBtn, hideCardBtn);

    // Position the pop-up relative to the clicked card
    const rect = cardContent.getBoundingClientRect();
    popUpWrapper.style.position = 'fixed';
    popUpWrapper.style.top = `${rect.bottom}px`;
    popUpWrapper.style.left = `${rect.left + (rect.width / 2)}px`;

    document.body.appendChild(popUpWrapper);

    addToBoardBtn.addEventListener('click', () => {
        // Handle the "Add to Board" button click
        console.log('Add to Board clicked');
    });

    hideCardBtn.addEventListener('click', () => {
        // Handle the "Leave a Review" button click
        console.log('Leave a Review clicked');
    });

    // Close the pop-up when clicking outside of it
    const closePopUp = (event) => {
        if (!popUpWrapper.contains(event.target) && event.target !== cardContent) {
            document.body.removeChild(popUpWrapper);
            document.removeEventListener('click', closePopUp);
        }
    };

    // Add event listener to close the pop-up when clicking outside of it
    document.addEventListener('click', closePopUp);
}
