import { Stream } from "stream";

export function isReadableStream(value: unknown): value is NodeJS.ReadableStream {
    return value instanceof Stream && typeof (value as any).pipe === 'function';
}