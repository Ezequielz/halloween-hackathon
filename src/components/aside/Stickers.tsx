'use client';

import { useImageStore } from "@/store";
import type { Sticker } from "@/interfaces";
import { useImageEditor } from "@/hooks";
import { CustomImage } from "../cloudinary/CustomImage";
import { Widget } from "../cloudinary/Widget";

interface Props {
    stickers: Sticker[]
}
export const Stickers = ({ stickers }: Props) => {

    const { setAllSelectedStickers, allSelectedStickers, removeAllStickers } = useImageStore();
    const { handleSelectSticker } = useImageEditor();

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
        <section className="p-4">

            <header className="flex justify-between items-center my-3">
                <div className="flex justify-center items-center gap-2">
                    <h2 className="text-2xl ">Stickers</h2>

                    <Widget
                        buttonText='+'
                        className="border-2 border-blue-600 bg-blue-500/20 px-2 py-0.5 rounded-full hover:bg-blue-500 cursor-pointer"
                        formats={['png']}
                        infoHeading="Arrastra o sube un sticker"
                        asset="sticker"
                    />

                </div>
                <span
                    onClick={removeAllStickers}
                    className="border-2 border-red-600 bg-red-500/20 px-2 py-0.5 rounded-full hover:bg-red-500 cursor-pointer"
                >
                    Remover stickers
                </span>

            </header>

            <div className="grid grid-cols-5">

                {stickers.map((sticker) => (
                    <button
                        onClick={() => addSticker(sticker.name)}
                        key={sticker.id}
                    >
                        <CustomImage
                            width="50"
                            height="50"
                            src={sticker.publicId}
                            alt="Sticker"
                            unoptimized
                        />
                    </button>
                ))
                }
            </div>

        </section>

    )
}
