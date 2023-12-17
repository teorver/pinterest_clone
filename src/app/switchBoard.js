import createCard from "./showCard.js";

const selectBoard = document.getElementById('select-board');
const root = document.getElementById('root');

function showBoard() {
    selectBoard.addEventListener('change', () => {
        const selectedBoard = selectBoard.value;
        root.innerHTML = '';

        let boardData;
        if (selectedBoard === 'default__board') {
            boardData = JSON.parse(localStorage.getItem('photos')) ?? [];
            boardData.forEach(value => {
                createCard(value);
            });
        } else if (selectedBoard === 'board__3') {
            boardData = JSON.parse(localStorage.getItem('board_3')) ?? [];
            boardData.forEach(value => {
                createCard(value);
            });
        } else if (selectedBoard === 'board__2') {
            boardData = JSON.parse(localStorage.getItem('board_2')) ?? [];
            boardData.forEach(value => {
                createCard(value);
            });
        } else if (selectedBoard === 'board__1') {
            boardData = JSON.parse(localStorage.getItem('board_1')) || [];
            boardData.forEach(value => {
                createCard(value);
            });
        }
    });
}

showBoard();