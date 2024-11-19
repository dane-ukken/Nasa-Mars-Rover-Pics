export type CustomError = Error & {
    status?: number;
    code?: string;
}

export const ErrorCodes = {
    FILE_NOT_FOUND: 'FILE_NOT_FOUND',
    INVALID_REQUEST: 'INVALID_REQUEST',
    NASA_API_ERROR: 'NASA_API_ERROR',
    DOWNLOAD_ERROR: 'DOWNLOAD_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    INTERNAL_ERROR: 'INTERNAL_ERROR'
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];