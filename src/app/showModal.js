export default function createPopUp(cardContent, photo) {
    // Define pop-up elements
    const popUpWrapper = document.createElement('div');
    popUpWrapper.classList.add('pop-up_hover');

    const addToBoardBtn = document.createElement('button');
    addToBoardBtn.classList.add('hover__btn');
    addToBoardBtn.textContent = 'Add a card to the board';

    const hideCardBtn = document.createElement('button');
    hideCardBtn.classList.add('hover__btn');
    hideCardBtn.textContent = 'Leave a review';

    popUpWrapper.append(addToBoardBtn, hideCardBtn);

    document.addEventListener('click', onMouseClick);

    // Create overlay to block actions on the page
    const overlay = document.createElement('div');

    // Render pop-up according to mouse position on card
    function onMouseClick(event) {
        // Position the pop-up at the mouse coordinates
        popUpWrapper.style.position = 'fixed';
        popUpWrapper.style.top = `${event.clientY}px`;
        popUpWrapper.style.left = `${event.clientX}px`;
        overlay.classList.add('overlay');

        document.removeEventListener('click', onMouseClick);
        document.body.append(popUpWrapper, overlay);
    }

    // Show modal with the list of available boards
    addToBoardBtn.addEventListener('click', () => {
        document.body.removeChild(popUpWrapper);
        document.body.removeChild(overlay);
        createBoardSelect(cardContent, photo);
    });

    // Show modal with the list of available reasons
    hideCardBtn.addEventListener('click', () => {
        document.body.removeChild(popUpWrapper);
        showReviewReasons(cardContent);
    });
}

// Create modal with the list of available boards
function createBoardSelect(cardContent, photo) {
    // Define modal elements
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

    document.addEventListener('click', onMouseClick);

    function onMouseClick(event) {
        boardSelect.style.position = 'fixed';
        boardSelect.style.top = `${event.clientY}px`;
        boardSelect.style.left = `${event.clientX}px`;

        document.removeEventListener('click', onMouseClick);
        document.body.appendChild(boardSelect);
    }
}

// Save card to the selected board and local storage
function addToBoard(boardKey, photo) {
    const existingData = JSON.parse(localStorage.getItem(boardKey)) ?? [];
    existingData.push(photo);
    localStorage.setItem(boardKey, JSON.stringify(existingData));
}

// Create modal with the list of available reasons
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

    document.addEventListener('click', onMouseClick);

    function onMouseClick(event) {
        reviewReasons.style.position = 'fixed';
        reviewReasons.style.top = `${event.clientY}px`;
        reviewReasons.style.left = `${event.clientX}px`;

        // Remove the event listener after the review modal is displayed
        document.removeEventListener('click', onMouseClick);

        document.body.appendChild(reviewReasons);
    }

    // Remove the card from the page
    submitReviewBtn.addEventListener('click', () => {

        const cardWrapper = cardContent.closest('.card');
        cardWrapper.parentNode.removeChild(cardWrapper);
        // Hide the reasons modal
        document.body.removeChild(reviewReasons);
    });
}