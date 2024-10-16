
import { Backgrounds } from "./Backgrounds";
import { Stickers } from "./Stickers"
import { getAllBackgrounds, getAllStickers } from "@/actions"


interface Props {
    url: string
}

export const Aside = async ({ url }: Props) => {

    const { stickers } = await getAllStickers();
    const { backgrounds } = await getAllBackgrounds();

    console.log(stickers, backgrounds)

    return (
        <aside className="w-1/5 bg-slate-900 p-4">

            <Stickers stickers={stickers ?? []} url={url}/>

            <Backgrounds backgrounds={backgrounds ?? []} url={url} />

        </aside>
    )
}
