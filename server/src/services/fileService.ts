import fs from 'fs';
import { parse, isValid, format } from 'date-fns';
import { DATE_FORMATS, OUTPUT_DATE_FORMAT } from '../constants';
import fsPromises from 'fs/promises';
import path from 'path';
import { createError } from '../middlewares/errorHandler';
import { logger } from '../middlewares/logger';

export const parseDatesFromFile = async (filePath: string): Promise<string[]> => {
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
    return validDates;
};


export async function ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
        await fsPromises.access(dirPath);
    } catch {
        await fsPromises.mkdir(dirPath, { recursive: true });
    }
}

export async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fsPromises.access(filePath);
        return true;
    } catch {
        return false;
    }
}

export async function deleteFile(filePath: string): Promise<void> {
    try {
        await fsPromises.unlink(filePath);
        logger.info(`File deleted successfully: ${filePath}`);
    } catch (error: unknown) {
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
        const stats = await fsPromises .stat(filePath);
        const ageHours = (now - stats.mtime.getTime()) / (1000 * 60 * 60);
        
        if (ageHours > maxAgeHours) {
            await deleteFile(filePath);
        }
    });
    
    await Promise.all(deletePromises);
}

