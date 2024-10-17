// 'use client'
import { CldImage, CldImageProps } from 'next-cloudinary';


export const CustomImage = ({ ...rest }: CldImageProps) => {

    return (
        <CldImage

            {...rest}
        />
    )
}
