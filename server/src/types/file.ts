export type FileOperationResult<T> = {
    success: boolean;
    data?: T;
    error?: string;
};