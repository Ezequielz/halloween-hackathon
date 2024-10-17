// import { Img } from '@/components/cloudinary/Img';

import { Metadata } from 'next';
import { getCldImageUrl, getCldOgImageUrl } from 'next-cloudinary';
import { Aside, ControlsAside, MainImage } from '@/components';
import { Suspense } from 'react';



interface Props {
    params: {
        id: string;
    }
}

export async function generateMetadata(
    { params }: Props,

): Promise<Metadata> {
    // read route params
    const imgId = params.id

    const imagen = getCldOgImageUrl({
        width: 600,
        height: 600,
        src: `halloween-images/${imgId}`,
        crop: 'thumb',
        text: 'Happy Halloweeen'

    })

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []
    const title = 'Imagen de Halloween'
    return {
        title,


        openGraph: {
            title,
            images: imagen, // https://misitio.com/products/image.png
        },
    }
}



export default async function EditPage({ params }: Props) {
    const imgId = params.id;


    const url = await getCldImageUrl({
        src: `halloween-images/${imgId}`,

    });
 
    return (
        <section>
            <div className="flex gap-3">

                <Suspense fallback={<div className="w-1/5 bg-slate-900 p-4">Cargando...</div>}>
                    <Aside  />
                </Suspense>

                <MainImage url={url} />

                <ControlsAside  />
            </div>
        </section>
    );
}
