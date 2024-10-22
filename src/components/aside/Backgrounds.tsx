'use client'

import { useImageStore } from '@/store';
import type { Background, Underlay } from '@/interfaces';
import { CustomImage } from '../cloudinary/CustomImage';
import { Widget } from '../cloudinary/Widget';


interface Props {

  backgrounds: Background[];
}

export const Backgrounds = ({ backgrounds }: Props) => {
  const { imageDimensions, setUnderlay } = useImageStore();

  const onChangeUnderlay = (id: string) => {
    const background = backgrounds.find((background) => background.id === id)
    if (!background) return;

    const newUnderlay: Underlay[] = [{
      publicId: background.publicId,
      effects: [
        {

          width: +imageDimensions.width,
          height: +imageDimensions.height,
          // crop: 'fit'
        }
      ]
    }]
    setUnderlay(newUnderlay)
  }
  return (
    <section className="p-4 ">

      <header className="flex items-center my-3 gap-2">
        <h2 className="text-2xl ">Background</h2>
        <Widget
          buttonText='+'
          className="border-2 border-blue-600 bg-blue-500/70 px-2 py-0.5 rounded-full hover:bg-blue-500 cursor-pointer"
          formats={['jpg', 'jpg', 'webp', 'avif']}
          infoHeading="Arrastra o sube un Background"
          asset='background'
        />
      </header>

      <div className='grid grid-cols-3 gap-2'>

        {backgrounds.map((background) => (


          <button
            onClick={() => onChangeUnderlay(background.id)}
            key={background.id}
            // className='h-10 '
          >
            <CustomImage
              width="80"
              height="80"
              src={background.publicId}
              alt="background"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100px',
                height: '100px',

              }}
            />
          </button>

        ))}
      </div>


    </section>
  )
}
