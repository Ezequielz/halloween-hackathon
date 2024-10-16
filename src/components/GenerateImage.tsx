
import { Aside } from './aside/Aside';
import { ControlsAside } from './controls/ControlsAside';
import { MainImage } from './main-image/MainImage';
// import Image from 'next/image';

interface Props {
  url: string;
}


export const GenerateImage = ({ url }: Props) => {

  return (
    <section>
      <div className="flex gap-3">

        <Aside url={url} />

        <MainImage url={url} />

        <ControlsAside url={url} />
      </div>
    </section>
  );
};
