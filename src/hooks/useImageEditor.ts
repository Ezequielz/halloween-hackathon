/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getCldImageUrl } from 'next-cloudinary';
import type { Background, Overlay, Sticker, Text } from '@/interfaces';

const initialText: Text = {
    content: '',
    position: { x: 0, y: 0, angle: 0 },
    fontFamily: 'Arial',
    color: '#000000',
    fontWeight: 'bold',
    size: 24,
};

const initialUnderlay = [{
    publicId: 'halloween-images/pqpbmcpt71993avpnglm',
    effects: [{ width: 1600, height: 900 }],
}];

export const useImageEditor = (url: string) => {
    const [overlays, setOverlays] = useState<Overlay[]>([]);
    const [underlay, setUnderlay] = useState(initialUnderlay);
    const [allSelectedStickers, setAllSelectedStickers] = useState<Sticker[]>([]);
    const [stickers, setStickers] = useState<Sticker[]>([]);
    const [backgrounds, setBackgrounds] = useState<Background[]>([]);
    const [imgCreated, setImgCreated] = useState<string>('');
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [actualWidthShownInFrontend, setActualWidthShownInFrontend] = useState(0);
    const [actualHeightShownInFrontend, setActualHeightShownInFrontend] = useState(0);
    const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
    const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
    const [text, setText] = useState<Text>(initialText);


    const loadImageDimensions = (url: string) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
            const updateUnderlayDimension = [
                {
                    publicId: 'halloween-images/pqpbmcpt71993avpnglm',
                    effects: [{ width: img.width, height: img.height, crop: 'fill' }],

                }
            ]


            setUnderlay(updateUnderlayDimension)
        };


    };

  
    useEffect(() => {

        loadImageDimensions(url);
    }, [url]);

    useEffect(() => {
        const imgElement = document.getElementById('main-image'); // Usar un id en tu <CldImage>
        if (imgElement) {
            setActualWidthShownInFrontend(imgElement.offsetWidth);
            setActualHeightShownInFrontend(imgElement.offsetHeight);
        }
    }, [url, imageDimensions]);


  


    //TOOD reemplazarlos por DB
    useEffect(() => {
        setBackgrounds([
            { id: 'background-1', publicId: 'halloween-images/pqpbmcpt71993avpnglm' },
            { id: 'background-2', publicId: 'halloween-images/ip5deapchh5ofxiuavr9' },
        ]);
        setStickers([
            { id: 'sticker-1', name: 'fantasma', publicId: 'halloween-images/sgzgayuvjo5dl5ezwcc3', position: { x: 0, y: 0, angle: 0 }, size: { width: 200, height: 300 } },
            { id: 'sticker-2', name: 'calabaza', publicId: 'halloween-images/j6uvivifkmk5idazvpjo', position: { x: 0, y: 0, angle: 0 }, size: { width: 200, height: 300 } },
        ]);
    }, []);

    useEffect(() => {
        const updatedOverlays = allSelectedStickers.map(newOverlay);
        setOverlays(updatedOverlays);
        // handleSelectSticker(selectedStickerId ?? undefined);
    }, [allSelectedStickers]);

    useEffect(() => {
        const newUrl = getCldImageUrl({
            src: url,
            width: imageDimensions.width,
            height: imageDimensions.height,
            removeBackground: true,
            overlays: overlays.length > 0 ? overlays : undefined,
            underlays: underlay
        });

        setImgCreated(newUrl);
    }, [overlays, underlay]);

    useEffect(() => {
        if (!text.content) return; // Asegúrate de que el texto no esté vacío

        const textOverlay = {
            // publicId: 'text', // Public ID can be anything, since it's text overlay
            text: {
                color: text.color,
                fontFamily: text.fontFamily,
                fontSize: text.size,
                fontWeight: text.fontWeight,
                text: text.content,
            },
            position: {
                gravity: 'north_west',
                x: Math.round(text.position.x * (imageDimensions.width / actualWidthShownInFrontend)),
                y: Math.round(text.position.y * (imageDimensions.height / actualHeightShownInFrontend)),
                angle: text.position.angle,
            },
        };

        // Combina los overlays de stickers y texto
        const updatedOverlays = [
            ...allSelectedStickers.map((sticker) => newOverlay(sticker)),
            textOverlay,
        ];

        setOverlays(updatedOverlays);
    }, [text, allSelectedStickers]);

    const newOverlay = (sticker: Sticker) => {
        // Calcular factor de escala
        const scaleX = imageDimensions.width / actualWidthShownInFrontend;
        const scaleY = imageDimensions.height / actualHeightShownInFrontend;

        return {
            publicId: sticker.publicId,
            position: {
                x: Math.round(sticker.position.x * scaleX), // Escalar las posiciones
                y: Math.round(sticker.position.y * scaleY),
                gravity: 'north_west',
                angle: sticker.position.angle
            },
            effects: [
                {
                    crop: 'fit',
                    width: Math.round(sticker.size.width * scaleX), // Escalar también el tamaño
                    height: Math.round(sticker.size.height * scaleY),
                },
            ],
        };
    };
    const onStickerUpdate = (id: string,
        newX?: number,
        newY?: number,
        newWidth?: number,
        newHeight?: number,
        newAngle?: string,
    ) => {

        const stickerToUpdate = allSelectedStickers.find((sticker) => sticker.id === id)
        if (!stickerToUpdate) return;
        const updatedSticker: Sticker = {
            ...stickerToUpdate,
            position: {
                x: newX ? Math.round(newX) : stickerToUpdate.position.x,
                y: newY ? Math.round(newY) : stickerToUpdate.position.y,
                angle: newAngle ? +newAngle : stickerToUpdate.position.angle
            },
            size: {
                width: newWidth ? Math.round(newWidth) : stickerToUpdate.size.width,
                height: newHeight ? Math.round(newHeight) : stickerToUpdate.size.height,
            }
        }

        setAllSelectedStickers((prevStickers) =>
            prevStickers.map((sticker) =>
                sticker.id === id ? sticker = updatedSticker : sticker
            )
        );
    };

    return {
        allSelectedStickers,
        backgrounds,
        imageDimensions,
        imgCreated,
        overlays,
        selectedSticker,
        selectedStickerId,
        stickers,
        text,
        underlay,

        //Mehtods
        
        setText,
        onStickerUpdate,
        setActualHeightShownInFrontend,
        setActualWidthShownInFrontend,
        setAllSelectedStickers,
        setSelectedStickerId,
        setSelectedSticker,
        setImageDimensions,
        setUnderlay
    };
};
