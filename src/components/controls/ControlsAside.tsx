/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { TextOverlayMenu } from './TextOverlayMenu';
import { useImageStore } from '@/store';
import { useImageEditor } from '@/hooks';

export const ControlsAside = () => {

    const { selectedSticker, imgCreated, setSelectedSticker } = useImageStore(store => store)

    const { onStickerUpdate } = useImageEditor()

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value);


        if (selectedSticker) {

            onStickerUpdate(selectedSticker.id, undefined, undefined, newSize, newSize);

            setSelectedSticker({ ...selectedSticker, size: { width: newSize, height: newSize } });
        }
    };

    const handleAngleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAngle = event.target.value;
        if (selectedSticker) {

            onStickerUpdate(selectedSticker.id, undefined, undefined, undefined, undefined, newAngle);

            setSelectedSticker({ ...selectedSticker, position: { ...selectedSticker.position, angle: +newAngle } });
        }


    };


    return (
        <aside className="w-1/5 bg-slate-900 p-4">


            <h3>Agrega un texto</h3>
            <TextOverlayMenu />
            <hr className='border-2 border-gray-500 w-full my-5' />
            {selectedSticker && (
                <>
                    <h2 className="mb-4">Sticker</h2>
                    <div>
                        <label htmlFor="size-slider">Size:</label>
                        <input
                            id="size"
                            type="range"
                            min="50"
                            max="300"
                            value={selectedSticker.size.width}
                            onChange={handleSizeChange}
                        />

                        <span>{((selectedSticker.size.width / 200) * 100).toFixed(0)}%</span> {/* Mostrar porcentaje */}
                    </div>
                    <div>
                        <label htmlFor="angle-slider">Angle:</label>
                        <input
                            type="range"
                            id="angle-slider"
                            min="0"
                            max="360"
                            value={selectedSticker.position.angle}
                            onChange={handleAngleChange}
                        />
                        <span>{(selectedSticker.position.angle).toFixed(0)}º</span> {/* Mostrar porcentaje */}
                    </div>
                </>
            )}

            {
                selectedSticker && (

                    <hr className='border-2 border-gray-500 w-full my-5' />
                )
            }

            <a
                className="px-4 py-2 group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white"
                href={imgCreated}
                target='_blank'>
                Ver imagen terminada
                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </a>

            {/* <button class="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
    Hover me!
    
  </button> */}


        </aside>
    )
}
