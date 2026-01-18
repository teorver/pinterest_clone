export function initCardSearch() {
    const headerSearch = document.getElementById('header-search');
    if (!headerSearch) return;

    // Add event listener for the header search input
    headerSearch.addEventListener('input', () => {
        const searchValue = headerSearch.value.toLowerCase();

        // Select all cards
        const cards = document.querySelectorAll('.card');

        // Check card description to contain the search value
        cards.forEach(card => {
            const cardDescription = card.querySelector('.card-text').textContent.toLowerCase();
            if (cardDescription.includes(searchValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

initCardSearch();
