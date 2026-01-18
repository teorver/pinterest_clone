import createPopUp from '../src/app/showModal';

describe('showModal', () => {
    let cardContent, photo;

    beforeEach(() => {
        document.body.innerHTML = '';
        cardContent = document.createElement('img');
        cardContent.classList.add('card-content');
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('card');
        cardWrapper.appendChild(cardContent);
        document.body.appendChild(cardWrapper);

        photo = { id: 1, urls: { regular: 'img.jpg' } };
        localStorage.clear();
    });

    test('should show popup on document click after initialization', () => {
        createPopUp(cardContent, photo);
        
        // Dispatch click to trigger onMouseClick inside createPopUp
        document.dispatchEvent(new MouseEvent('click', { clientX: 100, clientY: 100 }));

        const popup = document.querySelector('.pop-up_hover');
        expect(popup).toBeTruthy();
        expect(popup.style.top).toBe('100px');
        expect(popup.style.left).toBe('100px');
    });

    test('should show board select when "Add a card to the board" is clicked', () => {
        createPopUp(cardContent, photo);
        document.dispatchEvent(new MouseEvent('click', { clientX: 10, clientY: 10 }));

        const addToBoardBtn = document.querySelector('.hover__btn');
        addToBoardBtn.click();

        // After clicking Add to Board, it should wait for another click to position the board select
        document.dispatchEvent(new MouseEvent('click', { clientX: 20, clientY: 20 }));

        const boardSelect = document.querySelector('.board-select');
        expect(boardSelect).toBeTruthy();
    });

    test('should add photo to localStorage when board button is clicked', () => {
        createPopUp(cardContent, photo);
        document.dispatchEvent(new MouseEvent('click', { clientX: 10, clientY: 10 }));
        
        document.querySelector('.hover__btn').click(); // Add to board
        document.dispatchEvent(new MouseEvent('click', { clientX: 20, clientY: 20 }));

        const boardBtn1 = document.querySelector('.board-btn'); // Board 1
        boardBtn1.click();

        const board1Data = JSON.parse(localStorage.getItem('board_1'));
        expect(board1Data).toHaveLength(1);
        expect(board1Data[0].id).toBe(1);
    });

    test('should remove card when review is submitted', () => {
        createPopUp(cardContent, photo);
        document.dispatchEvent(new MouseEvent('click', { clientX: 10, clientY: 10 }));

        const buttons = document.querySelectorAll('.hover__btn');
        const leaveReviewBtn = buttons[1];
        leaveReviewBtn.click();

        document.dispatchEvent(new MouseEvent('click', { clientX: 30, clientY: 30 }));

        const submitBtn = document.querySelector('.review-modal .board-btn');
        submitBtn.click();

        expect(document.querySelector('.card')).toBeNull();
    });
});
