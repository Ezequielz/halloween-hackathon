'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Rnd } from 'react-rnd';
import type { TextImage } from '@/interfaces';
import { useImageStore } from '@/store';



export const RndText = () => {

  const { text, setText } = useImageStore(store => store);
  const updateText = (
    newX?: number,
    newY?: number,
    fontSize?: number,
    newAngle?: string,) => {

    if (!text) return;


    const textToUpdate: TextImage = {
      ...text,
      position: {
        x: newX ? Math.round(newX) : text.position.x,
        y: newY ? Math.round(newY) : text.position.y,
        angle: newAngle ? +newAngle : text.position.angle
      },
      size: fontSize ? fontSize : text.size
    }

    setText(textToUpdate);
  };
  const handleDragStop = (e: any, d: any) => {
    updateText(+d.x, +d.y);
  };

  if (!text.content) return null;


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


