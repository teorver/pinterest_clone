export function initSortCards() {
    const sortSelect = document.getElementById('sort-cards');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const root = document.getElementById('root');
        if (!root) return;

        // Get all cards
        const cards = Array.from(document.querySelectorAll('.card'));
        
        // Sort cards based on selected option
        let sortedCards;
        switch (sortValue) {
            case 'alphabetical':
                sortedCards = cards.sort((a, b) => {
                    const textA = a.querySelector('.card-text').textContent.toLowerCase();
                    const textB = b.querySelector('.card-text').textContent.toLowerCase();
                    return textA.localeCompare(textB);
                });
                break;
            case 'reverse-alphabetical':
                sortedCards = cards.sort((a, b) => {
                    const textA = a.querySelector('.card-text').textContent.toLowerCase();
                    const textB = b.querySelector('.card-text').textContent.toLowerCase();
                    return textB.localeCompare(textA);
                });
                break;
            case 'default':
            default:
                // Keep original order - no sorting needed
                return;
        }

        // Clear root and re-append sorted cards
        root.innerHTML = '';
        sortedCards.forEach(card => {
            root.appendChild(card);
        });
    });
}

initSortCards();
