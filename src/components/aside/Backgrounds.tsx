'use client'
import { CldImage } from 'next-cloudinary';
import { useImageStore } from '@/store';
import type { Background, Underlay } from '@/interfaces';


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
    <section>
      <h3>Background</h3>
      <div className='flex gap-2'>

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
      </div>


    </section>
  )
}
