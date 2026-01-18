import { showBoard } from '../src/app/switchBoard';
import createCard from '../src/app/showCard';

// Mock showCard to see if it's called
jest.mock('../src/app/showCard', () => jest.fn());

describe('switchBoard', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <select id="select-board">
                <option value="default__board">All</option>
                <option value="board__1">Board 1</option>
            </select>
            <div id="root"></div>
        `;
        localStorage.clear();
        jest.clearAllMocks();
        showBoard();
    });

    test('should render cards from default board when selected', () => {
        const photos = [{ id: 1, urls: { regular: '' }, user: { profile_image: { medium: '' } }, description: 'Photo 1' }];
        localStorage.setItem('photos', JSON.stringify(photos));

        const select = document.getElementById('select-board');
        select.value = 'default__board';
        select.dispatchEvent(new Event('change'));

        expect(createCard).toHaveBeenCalledTimes(1);
        expect(createCard).toHaveBeenCalledWith(photos[0]);
    });

    test('should render cards from board__1 when selected', () => {
        const board1 = [{ id: 2, urls: { regular: '' }, user: { profile_image: { medium: '' } }, description: 'Board 1 Photo' }];
        localStorage.setItem('board_1', JSON.stringify(board1));

        const select = document.getElementById('select-board');
        select.value = 'board__1';
        select.dispatchEvent(new Event('change'));

        expect(createCard).toHaveBeenCalledTimes(1);
        expect(createCard).toHaveBeenCalledWith(board1[0]);
    });

    test('should clear root before rendering new board', () => {
        const root = document.getElementById('root');
        root.innerHTML = '<span>Old Content</span>';

        const select = document.getElementById('select-board');
        select.value = 'default__board';
        select.dispatchEvent(new Event('change'));

        expect(root.innerHTML).toBe('');
    });
});
