'use client';

import { CldImage } from "next-cloudinary";
import { useImageStore } from "@/store";
import type { Sticker } from "@/interfaces";
import { useImageEditor } from "@/hooks";

interface Props {
    url: string;
    stickers: Sticker[]
}
export const Stickers = ({ stickers, url }: Props) => {

    const { setAllSelectedStickers, allSelectedStickers} = useImageStore();
    const { handleSelectSticker } = useImageEditor(url);

    const addSticker = (name: string) => {

        const sticker = stickers.find((sticker) => sticker.name === name)
        if (!sticker) return;

        const newId = Math.random().toString(36).substring(7);

        const newSticker = {
            ...sticker,
            id: newId,
        };


        const newAllStickers: Sticker[] = [
            ...allSelectedStickers,
            newSticker
        ]


        setAllSelectedStickers(newAllStickers);
        handleSelectSticker(newSticker.id);
    };

  
    return (
        <section>

            <h2 className="mb-4">Stickers</h2>
            {stickers.map((sticker) => (
                <button
                    onClick={() => addSticker(sticker.name)}
                    key={sticker.id}
                >
                    <CldImage
                        width="100"
                        height="100"
                        src={sticker.publicId}
                        alt="Sticker"
                        unoptimized
                    />
                </button>
            ))
            }
        </section>

    )
}
