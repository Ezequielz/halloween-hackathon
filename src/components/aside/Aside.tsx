
import { Backgrounds } from "./Backgrounds";
import { Stickers } from "./Stickers"
import { getAllBackgrounds, getAllStickers } from "@/actions"

export const Aside = async () => {

    const [{ ok: stickersLoaded, stickers }, { ok: backgroundLoaded, backgrounds }] = await Promise.all([
        getAllStickers(),
        getAllBackgrounds()
    ]);


    return (
        <aside className="w-1/5 bg-slate-900 p-4">

            {
                stickersLoaded ? (

                    <Stickers stickers={stickers ?? []}  />
                ) : (
                    <div> No se pudo cargar los stickers </div>
                )
            }

            {
                backgroundLoaded ? (

                    <Backgrounds backgrounds={backgrounds ?? []} />
                ) : (
                    <div> No se pudo cargar los backgrounds </div>
                )

            }


        </aside>
    )
}
