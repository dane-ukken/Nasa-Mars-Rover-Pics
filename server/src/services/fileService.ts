import fs from 'fs';
import { parse, isValid, format } from 'date-fns';
import { DATE_FORMATS, OUTPUT_DATE_FORMAT } from '../constants';

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
