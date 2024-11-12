import path from 'path';

export const DOWNLOAD_PATH = {
    BASE: path.join(process.cwd(), 'public', 'downloads'),
    getImagePath: (roverName: string, earthDate: string, camera: string) => 
        path.join(process.cwd(), 'public', 'downloads', roverName, earthDate, camera)
};

export const FILE_PATH = path.join(process.cwd(), 'public', 'file.txt') 