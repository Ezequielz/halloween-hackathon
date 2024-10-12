/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface ResourceInfo {
    folder: string;
    public_id: string;
    secure_url: string;
}

export const Widget = () => {

    const [resource, setResource] = useState<ResourceInfo | undefined>();

    const router = useRouter();

    useEffect(() => {
        if (resource)
        router.push(`/edit/${resource?.public_id}`)
    
    }, [resource])
    

    if ( resource) {
        return (
            <div>
                Imagen cargada, espere...
            </div>
        )
    }
    return (
        <CldUploadWidget
            uploadPreset='halloween'
            signatureEndpoint="/api/sign-cloudinary-params"

            options={{
                sources: ['local'],
                multiple: false, // default: true
                maxFiles: 1, // default: 1
                language: 'es',
                autoMinimize: false,
                text: {
                    es: {
                        or: 'o',
                        heading: 'Arrastra o sube una imagen',
                        menu: {
                            files: 'Mis archivos'
                        },
                        local: {
                            dd_title_single: 'Arrastra o sube una imagen',
                            browse: 'Examinar',
                        }
                    }
                },

            }}

            onSuccess={(
                result: any,
                // { widget }: { widget: any }
            ) => {
                const newResource = {
                    folder: result?.info?.folder,
                    public_id: result?.info?.public_id.split('/').at(1),
                    secure_url: result?.info?.secure_url
                }
                setResource(newResource); // { public_id, secure_url, etc }

            }}
            onQueuesEnd={(_result: any, { widget }: { widget: any }) => {
                              
                widget.close();
            }}
        >
            {({ open }: { open: () => void }) => {
                function handleOnClick() {
                    
                    open();
                }
                return (
                    <button onClick={handleOnClick}>
                        Upload an Image
                      
                    </button>
                );
            }}

        </CldUploadWidget>
    )
}
