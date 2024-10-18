
// import { motion } from "framer-motion";

import { Widget } from "@/components/cloudinary/Widget";
import Image from "next/image";
import { TitleAnimated } from "@/components/ui/texts/Title";
import { StickersAnimated } from "@/components/home-page/StickersAnimated";

export default function Home() {

    return (
        <div className="relative min-h-screen bg-cover bg-no-repeat bg-[url('https://res.cloudinary.com/zapataezequiel/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1729284811/3111a1aa-4229-47e5-aa53-e230f00c29a3_1_tkjlg2.webp')]">
            {/* Fondo oscuro para la opacidad */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Título animado */}
            <TitleAnimated title="¡Transforma tus fotos para Halloween!"/>

            {/* Botón para subir imagen */}
            <Widget
                className='z-10'
                infoHeading='Arrastra o sube una imagen'
                buttonText='Subir imagen'
                redirect
                redirectUrl='/edit/'
                formats={['jpg', 'jpeg', 'webp', 'png', 'avif']}
            />

            {/* Contenedor de fotos antes y después */}
            <div className="relative flex justify-center items-center gap-10 pt-10">
                {/* Foto original */}
                <div className="relative">
                    <Image
                        src="https://res.cloudinary.com/zapataezequiel/image/upload/v1729177355/halloween-images/agdyxp1ljqbx2k90zf0e.jpg"
                        width={500}
                        height={500}
                        alt="Foto original"
                        className="rounded-lg shadow-lg"
                    />
                    <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded">
                        Antes
                    </span>
                </div>

                {/* Foto editada (usando la imagen subida) */}
                <div className="relative">
                    <Image
                        src={'https://res.cloudinary.com/zapataezequiel/image/upload/e_background_removal/u_halloween-images:pqpbmcpt71993avpnglm,w_337,h_749,c_fill/fl_layer_apply,fl_no_overflow/c_limit,w_1920/f_auto/q_auto/v1/halloween-images/iu67aasrpfgc2kxzluov?_a=BAVCyODW0'}
                        width={500}
                        height={500}
                        alt="Foto editada"
                        className="rounded-lg shadow-lg"
                    />
                    <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded">
                        Después
                    </span>
                </div>
            </div>

            <StickersAnimated quantity={8}/>
        </div>
    );
};


