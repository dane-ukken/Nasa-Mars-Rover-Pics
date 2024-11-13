import { Request, Response } from 'express';
import { getAllRovers, getRoverImageList } from '../roverController';
import { getRovers, getRoverPhotos } from '../../services/nasaService';

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
});