import createCard from '../src/app/showCard';

// Mock showModal to avoid dependencies
jest.mock('../src/app/showModal', () => jest.fn());

describe('createCard', () => {
    let root;

    beforeEach(() => {
        // Set up our document body
        document.body.innerHTML = '<div id="root"></div>';
        root = document.getElementById('root');
    });

    test('should create a card with correct description', () => {
        const mockValue = {
            urls: { regular: 'http://example.com/image.jpg' },
            user: { profile_image: { medium: 'http://example.com/user.jpg' } },
            description: 'A beautiful sunset'
        };

        createCard(mockValue);

        const card = root.querySelector('.card');
        expect(card).toBeTruthy();
        
        const cardText = card.querySelector('.card-text');
        expect(cardText.textContent).toBe('A beautiful sunset');

        const cardImg = card.querySelector('.card-content');
        expect(cardImg.src).toBe('http://example.com/image.jpg');
    });

    test('should use alt_description if description is missing', () => {
        const mockValue = {
            urls: { regular: 'http://example.com/image.jpg' },
            user: { profile_image: { medium: 'http://example.com/user.jpg' } },
            description: null,
            alt_description: 'Fallback description'
        };

        createCard(mockValue);

        const cardText = root.querySelector('.card-text');
        expect(cardText.textContent).toBe('Fallback description');
    });
});
