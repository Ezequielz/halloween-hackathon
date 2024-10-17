'use client'

import { Rnd } from 'react-rnd';
import { useImageStore } from '@/store';
import { useImageEditor } from '@/hooks';
import { CustomImage } from '@/components/cloudinary/CustomImage';

export const RndStickers = () => {

    const { allSelectedStickers, selectedStickerId } = useImageStore(store => store);
    const { onStickerUpdate, handleSelectSticker } = useImageEditor();

    return (
        <>
            {
                allSelectedStickers.map((sticker) => (
                    <Rnd
                        key={sticker.id}
                        size={{ width: sticker.size.width, height: sticker.size.height }}
                        position={{ x: sticker.position.x, y: sticker.position.y }}

                        onDragStop={(e, d) => {
                            onStickerUpdate(sticker.id, d.x, d.y);
                            handleSelectSticker(sticker.id); // Seleccionar sticker al mover
                        }}
                    // onResizeStop={(e, direction, ref, delta, position) => {
                    //   handleSelectSticker(sticker.id);
                    //   onStickerUpdate(sticker.id, position.x, position.y, ref.offsetWidth, ref.offsetHeight, direction);
                    // }}
                    // onClick={() => handleSelectSticker(sticker.id)} // Seleccionar sticker al hacer clic

                    >
                        <CustomImage
                            src={sticker.publicId}
                            alt="Sticker"
                            height={sticker.size.height}
                            width={sticker.size.width}
                            // angle={sticker.position.angle}
                            unoptimized
                            crop="fit"
                            style={{
                                filter: selectedStickerId === sticker.id
                                    ? 'drop-shadow(0 0 0.75rem red)' // Sombra roja
                                    : 'none', // Sin sombra
                                transform: `rotate(${sticker.position.angle}deg)`, // Aplica la rotación aquí
                                transition: 'transform 0.2s ease' // Transición suave para la rotación
                            }}

                        />

                    </Rnd>
                ))
            }
        </>
    )
}
