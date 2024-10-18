'use client'
import { motion } from 'framer-motion';

interface Props {
    src: string;
    alt: string;
    className?: string;
    variants: {
        initial: { scale: number, rotate: number };
        animate: { scale: number[], rotate: number[], transition: { duration: number, repeat: number, ease: string } };
    }
    initial?: string;
    animate?: string
}
export const StickerAnimated = ({
    src,
    alt,
    className = "absolute top-10 left-10 w-20",
    variants,
    initial = "initial",
    animate = "animate",
}: Props) => {
    return (
        <motion.img
            width={100}
            src={src}
            alt={alt}
            className={className}
            variants={variants}
            initial={initial}
            animate={animate}
        />
    )
}
