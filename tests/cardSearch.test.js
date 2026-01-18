import { initCardSearch } from '../src/app/cardSearch';

describe('cardSearch', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="header-search" type="text" />
            <div class="card"><span class="card-text">Nature</span></div>
            <div class="card"><span class="card-text">City</span></div>
            <div class="card"><span class="card-text">Food</span></div>
        `;
        // initCardSearch is called on import, but we call it again to bind to the new DOM
        initCardSearch();
    });

    test('should filter cards based on search input', () => {
        const searchInput = document.getElementById('header-search');
        const cards = document.querySelectorAll('.card');

        // Search for "nature"
        searchInput.value = 'nature';
        searchInput.dispatchEvent(new Event('input'));

        expect(cards[0].style.display).toBe('block');
        expect(cards[1].style.display).toBe('none');
        expect(cards[2].style.display).toBe('none');

        // Search for "o"
        searchInput.value = 'o';
        searchInput.dispatchEvent(new Event('input'));

        expect(cards[0].style.display).toBe('none');
        expect(cards[1].style.display).toBe('none');
        expect(cards[2].style.display).toBe('block');
    });

    test('should be case-insensitive', () => {
        const searchInput = document.getElementById('header-search');
        const cards = document.querySelectorAll('.card');

        searchInput.value = 'NATURE';
        searchInput.dispatchEvent(new Event('input'));

        expect(cards[0].style.display).toBe('block');
    });
});
