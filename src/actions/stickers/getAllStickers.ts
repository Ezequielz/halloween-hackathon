/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore'; 

import type{ Sticker } from '@/interfaces';


export const getAllStickers = async () => {


    try {
        const collectionRef = collection(db, 'stickers');
        const snapshot = await getDocs(collectionRef);

        const stickers = snapshot.docs.map(doc => ({
  
            ...doc.data()
        })) as Sticker[];


        return {
            ok: true,
            stickers
        };

    } catch (error: any) {
        console.error(error);
        return {
            ok: false,
            error: error.message || 'Error al obtener los stickers'
        };
    }
};
