/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import { Rnd } from 'react-rnd'; // React RND for drag and resize

interface Props {
  url: string;
}
interface Sticker {
  id: string;
  publicId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
interface Overlay {
  publicId: string;
  position: {
    x: number;
    y: number;
    gravity: string;
  };
  effects: {
    crop: string;
    width: number;
    height: number;
  }[];
}

export const GenerateImage = ({ url }: Props) => {
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [allSelectedStickers, setAllSelectedStickers] = useState<Sticker[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [imgCreated, setImgCreated] = useState<string>('');
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  console.log(imgCreated)

  // Función para obtener las dimensiones originales de la imagen
  const loadImageDimensions = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };


  };
  // console.log({ url })
  useEffect(() => {
    // Cargar dimensiones originales de la imagen
    loadImageDimensions(url);
  }, [url]);

  useEffect(() => {
    if (imageDimensions.width > 0 && imageDimensions.height > 0) {


      setStickers([
        {
          id: 'sticker-1',
          publicId: 'halloween-images/sgzgayuvjo5dl5ezwcc3',
          x: 0,
          y: 0,
          width: 150,
          height: 200,
        },
        {
          id: 'sticker-2',
          publicId: 'halloween-images/j6uvivifkmk5idazvpjo',
          x: 0,
          y: 0,
          width: 150,
          height: 200,
        },
      ]);
    }
  }, [imageDimensions]);

  useEffect(() => {
    const updatedOverlays = allSelectedStickers.map((sticker) => newOverlay(sticker));
    setOverlays(updatedOverlays);
  }, [allSelectedStickers]);

  useEffect(() => {
    const newUrl = getCldImageUrl({
      src: url,
      height: imageDimensions.height,
      width: imageDimensions.width,

      overlays: overlays,
    });

    setImgCreated(newUrl);
  }, [overlays]);

  const addSticker = (id: string) => {

    const newSticker = stickers.find((sticker) => sticker.id === id)
    if (!newSticker) return;
    setAllSelectedStickers((prevStickers) => [...prevStickers, newSticker]);
  };

  const onStickerUpdate = (id: string, newX?: number, newY?: number, newWidth?: number, newHeight?: number) => {

    const stickerToUpdate = allSelectedStickers.find((sticker) => sticker.id === id)
    if (!stickerToUpdate) return;
    const updatedSticker: Sticker = {
      ...stickerToUpdate,
      x: newX ? Math.round(newX) : stickerToUpdate.x,
      y: newY ? Math.round(newY) : stickerToUpdate.y,
      width: newWidth ? newWidth : stickerToUpdate.width,
      height: newHeight ? newHeight : stickerToUpdate.height,
    }

    setAllSelectedStickers((prevStickers) =>
      prevStickers.map((sticker) =>
        sticker.id === id ? sticker = updatedSticker : sticker
      )
    );
  };

  const newOverlay = (sticker: Sticker) => {

    return {
      publicId: sticker.publicId,
      position: {
        x: Math.round(sticker.x),
        y: Math.round(sticker.y),
        gravity: 'north_west',
      },
      effects: [
        {
          crop: 'fill',
          width: sticker.width,
          height: sticker.height,
        },
      ],
    };
  };
  // console.log(imageDimensions.height, imageDimensions.width)
  return (
    <section>
      <div className="flex">
        <div className="w-1/4 bg-slate-500 p-4">
          <h2 className="mb-4">Stickers</h2>
          {stickers.map((sticker) => (
            <button onClick={() => addSticker(sticker.id)} key={sticker.id}>
              <CldImage width="100" height="100" src={sticker.publicId} alt="Sticker" unoptimized />
            </button>
          ))}
        </div>

        <div className="relative flex">
          <div>
          

              <CldImage
                width={imageDimensions.width}
                height={imageDimensions.height}
                src={url}
                alt="Main Image"
                style={{ objectFit: 'contain' }}
              />
      
            {allSelectedStickers.map((sticker) => (
              <Rnd
                key={sticker.id}
                size={{ width: sticker.width, height: sticker.height }}
                position={{ x: sticker.x, y: sticker.y }}
                onDragStop={(e, d) => onStickerUpdate(sticker.id, d.x, d.y)}
                on
                onResizeStop={(e, direction, ref, delta, position) => {
                  onStickerUpdate(sticker.id, position.x, position.y, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10));
                }}
              >
                <CldImage src={sticker.publicId} alt="Sticker" height={sticker.height} width={sticker.width} unoptimized />
              </Rnd>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
