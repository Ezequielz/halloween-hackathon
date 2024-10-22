/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { addBackground, addSticker } from '@/actions';
import type { Sticker } from '@/interfaces';

interface ResourceInfo {
    folder: string;
    public_id: string;
    secure_url: string;

}


interface Props {
    formats: Formats[];
    redirect?: boolean;
    redirectUrl?: string;
    buttonText: string;
    className?: string;
    infoHeading?: string
    asset?: 'sticker' | 'background'
}

type Formats = 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp' | 'avif';

export const Widget = ({ formats, redirect, redirectUrl, className, buttonText, infoHeading, asset }: Props) => {

    const [resource, setResource] = useState<ResourceInfo | undefined>();

    const router = useRouter();

    useEffect(() => {
        if (!resource) return;
        if (resource && redirect) {
            return router.push(`${redirectUrl}${resource?.public_id}`)
        }

        const createSticker = async () => {
            if (!resource) return;

            const newSticker: Sticker = {
                id: resource.public_id,
                name: resource.public_id,
                publicId: `${resource.folder}/${resource.public_id}`,
                position: {
                    x: 0,
                    y: 0,
                    angle: 0
                },
                size: {
                    width: 200,
                    height: 200
                }
            }

            await addSticker({ sticker: newSticker, url: resource.public_id })
        }

        const createBackground = async () => {
            if (!resource) return;

            const newBackground = {
                id: resource.public_id,
                publicId: `${resource.folder}/${resource.public_id}`,
            }

            await addBackground({ background: newBackground, url: resource.public_id })

        }

        if (asset === 'sticker') createSticker();
        if (asset === 'background') createBackground();

        // router.push(`/edit/${resource?.public_id}`)

    }, [resource])


    if (resource && redirect) {
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
                clientAllowedFormats: formats,
                text: {
                    es: {
                        or: 'o',
                        heading: infoHeading,
                        menu: {
                            files: 'Mis archivos'
                        },
                        local: {
                            dd_title_single: infoHeading,
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
                    <button
                        onClick={handleOnClick}
                        className={className}
                    >
                        <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>

                        <span className="relative text-black group-hover:text-white">

                        {buttonText}
                        </span>
                        

                    </button>


                );
            }}

        </CldUploadWidget>
    )
}
