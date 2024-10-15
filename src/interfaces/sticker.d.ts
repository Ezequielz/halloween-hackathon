export interface Sticker {
    id: string;
    name: string;
    publicId: string;
    position: PositionSticker;
    size: SizeSticker;
  }
  
  export type PositionSticker = {
    x: number;
    y: number;
    angle: number;
  };
  
  export type SizeSticker = {
    width: number;
    height: number;
  };


  