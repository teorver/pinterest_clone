import { initSortCards } from '../src/app/sortCards.js';

describe('initSortCards', () => {
    let sortSelect;
    let root;

    // Helper function to create a card element with given text
    function createCard(text) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const cardText = document.createElement('div');
        cardText.className = 'card-text';
        cardText.textContent = text;
        
        card.appendChild(cardText);
        return card;
    }

    // Helper function to get current card order from DOM
    function getCardOrder() {
        const cards = Array.from(document.querySelectorAll('.card'));
        return cards.map(card => card.querySelector('.card-text').textContent);
    }

    beforeEach(() => {
        // Set up DOM structure
        document.body.innerHTML = `
            <select id="sort-cards">
                <option value="default">Sort by</option>
                <option value="alphabetical">A-Z</option>
                <option value="reverse-alphabetical">Z-A</option>
            </select>
            <div id="root"></div>
        `;

        sortSelect = document.getElementById('sort-cards');
        root = document.getElementById('root');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should reorder card elements in ascending alphabetical order when sort option is changed to alphabetical', () => {
        // Arrange: Create cards with unsorted text
        const cardTexts = ['Zebra', 'Apple', 'Mango', 'Banana'];
        cardTexts.forEach(text => {
            root.appendChild(createCard(text));
        });

        // Initialize the sort functionality
        initSortCards();

        // Act: Change sort option to alphabetical
        sortSelect.value = 'alphabetical';
        sortSelect.dispatchEvent(new Event('change'));

        // Assert: Verify cards are in alphabetical order
        const actualOrder = getCardOrder();
        const expectedOrder = ['Apple', 'Banana', 'Mango', 'Zebra'];
        
        expect(actualOrder).toEqual(expectedOrder);
        
        // Additional assertion: Verify all cards are still in the DOM
        expect(document.querySelectorAll('.card').length).toBe(4);
    });

    test('should reorder card elements in descending alphabetical order when sort option is changed to reverse-alphabetical', () => {
        // Arrange: Create cards with unsorted text
        const cardTexts = ['Zebra', 'Apple', 'Mango', 'Banana'];
        cardTexts.forEach(text => {
            root.appendChild(createCard(text));
        });

        // Initialize the sort functionality
        initSortCards();

        // Act: Change sort option to reverse-alphabetical
        sortSelect.value = 'reverse-alphabetical';
        sortSelect.dispatchEvent(new Event('change'));

        // Assert: Verify cards are in reverse alphabetical order
        const actualOrder = getCardOrder();
        const expectedOrder = ['Zebra', 'Mango', 'Banana', 'Apple'];
        expect(actualOrder).toEqual(expectedOrder);

        // Additional assertion: Verify all cards are still in the DOM
        expect(document.querySelectorAll('.card').length).toBe(4);
    });

    test('should correctly sort cards with special characters, numbers, and non-ASCII characters', () => {
        // Arrange: Create cards with special characters, numbers, and non-ASCII characters
        const cardTexts = ['1. Apple', 'Äpple', 'Banana!', '#Cherry', 'Dàte'];
        cardTexts.forEach(text => {
            root.appendChild(createCard(text));
        });

        // Initialize the sort functionality
        initSortCards();

        // Act: Change sort option to alphabetical
        sortSelect.value = 'alphabetical';
        sortSelect.dispatchEvent(new Event('change'));

        // Assert: Verify cards are in alphabetical order
        const actualOrder = getCardOrder();
        const expectedOrder = ['#Cherry', '1. Apple', 'Äpple', 'Banana!', 'Dàte'];
        
        expect(actualOrder).toEqual(expectedOrder);
    });

    test('should handle case-insensitive sorting correctly', () => {
        // Arrange: Create cards with mixed-case text
        const cardTexts = ['Apple', 'banana', 'Cherry', 'date'];
        cardTexts.forEach(text => {
            root.appendChild(createCard(text));
        });

        // Initialize the sort functionality
        initSortCards();

        // Act: Change sort option to alphabetical
        sortSelect.value = 'alphabetical';
        sortSelect.dispatchEvent(new Event('change'));

        // Assert: Verify cards are in case-insensitive alphabetical order
        const actualOrder = getCardOrder();
        const expectedOrder = ['Apple', 'banana', 'Cherry', 'date'];
        expect(actualOrder).toEqual(expectedOrder);
    });

    // [Tusk] FAILING TEST
    test('should handle the case where no cards exist in the DOM without clearing unrelated content', () => {
        // Arrange: Set up root with initial content and update beforeEach setup
        document.body.innerHTML = `
            <select id="sort-cards">
                <option value="default">Sort by</option>
                <option value="alphabetical">A-Z</option>
                <option value="reverse-alphabetical">Z-A</option>
            </select>
            <div id="root">Some initial content</div>
        `;
        
        sortSelect = document.getElementById('sort-cards');
        root = document.getElementById('root');
        
        const initialContent = root.innerHTML;

        // Initialize the sort functionality
        initSortCards();

        // Act: Change sort option to alphabetical
        sortSelect.value = 'alphabetical';
        sortSelect.dispatchEvent(new Event('change'));

        // Assert: Verify that the content of the root element remains the same
        expect(root.innerHTML).toBe(initialContent);
    });
});