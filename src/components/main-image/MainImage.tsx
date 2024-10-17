'use client'


import { CldImage } from "next-cloudinary";
import { DraggableText } from "../DragableText";
import { Rnd } from "react-rnd";
import { useImageStore } from "@/store";
import { useImageEditor } from "@/hooks";

interface Props {
    url: string
}
export const MainImage = ({url}:Props) => {

    const { imageDimensions, underlay, text, allSelectedStickers, selectedStickerId } = useImageStore(store => store);

     const { onStickerUpdate } = useImageEditor(url)

  
    return (
        <div className="w-3/5 flex justify-center">
            <div>

                <picture
                    className="block  h-screen"
                >

                    <CldImage
                        width={imageDimensions.width}
                        height={imageDimensions.height}
                        removeBackground
                        id='main-image'
                        sizes="100vw"

                        // crop="fill"
                        src={url}
                        alt="Main Image"
                        underlays={underlay}
                        // fillBackground
                        className={`h-full w-auto `} // Ajustar a pantalla completa manteniendo proporciones
                    />
                </picture>
                {
                    text && (

                        <DraggableText />
                    )
                }
                {allSelectedStickers.map((sticker) => (
                    <Rnd
                        key={sticker.id}
                        size={{ width: sticker.size.width, height: sticker.size.height }}
                        position={{ x: sticker.position.x, y: sticker.position.y }}

                        onDragStop={(e, d) => {
                            onStickerUpdate(sticker.id, d.x, d.y);
                            // handleSelectSticker(sticker.id); // Seleccionar sticker al mover
                        }}
                        // onResizeStop={(e, direction, ref, delta, position) => {
                        //   handleSelectSticker(sticker.id);
                        //   onStickerUpdate(sticker.id, position.x, position.y, ref.offsetWidth, ref.offsetHeight, direction);
                        // }}
                        // onClick={() => handleSelectSticker(sticker.id)} // Seleccionar sticker al hacer clic

                    >
                        <CldImage
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
                ))}
            </div>

        </div>
    )
}
