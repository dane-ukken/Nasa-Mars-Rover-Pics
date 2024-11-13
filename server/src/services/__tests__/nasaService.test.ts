import axios from 'axios';
import { getRoverPhotos } from '../nasaService';
import { buildImageUrl, downloadImage } from '../../utils';
import { NASA_API } from '../../constants';
import { 
    MOCK_PHOTOS, 
    MOCK_RESPONSES,
    MOCK_DOWNLOADS,
    MOCK_DATES 
} from '../../tests/constants/testData';

jest.mock('axios');
jest.mock('../../utils');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedDownloadImage = downloadImage as jest.MockedFunction<typeof downloadImage>;

describe('Rover Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.DOMAIN = 'localhost';
        process.env.PORT = '3000';
        
        (buildImageUrl as jest.Mock).mockImplementation(
            (rover, date, camera, id, originalImgSrc) => 
                `http://localhost:3000/api/v1/file/image/${rover}/${date}/${camera}/${id}?img_src=${originalImgSrc}`
        );
    });

    describe('getRoverPhotos', () => {
        it('should fetch rover photos successfully', async () => {
            const mockResponse = {
                ...MOCK_RESPONSES.SUCCESS_RESPONSE,
                data: MOCK_PHOTOS.PHOTOS_RESPONSE,
                config: { url: 'test-url' }
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await getRoverPhotos(
                MOCK_DOWNLOADS.ROVER_NAME,
                '1',
                MOCK_DATES.VALID_DATE
            );

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${NASA_API.BASE_URL}/rovers/${MOCK_DOWNLOADS.ROVER_NAME}/photos?page=1&api_key=${NASA_API.API_KEY}&earth_date=${MOCK_DATES.VALID_DATE}`
            );
            expect(result).toEqual(MOCK_PHOTOS.FORMATTED_PHOTOS);
        });
    });
});