/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import type { Sticker } from "@/interfaces";
import { revalidatePath } from "next/cache";

interface Props {
    sticker: Sticker
    url: string
}


export const addSticker = async ({ sticker, url }: Props) => {

    try {


        const docRef = await addDoc(collection(db, "stickers"), sticker);

        
        revalidatePath('/')
        revalidatePath('/edit')
        revalidatePath(`/edit/${url}` )
        return {
            ok: true,
            order: docRef.id
        }

        

    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error
        }
    }

}