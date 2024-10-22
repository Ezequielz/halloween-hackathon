import { Widget } from "@/components/cloudinary/Widget";
import { TitleAnimated } from "@/components/ui/texts/Title";
import { StickersAnimated } from "@/components/home-page/StickersAnimated";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen bg-cover bg-no-repeat bg-[url('https://res.cloudinary.com/zapataezequiel/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1729284811/3111a1aa-4229-47e5-aa53-e230f00c29a3_1_tkjlg2.webp')]">

            <StickersAnimated quantity={10} />

            {/* Fondo oscuro para la opacidad */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Título animado centrado */}
            <div className="z-10 text-center mb-10">
                <TitleAnimated title="¡Transforma tus fotos para Halloween!" />
            </div>

            {/* Contenedor del botón de subir imagen y la imagen */}
            <Widget
                className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow mr-4"
                infoHeading="Arrastra o sube una imagen"
                buttonText="Subir imagen"
                redirect
                redirectUrl="/edit/"
                formats={['jpg', 'jpeg', 'webp', 'png', 'avif']}
            />
            <div className="p-4 bg-white bg-opacity-10   rounded-lg shadow-lg backdrop-blur-md my-2">
                <span className="flex justify-center text-xl">O utiliza alguna imagen de prueba</span>
                <div className="relative z-10 flex gap-2 my-2 w-fit items-center justify-center ">

                    <Link href={'/edit/rx6gfwy7lcgelz8gumec'}>
                        <Image
                            alt="imagen prueba 1"
                            src='https://res.cloudinary.com/zapataezequiel/image/upload/v1729609914/halloween-images/rx6gfwy7lcgelz8gumec.jpg'
                            height={150}
                            width={150}
                            className="rounded-lg"
                        />
                    </Link>
                    <Link href={'/edit/ixxxg7mqaqmj87alcz9a'}>
                        <Image
                            alt="imagen prueba 1"
                            src='https://res.cloudinary.com/zapataezequiel/image/upload/v1729609914/halloween-images/ixxxg7mqaqmj87alcz9a.jpg'
                            height={150}
                            width={150}
                            className="rounded-lg"
                        />
                    </Link>
                    <Link href={'/edit/gddb6iqhbp4xr6nhmj2m'}>
                        <Image
                            alt="imagen prueba 1"
                            src='https://res.cloudinary.com/zapataezequiel/image/upload/v1729609914/halloween-images/gddb6iqhbp4xr6nhmj2m.jpg'
                            height={150}
                            width={150}
                            className="rounded-lg"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};
