import createCard from './showCard.js';

export function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', async () => {
        // Disable button while loading
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Loading...';

        try {
            // Fetch additional photos from Unsplash API
            const response = await fetch('https://api.unsplash.com/photos/random/?client_id=5HxesvmDSHyOpCHGFTaK2E_qm_g_xkMj9DZ-KU5QOdQ&count=25');
            const photos = await response.json();

            // Get current photos from localStorage
            const currentPhotos = JSON.parse(localStorage.getItem('photos')) ?? [];
            
            // Append new photos to existing ones
            const updatedPhotos = [...currentPhotos, ...photos];
            localStorage.setItem('photos', JSON.stringify(updatedPhotos));

            // Render new cards
            photos.forEach(photo => {
                createCard(photo);
            });

            // Re-enable button
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Load More';
        } catch (error) {
            console.error('Error loading more photos:', error);
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Load More';
        }
    });
}

initLoadMore();
