import { getAllStickers } from '@/actions';
import { StickerAnimated } from './StickerAnimated';

interface Props {
    quantity?: number;
}

export const StickersAnimated = async ({quantity = 10}:Props) => {
    const { stickers } = await getAllStickers();
    if (!stickers) return null;
    // Seleccionamos 4 stickers al azar del array de stickers
    const randomStickers = stickers
        .sort(() => 0.5 - Math.random()) // Mezclamos los stickers
        .slice(0, quantity); 

    // Genera variantes de animación con valores aleatorios
    const generateStickerVariants = () => ({
        initial: { scale: 1, rotate: 0 },
        animate: {
            scale: [1, Math.random() * 0.3 + 1, 1],
            rotate: [0, Math.random() * 20 - 10, -10, 0],
            transition: { duration: Math.random() * 3 + 2, repeat: Infinity, ease: "easeInOut" },
        },
    });

    // Ubicaciones absolutas aleatorias para los stickers
    const positions = [
        "top-10 left-10",
        "top-1/2 right-10",
        "bottom-10 left-1/3",
        "top-42 right-1/4",
        "bottom-12 right-18",
        "top-5 left-42",
        "top-14 left-12",
        "top-1/3 right-13",
        "bottom-25 left-1/4",
        "top-32 right-1/3",
        "bottom-10 right-16",
        "top-15 left-1/4",
    ];

    const url = 'https://res.cloudinary.com/zapataezequiel/image/upload/v1729182790/'

    return (
        <>
            {randomStickers.map((sticker, index) =>{ 
                console.log(`${url}${sticker.publicId}.png`)
             return   (
                <StickerAnimated
                    key={sticker.id}
                    src={`${url}${sticker.publicId}.png`} 
                    alt={`Sticker ${index + 1}`}
                    variants={generateStickerVariants()} 
                    className={`absolute ${positions[index ]}`} 
                />
            )})}
        </>
    );
};
