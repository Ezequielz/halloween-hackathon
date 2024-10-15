/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Text {
    id?: string;
    content: string;
    position: PositionText;
    fontFamily: string;
    color: string;
    size: number;
    fontWeight: string;
    [key: string]: any; 
}


export type PositionText = {
    x: number;
    y: number;
    angle: number;
}
