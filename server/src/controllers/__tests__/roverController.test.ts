import { Request, Response } from 'express';
import { getAllRovers, getRoverImageList, saveRoverImage } from '../roverController';
import { getRovers, getRoverPhotos, downloadImageFromNasa } from '../../services/nasaService';

jest.mock('../../services/nasaService');

describe('NASA Controllers', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        mockResponse = {
            json: jsonMock,
            status: jest.fn().mockReturnThis()
        };
        mockRequest = {};
        jest.clearAllMocks();
    });

    describe('getAllRovers', () => {
        it('should return rover data successfully', async () => {
            const mockRoverData = [
                { name: 'Curiosity' },
                { name: 'Perseverance' }
            ];

            (getRovers as jest.Mock).mockResolvedValue(mockRoverData);

            await getAllRovers(mockResponse as Response);

            expect(getRovers).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith(mockRoverData);
        });

    });

    describe('getRoverImageList', () => {
        it('should return photo list successfully', async () => {
            const mockPhotos = [
                { id: 1, img_src: 'photo1.jpg' }
            ];

            mockRequest.query = {
                rover: 'curiosity',
                page: '1',
                date: '2024-01-01'
            };

            (getRoverPhotos as jest.Mock).mockResolvedValue(mockPhotos);

            await getRoverImageList(
                mockRequest as Request, 
                mockResponse as Response
            );

            expect(getRoverPhotos).toHaveBeenCalledWith(
                'curiosity',
                '1',
                '2024-01-01'
            );

            expect(jsonMock).toHaveBeenCalledWith({
                rover: 'curiosity',
                date: '2024-01-01',
                photos: mockPhotos
            });
        });

        it('should handle missing query parameters', async () => {
            mockRequest.query = {};

            await getRoverImageList(
                mockRequest as Request, 
                mockResponse as Response
            );

            expect(getRoverPhotos).toHaveBeenCalledWith(
                undefined,
                undefined,
                undefined
            );
        });


    });

    describe('saveRoverImage', () => {
        it('should save image successfully', async () => {
            const mockBody = {
                imageUrl: 'http://example.com/photo.jpg',
                rover: 'curiosity',
                date: '2024-01-01',
                camera: 'FHAZ',
                id: '12345'
            };

            mockRequest.body = mockBody;

            const mockSavedPath = '/path/to/saved/image.jpg';
            (downloadImageFromNasa as jest.Mock)
                .mockResolvedValue(mockSavedPath);

            await saveRoverImage(
                mockRequest as Request, 
                mockResponse as Response
            );

            expect(downloadImageFromNasa).toHaveBeenCalledWith(
                mockBody.imageUrl,
                mockBody.rover,
                mockBody.date,
                mockBody.camera,
                mockBody.id
            );

            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                path: mockSavedPath
            });
        });

        it('should handle missing required parameters', async () => {
            mockRequest.body = {
                imageUrl: 'http://example.com/photo.jpg'
            };

            await saveRoverImage(
                mockRequest as Request, 
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'Missing required parameters'
            });
        });

    });
});