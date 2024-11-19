import fs from 'fs';
import { parse, isValid, format } from 'date-fns';
import { DATE_FORMATS, OUTPUT_DATE_FORMAT } from '../constants';
import fsPromises from 'fs/promises';
import path from 'path';
import { logger } from '../middlewares/logger';
import { createError } from '../middlewares/errorHandler';
import { ErrorCodes } from '../types/error';

export const parseDatesFromFile = async (filePath: string): Promise<string[]> => {
    try {
        if (!filePath) {
            throw createError('File path is required', 400, ErrorCodes.VALIDATION_ERROR);
        }
        const content = await fs.promises.readFile(filePath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim());
        
        const validDates = lines.map(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return null;
            
            for (const formatString of DATE_FORMATS) {
                try {
                    const date = parse(trimmedLine, formatString, new Date());
                    if (isValid(date)) {
                        return format(date, OUTPUT_DATE_FORMAT);
                    }
                } catch (error) {
                    continue;
                }
            }
            return null;
        }).filter((date): date is string => date !== null);

        if (validDates.length === 0) {
            logger.warn(`No valid dates found in file: ${filePath}`);
        }

        return validDates;
    } catch (error) {
        if (error instanceof Error && error.message.includes('ENOENT')) {
            throw createError(
                `File not found: ${filePath}`,
                404,
                ErrorCodes.FILE_NOT_FOUND
            );
        }
        throw createError(
            `Error parsing dates from file: ${error instanceof Error ? error.message : 'Unknown error'}`,
            500,
            ErrorCodes.INTERNAL_ERROR
        );
    }
};

export async function ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
        if (!dirPath) {
            throw createError('Directory path is required', 400, ErrorCodes.VALIDATION_ERROR);
        }
        await fsPromises.access(dirPath);
    } catch (error) {
        if (error instanceof Error && error.message.includes('ENOENT')) {
            try {
                await fsPromises.mkdir(dirPath, { recursive: true });
                logger.info(`Created directory: ${dirPath}`);
            } catch (mkdirError) {
                throw createError(
                    `Failed to create directory: ${mkdirError instanceof Error ? mkdirError.message : 'Unknown error'}`,
                    500,
                    ErrorCodes.INTERNAL_ERROR
                );
            }
        } else {
            throw createError(
                `Error accessing directory: ${error instanceof Error ? error.message : 'Unknown error'}`,
                500,
                ErrorCodes.INTERNAL_ERROR
            );
        }
    }
}


export async function fileExists(filePath: string): Promise<boolean> {
    try {
        if (!filePath) {
            throw createError('File path is required', 400, ErrorCodes.VALIDATION_ERROR);
        }
        await fsPromises.access(filePath);
        return true;
    } catch (error) {
        if (error instanceof Error && error.message.includes('ENOENT')) {
            return false;
        }
        throw createError(
            `Error checking file existence: ${error instanceof Error ? error.message : 'Unknown error'}`,
            500,
            ErrorCodes.INTERNAL_ERROR
        );
    }
}

export async function deleteFile(filePath: string): Promise<void> {
    try {
        await fsPromises.unlink(filePath);
        logger.info(`File deleted successfully: ${filePath}`);
    } catch (error) {
        if (error instanceof Error && error.message.includes('ENOENT')) {
            logger.warn(`File not found for deletion: ${filePath}`);
            return;
        }
        throw error;
    }
}

export async function cleanupOldFiles(
    directory: string, 
    maxAgeHours: number
): Promise<void> {
    const files = await fsPromises.readdir(directory);
    const now = Date.now();
    
    const deletePromises = files.map(async (file) => {
        const filePath = path.join(directory, file);
        const stats = await fsPromises.stat(filePath);
        const ageHours = (now - stats.mtime.getTime()) / (1000 * 60 * 60);
        
        if (ageHours > maxAgeHours) {
            await deleteFile(filePath);
        }
    });
    
    await Promise.all(deletePromises);
}

