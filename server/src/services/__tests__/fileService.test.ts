import { parseDatesFromFile } from '../fileService';
import fs from 'fs';

jest.mock('fs', () => ({        
    promises: {
        readFile: jest.fn(),
    },
}));

describe('parseDatesFromFile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should parse valid dates from file', async () => {
        const mockFileContent = `
            2023-01-15
            01/15/23
            Jan-15-2023
        `.trim();

        (fs.promises.readFile as jest.Mock).mockResolvedValue(mockFileContent);

        const result = await parseDatesFromFile('test.txt');

        expect(result).toHaveLength(3);
        expect(result).toEqual([
            '2023-01-15',
            '2023-01-15',
            '2023-01-15'
        ]);
        expect(fs.promises.readFile).toHaveBeenCalledWith('test.txt', 'utf-8');
    });

    it('should handle empty file', async () => {
        (fs.promises.readFile as jest.Mock).mockResolvedValue('');

        const result = await parseDatesFromFile('empty.txt');

        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
    });

    it('should filter out invalid dates', async () => {
        const mockFileContent = `
            2023-01-15
            invalid-date
            2023-13-45
            01/15/23
        `.trim();

        (fs.promises.readFile as jest.Mock).mockResolvedValue(mockFileContent);

        const result = await parseDatesFromFile('test.txt');

        expect(result).toHaveLength(2);
        expect(result).toEqual([
            '2023-01-15',
            '2023-01-15'
        ]);
    });

    it('should handle file with only invalid dates', async () => {
        const mockFileContent = `
            invalid-date
            2023-13-45
            not-a-date
        `.trim();

        (fs.promises.readFile as jest.Mock).mockResolvedValue(mockFileContent);

        const result = await parseDatesFromFile('test.txt');

        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
    });

    it('should handle file read errors', async () => {
        (fs.promises.readFile as jest.Mock).mockRejectedValue(new Error('File read error'));

        await expect(parseDatesFromFile('nonexistent.txt'))
            .rejects
            .toThrow('File read error');
    });

    it('should handle file with whitespace lines', async () => {
        const mockFileContent = `
            2023-01-15

            01/15/23
            
            15-Jan-2023
        `.trim();

        (fs.promises.readFile as jest.Mock).mockResolvedValue(mockFileContent);

        const result = await parseDatesFromFile('test.txt');

        expect(result).toHaveLength(3);
        expect(result).toEqual([
            '2023-01-15',
            '2023-01-15',
            '2023-01-15'
        ]);
    });
});