'use client'
import { CldImage } from 'next-cloudinary';
import type { Background } from '@/interfaces';
import { useImageEditor } from '@/hooks';


interface Props {
    url: string;
    backgrounds: Background[];
}

export const Backgrounds = ({ backgrounds, url }: Props) => {
    const { imageDimensions, setUnderlay } = useImageEditor(url);

    const onChangeUnderlay = (id: string) => {
        const background = backgrounds.find((background) => background.id === id)
        if (!background) return;
    
        const newUnderlay = [{
          publicId: background.publicId,
          effects: [
            {
    
              width: imageDimensions.width,
              height: imageDimensions.height,
              // crop: 'fit'
            }
          ]
        }]
        setUnderlay(newUnderlay)
      }
    return (
        <section>
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


        </section>
    )
}
