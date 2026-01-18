import { runPinterestApplication } from '../src/app/index';
import createCard from '../src/app/showCard';

jest.mock('../src/app/showCard', () => jest.fn());

describe('index (app initialization)', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        localStorage.clear();
        jest.clearAllMocks();
        
        fetch.mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 'fetch1', urls: { regular: '' }, user: { profile_image: { medium: '' } } }]),
            })
        );
    });

    test('should fetch data if localStorage is empty', async () => {
        await runPinterestApplication();
        expect(fetch).toHaveBeenCalled();
        expect(localStorage.getItem('photos')).toBeTruthy();
        expect(createCard).toHaveBeenCalled();
    });

    test('should use localStorage data if available', async () => {
        const photos = [{ id: 'local1', urls: { regular: '' }, user: { profile_image: { medium: '' } } }];
        localStorage.setItem('photos', JSON.stringify(photos));

        await runPinterestApplication();

        expect(fetch).not.toHaveBeenCalled();
        expect(createCard).toHaveBeenCalledWith(photos[0]);
    });
});
