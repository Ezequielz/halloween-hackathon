'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Rnd } from 'react-rnd';
import type { TextImage } from '@/interfaces';
import { useImageStore } from '@/store';
import { useImageEditor } from '@/hooks';

export const RndText = () => {
  const { text, textSelected, setText, setTextSelected } = useImageStore(store => store);

  const { scaleX, handleSelectSticker } = useImageEditor();
  const scaledFontSize = Math.round(text.size / scaleX)
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

  const handleDragStart = () => {
    handleSelectSticker(undefined);
    setTextSelected(true);
  };

  if (!text.content) return null;


  return (
    <Rnd
      size={{ width: 'auto', height: 'auto' }}
      position={{ x: text.position.x, y: text.position.y }}
      onDragStop={(e, d) => updateText(+d.x, +d.y)}
      onDragStart={handleDragStart}
      enableResizing={{ bottomRight: true }}
    >
      <div
        style={{
          fontSize: `${scaledFontSize }px`,
          fontFamily: text.fontFamily,
          color: text.color,
          transform: `rotate(${text.position.angle}deg)`,
          whiteSpace: 'nowrap',
          fontWeight: text.fontWeight,
          filter: textSelected
            ? 'drop-shadow(0 0 0.75rem red)' 
            : 'none', 
        }}
      >
        {text.content}
      </div>
    </Rnd>
  );
};


