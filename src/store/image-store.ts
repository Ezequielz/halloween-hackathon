


import { Background, Overlay, Sticker, Text, Underlay } from '@/interfaces';
import { create } from 'zustand';

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
    text: Text

    setOverlays : (overlays: Overlay[]) => void
    setUnderlay: (underlay: Underlay) => void
    setAllSelectedStickers: (allSelectedStickers: Sticker[]) => void
    setStickers: (stickers: Sticker[]) => void
    setBackgrounds: (backgrounds: Background[]) => void
    setImgCreated: (imgCreated: string) => void
    setImageDimensions: (imageDimensions: { width: number, height: number }) => void
    setActualWidthShownInFrontend: (actualWidthShownInFrontend: number) => void
    setActualHeightShownInFrontend: (actualHeightShownInFrontend: number) => void
    setSelectedStickerId: (selectedStickerId: string | null) => void
    setSelectedSticker: (selectedSticker: Sticker | null) => void
    setText: (text: Text) => void
}


export const useSkinsStore = create<State>()((set) => ({




}));