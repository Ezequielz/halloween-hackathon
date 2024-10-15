/* eslint-disable @typescript-eslint/no-explicit-any */

import { Rnd } from 'react-rnd';
import type { Text } from '@/interfaces';


interface Props {
  text: Text;
  onUpdateText: (newX?: number, newY?: number) => void;
}

export const DraggableText= ({ text, onUpdateText }: Props) => {


  const handleDragStop = (e: any, d: any) => {
    onUpdateText(+d.x, +d.y);
  };


  return (
    <Rnd
      size={{ width: 'auto', height: 'auto' }}
      position={{ x: text.position.x, y: text.position.y }}
      onDragStop={handleDragStop}
      enableResizing={{ bottomRight: true }}
    >
      <div
        style={{
          fontSize: `${text.size}px`,
          fontFamily: text.fontFamily,
          color: text.color,
          transform: `rotate(${text.position.angle}deg)`,
          whiteSpace: 'nowrap',
          fontWeight: text.fontWeight,
        }}
      >
        {text.content}
      </div>
    </Rnd>
  );
};


