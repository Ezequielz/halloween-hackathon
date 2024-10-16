/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import { Rnd } from 'react-rnd'; // React RND for drag and resize
import type { Background, Overlay, Sticker, Text } from '@/interfaces';
import { DraggableText } from './DragableText';
import { TextOverlayMenu } from './TextOverlayMenu';
// import Image from 'next/image';

interface Props {
  url: string;
}

const initialText: Text = {
  content: '',
  position: { x: 0, y: 0, angle: 0 },
  fontFamily: 'Arial',
  color: '#000000',
  fontWeight: 'bold',
  size: 24,

}

export const GenerateImage = ({ url }: Props) => {
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [underlay, setUnderlay] = useState('halloween-images/pqpbmcpt71993avpnglm')
  const [allSelectedStickers, setAllSelectedStickers] = useState<Sticker[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [backgrounds, setBackgrounds] = useState<Background[]>([])
  const [imgCreated, setImgCreated] = useState<string>('');
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [actualWidthShownInFrontend, setActualWidthShownInFrontend] = useState(0);
  const [actualHeightShownInFrontend, setActualHeightShownInFrontend] = useState(0);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [text, setText] = useState<Text>(initialText);
  console.log(overlays)
  // Función para agregar un nuevo texto
  const addText = (content: string) => {

    if (!content) return setText(initialText);

    const newText: Text = {
      id: Date.now().toString(),
      content: content,
      position: { x: text.position.x ?? 50 , y: text.position.y ?? 50, angle: text.position.angle ?? 0 },
      fontFamily: text.fontFamily ?? 'Arial',
      fontWeight: text.fontWeight ?? 'normal',
      color: text.color ?? 'black',
      size: text.size ?? 24,
    };
    setText(newText);
  };

  // console.log(selectedStickerId, selectedSticker)


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

  useEffect(() => {
    const imgElement = document.getElementById('main-image'); // Usar un id en tu <CldImage>
    if (imgElement) {
      setActualWidthShownInFrontend(imgElement.offsetWidth);
      setActualHeightShownInFrontend(imgElement.offsetHeight);
    }
  }, [url, imageDimensions]);

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

    setBackgrounds([
      {
        id: 'background-1',
        publicId: 'halloween-images/pqpbmcpt71993avpnglm'
      },
      {
        id: 'background-2',
        publicId: 'halloween-images/ip5deapchh5ofxiuavr9'
      },
    ])

    setStickers([
      {
        id: 'sticker-1',
        name: 'fantasma',
        publicId: 'halloween-images/sgzgayuvjo5dl5ezwcc3',
        position: {
          x: 0,
          y: 0,
          angle: 0,
        },
        size: {
          height: 300,
          width: 200,
        }
        // width: (imageDimensions.width * 20) / 100,
        // height: (imageDimensions.height * 20) / 100,
      },
      {
        id: 'sticker-2',
        name: 'calabaza',
        publicId: 'halloween-images/j6uvivifkmk5idazvpjo',
        position: {
          x: 0,
          y: 0,
          angle: 0,
        },
        size: {
          height: 300,
          width: 200,
        }
        // width: (imageDimensions.width * 20) / 100,
        // height: (imageDimensions.height * 20) / 100,
      },
    ]);

  }, []);
  // console.log(allSelectedStickers)
  useEffect(() => {
    const updatedOverlays = allSelectedStickers.map((sticker) => newOverlay(sticker));
    setOverlays(updatedOverlays);
    handleSelectSticker(selectedStickerId ?? undefined)
  }, [allSelectedStickers]);


  useEffect(() => {
    const newUrl = getCldImageUrl({
      src: url,
      width: imageDimensions.width,
      height: imageDimensions.height,
      removeBackground: true,
      overlays: overlays,
      underlays: [{
        publicId: underlay,
        effects: [
          {

            width: imageDimensions.width,
            height: imageDimensions.height,
          }
        ]
      }]
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

  const addSticker = (name: string) => {

    const sticker = stickers.find((sticker) => sticker.name === name)
    if (!sticker) return;

    const newId = Math.random().toString(36).substring(7);

    const newSticker = {
      ...sticker,
      id: newId,
    };


    setAllSelectedStickers((prevStickers) => [...prevStickers, { ...newSticker, id: newId }]);
    handleSelectSticker(newSticker.id);
  };


  const onChangeUnderlay = (id: string) => {
    const background = backgrounds.find((background) => background.id === id)
    if (!background) return;
    setUnderlay(background.publicId)
  }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    addText(newText);
    // onUpdateText({
    //   ...text,
    //   content: newText,
    // });
  };

  const updateText = (
    newX?: number,
    newY?: number,
    fontSize?: number,
    newAngle?: string,) => {

    if (!text) return;


    const textToUpdate: Text = {
      ...text,
      position: {
        x: newX ? Math.round(newX) : text.position.x,
        y: newY ? Math.round(newY) : text.position.y,
        angle: newAngle ? +newAngle : text.position.angle
      },
      size: fontSize ? fontSize : text.size
    }

    setText(textToUpdate);
  };

  const handleTextChange = (field: string, value: any) => {
    setText((prev) => {
      
      if (prev[field] !== value) {
        return {
          ...prev,
          [field]: value,
        };
      }
      return prev; 
    });
  };

  return (
    <section>
      <div className="flex gap-3">
        <div className="w-1/5 bg-slate-900 p-4">
          <h2 className="mb-4">Stickers</h2>
          {stickers.map((sticker) => (
            <button
              onClick={() => addSticker(sticker.name)}
              key={sticker.id}
            >
              <CldImage
                width="100"
                height="100"
                src={sticker.publicId}
                alt="Sticker"
                unoptimized
              />
            </button>
          ))}

          <h3>Background</h3>
          {backgrounds.map((background) => (
            <button onClick={() => onChangeUnderlay(background.id)} key={background.id}>
              <CldImage
                width="100"
                height="100"
                src={background.publicId}
                alt="background"
              />
            </button>
          ))}


          <h3>Agrega un texto</h3>
          <TextOverlayMenu text={text} onTextChange={handleTextChange} handleInputChange={handleInputChange}/>
       

        </div>

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
                // crop="fill"
                src={url}
                alt="Main Image"
                underlays={[{
                  publicId: underlay,
                  effects: [
                    {

                      width: imageDimensions.width,
                      height: imageDimensions.height,
                    }
                  ]
                }]}
                // fillBackground
                className={`h-full w-auto `} // Ajustar a pantalla completa manteniendo proporciones
              />
            </picture>
            {
              text && (

                <DraggableText key={text.id} text={text} onUpdateText={updateText} />
              )
            }
            {allSelectedStickers.map((sticker) => (
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
                onClick={() => handleSelectSticker(sticker.id)} // Seleccionar sticker al hacer clic

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

        <div className="w-1/5 bg-slate-900 p-4">
          <h2 className="mb-4">Sticker {selectedSticker?.name}</h2>
          {selectedSticker && (
            <>
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
        </div>


      </div>
    </section>
  );
};
