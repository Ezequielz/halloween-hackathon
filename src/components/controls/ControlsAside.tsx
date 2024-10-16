/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useImageEditor } from '@/hooks';
import { TextOverlayMenu } from '../TextOverlayMenu';

interface Props {
    url: string
}

export const ControlsAside = ({ url }: Props) => {

    const { selectedSticker, imgCreated, onStickerUpdate, setSelectedSticker } = useImageEditor(url);

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value);


        if (selectedSticker) {
            // Actualiza el sticker con el nuevo tamaño
            onStickerUpdate(selectedSticker.id, undefined, undefined, newSize, newSize);

            // Actualiza el estado local para reflejar los cambios
            setSelectedSticker((prev) =>
                prev ? { ...prev, size: { width: newSize, height: newSize } } : prev
            );
        }
    };

    const handleAngleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAngle = event.target.value;
        if (selectedSticker) {
            // Actualiza el sticker con el nuevo ángulo
            console.log(newAngle)
            onStickerUpdate(selectedSticker.id, undefined, undefined, undefined, undefined, newAngle);

            // Actualiza el estado local para reflejar el nuevo ángulo
            setSelectedSticker((prev) =>
                prev ? { ...prev, position: { ...prev.position, angle: +newAngle } } : prev
            );
        }


    };



    return (
        <aside className="w-1/5 bg-slate-900 p-4">


            <h3>Agrega un texto</h3>
            <TextOverlayMenu url={url} />
            <hr className='border-2 border-gray-500 w-full my-5' />
            {selectedSticker && (
                <>
                    <h2 className="mb-4">Sticker {selectedSticker?.name}</h2>
                    <div>
                        <label htmlFor="size-slider">Size:</label>
                        <input
                            id="size"
                            type="range"
                            min="50"
                            max="300"
                            value={selectedSticker.size.width} // Asegúrate de que este valor se actualice
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



            <div>
                <a href={imgCreated} target='_blank'>
                    Imagen generada
                </a>
            </div>

        </aside>
    )
}
