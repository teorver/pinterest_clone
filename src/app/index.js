import createCard from './showCard.js';

const getPinterestData = async () => {
    const photos = await fetch('https://api.unsplash.com/photos/random/?client_id=5HxesvmDSHyOpCHGFTaK2E_qm_g_xkMj9DZ-KU5QOdQ&count=25').then((response) => response.json());
    return {
        photos,
    }
}

const runPinterestApplication = async () => {
    let localStoragePhotos = JSON.parse(localStorage.getItem('photos')) || [];

    if (localStoragePhotos.length === 0) {
        const { photos } = await getPinterestData();
        localStorage.setItem('photos', JSON.stringify(photos));
        localStoragePhotos = photos; // Update localStoragePhotos with the fetched data
    }

    // Render cards according to the data from local storage or from the request
    localStoragePhotos.forEach(value => {
        createCard(value);
    });
}

runPinterestApplication();