import { Response } from 'express';
import { FileOperationResult } from '../types/file';

export const handleFileOperation = async <T>(
    res: Response,
    operation: () => Promise<T>
): Promise<FileOperationResult<T>> => {
    try {
        const result = await operation();
        
        if (Array.isArray(result) && result.length === 0) {
            return {
                success: false,
                error: 'No valid dates found in file'
            };
        }

        return {
            success: true,
            data: result
        };
    } catch (error) {
        if (error instanceof Error && error.message.includes('ENOENT')) {
            return { 
                success: false, 
                error: 'File not found' 
            };
        }
        throw error;
    }
};