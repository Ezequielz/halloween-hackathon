'use client'

import { Rnd } from 'react-rnd';
import { useImageStore } from '@/store';
import { useImageEditor } from '@/hooks';
import { CustomImage } from '@/components/cloudinary/CustomImage';

export const RndStickers = () => {

    const { allSelectedStickers, selectedStickerId, setTextSelected} = useImageStore(store => store);
    const { onStickerUpdate, handleSelectSticker } = useImageEditor();


    const handleDragStart = (stickerId: string) => {
        handleSelectSticker(stickerId);
        setTextSelected(false)
    };

    return (
        <>
            {
                allSelectedStickers.map((sticker) => (
                    <Rnd

                        key={sticker.id}
                        size={{ width: sticker.size.width, height: sticker.size.height }}
                        position={{ x: sticker.position.x, y: sticker.position.y }}
                        onDragStart={() => handleDragStart(sticker.id)}
                        onDragStop={(e, d) => onStickerUpdate(sticker.id, d.x, d.y)}
                        // onResizeStop={(e, direction, ref, delta, position) => {

                        //     onStickerUpdate(sticker.id, position.x, position.y, ref.offsetWidth, ref.offsetHeight, direction);
                        // }}
                        // className='border-2 border-red-500'
                        // onMouseDown={() => setSelectedStickerId(null)}

                        // style={{
                        //     borderWidth: selectedStickerId === sticker.id ? 2 : 0,
                        //     borderColor: 'white',

                        //     position: 'relative'
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
                            // crop="fit"
                            style={{
                                filter: selectedStickerId === sticker.id
                                    ? 'drop-shadow(0 0 0.75rem red)'
                                    : 'none',
                                transform: `rotate(${sticker.position.angle}deg)`,
                                transition: 'transform 0.2s ease',
                                margin: 'auto 0',


                            }}

                        />
                        {/* <span
                            onClick={() => removeSticker(sticker.id)}
                            className='absolute top-2 right-2 bg-red-500 opacity-75 px-2 py-0.5 rounded-full text-lg cursor-pointer hover:opacity-100'>
                            X
                        </span> */}

                    </Rnd>
                ))
            }
        </>
    )
}
