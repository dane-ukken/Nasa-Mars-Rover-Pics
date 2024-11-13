import { RoverApiResponse, PhotosApiResponse } from '../../types/rover';

export const TEST_CONFIG = {
    API_KEY: 'test_api_key',
    BASE_URL: 'https://api.test.com/v1',
    PORT: '3000',
};

export const MOCK_DATES = {
    VALID_DATE: '2023-01-15',
    INVALID_DATE: '2023-13-45',
    FORMATTED_DATE: '2023-01-15',
    DATE_VARIATIONS: [
        '2023-01-15',
        '01/15/23',
        'Jan-15-2023'
    ],
    INVALID_DATES: [
        'invalid-date',
        '2023-13-45',
        'not-a-date'
    ]
};

export const MOCK_FILES = {
    VALID_DATES_CONTENT: `
        2023-01-15
        01/15/23
        Jan-15-2023
    `.trim(),
    INVALID_DATES_CONTENT: `
        invalid-date
        2023-13-45
        not-a-date
    `.trim(),
    MIXED_DATES_CONTENT: `
        2023-01-15
        invalid-date
        2023-13-45
        01/15/23
    `.trim(),
    WHITESPACE_CONTENT: `
        2023-01-15

        01/15/23
        
        15-Jan-2023
    `.trim()
};

export const MOCK_ROVERS = {
    SINGLE_ROVER: {
        id: 1,
        name: 'Curiosity',
        landing_date: '2012-08-06',
        launch_date: '2011-11-26',
        status: 'active',
        max_sol: 0,
        max_date: '',
        total_photos: 0,
        cameras: []
    },
    ROVERS_RESPONSE: {
        rovers: [
            {
                id: 1,
                name: 'Curiosity',
                landing_date: '2012-08-06',
                launch_date: '2011-11-26',
                status: 'active',
                max_sol: 0,
                max_date: '',
                total_photos: 0,
                cameras: []
            }
        ]
    } as RoverApiResponse
};

export const MOCK_PHOTOS = {
    PHOTOS_RESPONSE: {
        photos: [
            {
                id: 1,
                img_src: 'http://example.com/photo1.jpg',
                camera: {
                    name: 'FHAZ',
                    full_name: 'Front Hazard Avoidance Camera'
                }
            },
            {
                id: 2,
                img_src: 'http://example.com/photo2.jpg',
                camera: {
                    name: 'NAVCAM',
                    full_name: 'Navigation Camera'
                }
            }
        ]
    },
    FORMATTED_PHOTOS: [
        {
            id: 1,
            img_src: 'http://localhost:3000/api/v1/file/image/curiosity/2023-01-15/FHAZ/1?img_src=http://example.com/photo1.jpg',
            camera: 'FHAZ',
            cameraFullName: 'Front Hazard Avoidance Camera'
        },
        {
            id: 2,
            img_src: 'http://localhost:3000/api/v1/file/image/curiosity/2023-01-15/NAVCAM/2?img_src=http://example.com/photo2.jpg',
            camera: 'NAVCAM',
            cameraFullName: 'Navigation Camera'
        }
    ]
};

export const MOCK_DOWNLOADS = {
    ROVER_NAME: 'curiosity',
    IMAGE_URL: 'http://example.com/photo1.jpg',
    CAMERA_NAME: 'FHAZ',
    PHOTO_ID: 1,
    SAVED_PATH: '/path/to/saved/image.jpg'
};

export const MOCK_RESPONSES = {
    SUCCESS_RESPONSE: {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
    },
    ERROR_RESPONSE: {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: {}
    }
};