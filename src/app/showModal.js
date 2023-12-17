export default function createPopUp(cardContent, photo) {
    const popUpWrapper = document.createElement('div');
    popUpWrapper.classList.add('pop-up_hover');

    const addToBoardBtn = document.createElement('button');
    addToBoardBtn.classList.add('hover__btn');
    addToBoardBtn.textContent = 'Add a card to the board';

    const hideCardBtn = document.createElement('button');
    hideCardBtn.classList.add('hover__btn');
    hideCardBtn.textContent = 'Leave a review';

    popUpWrapper.append(addToBoardBtn, hideCardBtn);

    // Position the pop-up to the clicked card
    const rect = cardContent.getBoundingClientRect();
    popUpWrapper.style.position = 'fixed';
    popUpWrapper.style.top = `${rect.bottom / 2}px`;
    popUpWrapper.style.left = `${rect.left + (rect.width / 2)}px`;

    document.body.appendChild(popUpWrapper);

    addToBoardBtn.addEventListener('click', () => {
        // Handle the "Add to Board" button click
        console.log('Add to Board clicked');
        document.body.removeChild(popUpWrapper);
        createBoardSelect(cardContent, photo);
    });

    hideCardBtn.addEventListener('click', () => {
        // Handle the "Leave a Review" button click
        console.log('Leave a Review clicked');
        document.body.removeChild(popUpWrapper);
        showReviewReasons(cardContent, photo);
    });
}

function createBoardSelect(cardContent, photo) {
    const boardSelect = document.createElement('div');
    boardSelect.classList.add('board-select');

    const boardBtn1 = document.createElement('button');
    boardBtn1.textContent = 'Board 1';
    boardBtn1.classList.add('board-btn');
    boardBtn1.addEventListener('click', () => {
        localStorage.setItem('board_1', JSON.stringify(photo));
    });

    const boardBtn2 = document.createElement('button');
    boardBtn2.textContent = 'Board 2';
    boardBtn2.classList.add('board-btn');
    boardBtn2.addEventListener('click', () => {
        localStorage.setItem('board_2', JSON.stringify(photo));
    });

    const boardBtn3 = document.createElement('button');
    boardBtn3.textContent = 'Board 3';
    boardBtn3.classList.add('board-btn');
    boardBtn3.addEventListener('click', () => {
        localStorage.setItem('board_3', JSON.stringify(photo));
    });

    boardSelect.append(boardBtn1, boardBtn2, boardBtn3);

    // Position the board select at the same position as the pop-up
    const rect = cardContent.getBoundingClientRect();
    boardSelect.style.position = 'fixed';
    boardSelect.style.bottom = `${rect.top}px`;
    boardSelect.style.left = `${rect.left + (rect.width / 2)}px`;

    document.body.appendChild(boardSelect);
}
