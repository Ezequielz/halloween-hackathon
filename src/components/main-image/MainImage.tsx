/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useImageStore } from "@/store";
import { RndText } from "../ui/rnds/RndText";
import { RndStickers } from "../ui/rnds/RndStickers";
import { useEffect } from "react";
import { CustomImage } from "../cloudinary/CustomImage";

interface Props {
    url: string
}
export const MainImage = ({ url }: Props) => {

    const { imageDimensions, underlay ,
        setUrlDefaultImage
    } = useImageStore(store => store);

    useEffect(() => {
        setUrlDefaultImage(url)
    }, [])
    
    return (
        <div className="w-3/5 flex justify-center">
            <div>

                <picture
                    className="block  h-screen"
                >

                    <CustomImage
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

                <RndText />

                <RndStickers />

            </div>

        </div>
    )
}
