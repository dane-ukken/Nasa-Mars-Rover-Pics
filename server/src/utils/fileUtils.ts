import { Stream } from "stream";

export function isReadableStream(value: unknown): value is NodeJS.ReadableStream {
    return value instanceof Stream && typeof (value as any).pipe === 'function';
}

export function buildImageUrl(
    rover: string,
    date: string,
    camera: string,
    id: number,
    originalImgSrc: string
): string {
    return `http://${process.env.DOMAIN}:${process.env.PORT}/api/v1/file/image/${rover}/${date}/${camera}/${id}?img_src=${originalImgSrc}`;
}
