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
    popUpWrapper.style.top = `${(rect.bottom / 2) + 15}px`;
    popUpWrapper.style.left = `${rect.left + (rect.width / 2)}px`;

    document.body.appendChild(popUpWrapper);

    addToBoardBtn.addEventListener('click', () => {
        // Handle the "Add to Board" button click
        document.body.removeChild(popUpWrapper);
        createBoardSelect(cardContent, photo);
    });

    hideCardBtn.addEventListener('click', () => {
        // Handle the "Leave a Review" button click
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
        addToBoard('board_1', photo);
        document.body.removeChild(boardSelect);
    });

    const boardBtn2 = document.createElement('button');
    boardBtn2.textContent = 'Board 2';
    boardBtn2.classList.add('board-btn');
    boardBtn2.addEventListener('click', () => {
        addToBoard('board_2', photo);
        document.body.removeChild(boardSelect);
    });

    const boardBtn3 = document.createElement('button');
    boardBtn3.textContent = 'Board 3';
    boardBtn3.classList.add('board-btn');
    boardBtn3.addEventListener('click', () => {
        addToBoard('board_3', photo);
        document.body.removeChild(boardSelect);
    });

    boardSelect.append(boardBtn1, boardBtn2, boardBtn3);

    // Position the board select at the same position as the pop-up
    const rect = cardContent.getBoundingClientRect();
    boardSelect.style.position = 'fixed';
    boardSelect.style.bottom = `${rect.top - 50}px`;
    boardSelect.style.left = `${rect.left + (rect.width / 2)}px`;

    document.body.appendChild(boardSelect);
}

function addToBoard(boardKey, photo) {
    const existingData = JSON.parse(localStorage.getItem(boardKey)) ?? [];
    existingData.push(photo);
    localStorage.setItem(boardKey, JSON.stringify(existingData));
}

function showReviewReasons(cardContent) {
    const reviewReasons = document.createElement('div');
    reviewReasons.classList.add('review-modal');

    // Create an array of reasons
    const reasonsArray = [
        'Reason 1',
        'Reason 2',
        'Reason 3',
        'Reason 4',
        'Reason 5',
        'Reason 6',
        'Reason 7',
    ];

    // Create checkboxes based on the array
    reasonsArray.forEach((reason, index) => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('checkbox-wrapper');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `reason${index + 1}`;

        const label = document.createElement('label');
        label.htmlFor = `reason${index + 1}`;
        label.textContent = reason;

        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(label);
        reviewReasons.appendChild(checkboxWrapper);
    });

    const submitReviewBtn = document.createElement('button');
    submitReviewBtn.classList.add('board-btn');
    submitReviewBtn.textContent = 'Submit Review';

    reviewReasons.append(submitReviewBtn);

    // Position the review modal at the same position as the pop-up
    const rect = cardContent.getBoundingClientRect();
    reviewReasons.style.position = 'fixed';
    reviewReasons.style.top = `${rect.bottom / 2}px`;
    reviewReasons.style.left = `${rect.left + (rect.width / 2)}px`;

    document.body.appendChild(reviewReasons);

    submitReviewBtn.addEventListener('click', () => {
        // Remove the card from the page
        const cardWrapper = cardContent.closest('.card');
        cardWrapper.parentNode.removeChild(cardWrapper);

        // Hide the review modal
        document.body.removeChild(reviewReasons);
    });
}