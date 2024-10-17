'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { getCldImageUrl } from 'next-cloudinary';
import type { Sticker, Underlay } from '@/interfaces';
import { useImageStore } from '@/store';


export const useImageEditor = () => {
    const {
        urlDefaultImage,
        overlays,
        underlay,
        imageDimensions,
        allSelectedStickers,
        text,
        actualWidthShownInFrontend,
        actualHeightShownInFrontend,
        selectedStickerId,

        // METHODS
        setImageDimensions,
        setActualWidthShownInFrontend,
        setActualHeightShownInFrontend,
        setUnderlay,
        setOverlays,
        setImgCreated,
        setAllSelectedStickers,
        setSelectedSticker,
        setSelectedStickerId

    } = useImageStore(state => state)


    const loadImageDimensions = (url: string) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
            const updateUnderlayDimension: Underlay[] = [
                {
                    publicId: 'halloween-images/pqpbmcpt71993avpnglm',
                    effects: [{ width: +img.width, height: +img.height, crop: 'fill' }],

                }
            ]

       
            setUnderlay(updateUnderlayDimension)
        };


    };


    useEffect(() => {

        loadImageDimensions(urlDefaultImage);
    }, [urlDefaultImage]);

    useEffect(() => {
        const imgElement = document.getElementById('main-image');
        if (imgElement) {
            setActualWidthShownInFrontend(imgElement.offsetWidth);
            setActualHeightShownInFrontend(imgElement.offsetHeight);
        }
    }, [urlDefaultImage, imageDimensions]);


    useEffect(() => {
        const updatedOverlays = allSelectedStickers.map(newOverlay);
        setOverlays(updatedOverlays);
        handleSelectSticker(selectedStickerId ?? undefined);
    }, [allSelectedStickers]);

    useEffect(() => {

        const newUrl = getCldImageUrl({
            src: urlDefaultImage,
            width: imageDimensions.width,
            height: imageDimensions.height,
            removeBackground: true,
            overlays: overlays.length > 0 ? overlays : undefined,
            underlays: underlay
        });

        setImgCreated(newUrl);
    }, [overlays, underlay]);

    useEffect(() => {
        if (!text.content) return; 
        const textOverlay = {
            
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

     
        const updatedOverlays = [
            ...allSelectedStickers.map((sticker) => newOverlay(sticker)),
            textOverlay,
        ];

        setOverlays(updatedOverlays);
    }, [text, allSelectedStickers]);

    const newOverlay = (sticker: Sticker) => {
  
        const scaleX = imageDimensions.width / actualWidthShownInFrontend;
        const scaleY = imageDimensions.height / actualHeightShownInFrontend;

        return {
            publicId: sticker.publicId,
            position: {
                x: Math.round(sticker.position.x * scaleX), 
                y: Math.round(sticker.position.y * scaleY),
                gravity: 'north_west',
                angle: sticker.position.angle
            },
            effects: [
                {
                    crop: 'fit',
                    width: Math.round(sticker.size.width * scaleX), 
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

        const newAllSelectedStickers = allSelectedStickers.map((sticker) => sticker.id === id ? updatedSticker : sticker)

        setAllSelectedStickers(newAllSelectedStickers);
    };


    const handleSelectSticker = (id?: string) => {
        if (!id) {
            setSelectedSticker(null);
            setSelectedStickerId(null);
            return;
        }
        const sticker = allSelectedStickers.find((sticker) => sticker.id === id);

        setSelectedStickerId(id);
        setSelectedSticker(sticker ?? null);
    };



    return {
        onStickerUpdate,
        handleSelectSticker
    };
};
