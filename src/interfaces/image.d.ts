export interface Overlay {
  publicId?: string;
  position?: {
    angle?: number;
    x?: number;
    y?: number;
    gravity?: string;
  };
  effects?: {
    crop?: string;
    width?: number;
    height?: number;
    shear?: string,
    opacity?: number
  }[];

}

export interface Underlay {
  publicId: string,
  effects: [{ width: number, height: number }],
};

export interface Background {
  id: string;
  publicId: string;
}