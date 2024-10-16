/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

import type { Background } from '@/interfaces';



export const getAllBackgrounds = async () => {


    try {
        const collectionRef = collection(db, 'backgrounds');
        const snapshot = await getDocs(collectionRef);

        const backgrounds = snapshot.docs.map(doc => ({

            ...doc.data()
        })) as Background[];

        return {
            ok: true,
            backgrounds
        };

    } catch (error: any) {
        console.error(error);
        return {
            ok: false,
            error: error.message || 'Error al obtener los backgrounds'
        };
    }
};
