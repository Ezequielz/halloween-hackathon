/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TextImage {
    id?: string;
    content: string;
    position: PositionTextImage;
    fontFamily: string;
    color: string;
    size: number;
    fontWeight: string;
    [key: string]: any; 
}


export type PositionTextImage = {
    x: number;
    y: number;
    angle: number;
}
