import { Widget } from '../../components/cloudinary/Widget';

export default function Home() {
    return (
        <div>
            <Widget
                infoHeading='Arrastra o sube una imagen'
                buttonText='Subir imagen'
                redirect
                redirectUrl='/edit/'
                formats={['jpg', 'jpeg', 'webp', 'png', 'avif']}
            />
        </div>
    );
}
