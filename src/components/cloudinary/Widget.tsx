/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

interface ResourceInfo {
    public_id: string;
    secure_url: string;
}

export const Widget = () => {

    const [resource, setResource] = useState<ResourceInfo | undefined>();


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

                setResource(result?.info); // { public_id, secure_url, etc }
            }}
            onQueuesEnd={(_result: any, { widget }: { widget: any }) => {
                console.log('end queue')
                widget.close();
            }}
        >
            {({ open }: { open: () => void }) => {
                function handleOnClick() {
                    setResource(undefined);
                    open();
                }
                return (
                    <button onClick={handleOnClick}>
                        Upload an Image
                        {resource && (
                            <Image
                                src={resource.secure_url}
                                alt="Uploaded image"
                                height={500}
                                width={500}
                            />
                        )}
                    </button>
                );
            }}

        </CldUploadWidget>
    )
}
