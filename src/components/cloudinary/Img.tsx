'use client'
import { CldImage } from 'next-cloudinary';

interface Props {
    url: string;

}

export const Img = ({ url }: Props) => {
    console.log(url)
    return (
        <CldImage
            width='1600'
            height="900"
            src={url}
            // sizes="100vw"
            className='object-cover'
            removeBackground
            underlay='halloween-images/rn48oklzi9xbphdqamcf'
            overlays={[{
                publicId: 'halloween-images/sgzgayuvjo5dl5ezwcc3',
                position: {
                    x: 70,
                    y: 200,
                    gravity: 'north_west',
                },
                effects: [
                    {
                        crop: 'fill',
                        gravity: 'auto',
                        width: 200,
                        height: 250
                    }
                ]
            }]}
            alt="Imagen"
        />
    )
}
