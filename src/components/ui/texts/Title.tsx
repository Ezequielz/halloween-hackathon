'use client'
import { motion } from 'framer-motion';

interface Props {
    title: string;

}

export const TitleAnimated = ({title}: Props) => {
    return (
        <motion.h1
            className="relative text-center text-4xl font-bold text-orange-400 py-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
        >
            {title}
        </motion.h1>
    )
}
