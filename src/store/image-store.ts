


import { create } from 'zustand';
import type { Background, Overlay, Sticker, TextImage, Underlay } from '@/interfaces';

interface State {

    overlays: Overlay[]
    underlay: Underlay[]
    allSelectedStickers: Sticker[]
    stickers: Sticker[]
    backgrounds: Background[]
    imgCreated: string
    imageDimensions: { width: number, height: number }
    actualWidthShownInFrontend: number
    actualHeightShownInFrontend: number
    selectedStickerId: string | null
    selectedSticker: Sticker | null
    text: TextImage

    setOverlays: (overlays: Overlay[]) => void
    setUnderlay: (underlay: Underlay[]) => void
    setAllSelectedStickers: (allSelectedStickers: Sticker[]) => void
    setStickers: (stickers: Sticker[]) => void
    setBackgrounds: (backgrounds: Background[]) => void
    setImgCreated: (imgCreated: string) => void
    setImageDimensions: (imageDimensions: { width: number, height: number }) => void
    setActualWidthShownInFrontend: (actualWidthShownInFrontend: number) => void
    setActualHeightShownInFrontend: (actualHeightShownInFrontend: number) => void
    setSelectedStickerId: (selectedStickerId: string | null) => void
    setSelectedSticker: (selectedSticker: Sticker | null) => void
    setText: (text: TextImage) => void
}
const initialText: TextImage = {
    content: '',
    position: { x: 10, y: 10, angle: 0 },
    fontFamily: 'Arial',
    color: '#e40d0d',
    fontWeight: 'bold',
    size: 24,
};
const initialUnderlay: Underlay[] = [{
    publicId: 'halloween-images/pqpbmcpt71993avpnglm',
    effects: [{ width: 1600, height: 900 }],
}];


export const useImageStore = create<State>()((set) => ({

    overlays: [],
    underlay: initialUnderlay,
    allSelectedStickers: [],
    stickers: [],
    backgrounds: [],
    imgCreated: '',
    imageDimensions: { width: 0, height: 0 },
    actualWidthShownInFrontend: 0,
    actualHeightShownInFrontend: 0,
    selectedStickerId: null,
    selectedSticker: null,
    text: initialText,


    setOverlays: (overlays) => set({ overlays }),
    setUnderlay: (underlay) => set({ underlay }),
    setAllSelectedStickers: (allSelectedStickers) => set({ allSelectedStickers }),
    setStickers: (stickers) => set({ stickers }),
    setBackgrounds: (backgrounds) => set({ backgrounds }),
    setImgCreated: (imgCreated) => set({ imgCreated }),
    setImageDimensions: (imageDimensions) => set({ imageDimensions }),
    setActualWidthShownInFrontend: (actualWidthShownInFrontend) => set({ actualWidthShownInFrontend }),
    setActualHeightShownInFrontend: (actualHeightShownInFrontend) => set({ actualHeightShownInFrontend }),
    setSelectedStickerId: (selectedStickerId) => set({ selectedStickerId }),
    setSelectedSticker: (selectedSticker) => set({ selectedSticker }),
    setText: (text) => set({ text })



}));