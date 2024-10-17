/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import type { Background } from "@/interfaces";

interface Props {
    background: Background
    url: string
}


export const addBackground = async ({ background, url }: Props) => {

    try {


        const docRef = await addDoc(collection(db, "backgrounds"), background);

        
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