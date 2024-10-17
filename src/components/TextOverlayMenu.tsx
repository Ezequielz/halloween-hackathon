
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import type { TextImage } from '@/interfaces';
import { useImageStore } from '@/store';


const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Trebuchet MS'];

const initialText: TextImage = {
    content: '',
    position: { x: 0, y: 0, angle: 0 },
    fontFamily: 'Arial',
    color: '#e40d0d',
    fontWeight: 'bold',
    size: 24,
};

export const TextOverlayMenu = () => {

    const { text, setText } = useImageStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        addText(newText);
    };

    const addText = (content: string) => {
        if (!content) return setText(initialText);

        const newText: TextImage = {
            id: Date.now().toString(),
            content,
            position: { x: text.position.x ?? 50, y: text.position.y ?? 50, angle: text.position.angle ?? 0 },
            fontFamily: text.fontFamily ?? 'Arial',
            fontWeight: text.fontWeight ?? 'normal',
            color: text.color ?? '#e40d0d',
            size: text.size ?? 24,
        };
        setText(newText);
    };

    const handleTextChange = (field: string, value: any) => {

        const updateText = () => {

            if (text[field] !== value) {
                return {
                    ...text,
                    [field]: value,
                };
            }
            return text;
        }
       
        setText(updateText());
    };
    
    return (
        <div className="p-4 bg-white text-slate-800 rounded shadow-lg space-y-4">
            {/* Color selector */}
            <div className="flex items-center">
                <label className="mr-2">Text</label>
                <input
                    type="text"
                    value={text.content}
                    onChange={handleInputChange}
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
            </div>
            <div className="flex items-center">
                <label className="mr-2">Color:</label>
                <input
                    type="color"
                    value={text.color}
                    onChange={(e) => handleTextChange('color', e.target.value)}
                    className="w-10 h-10 border-none"
                />
            </div>

            {/* Font family selector */}
            <div className="flex items-center">
                <label className="mr-2">Font Family:</label>
                <select
                    value={text.fontFamily}
                    onChange={(e) => handleTextChange('fontFamily', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    {fonts.map((font) => (
                        <option key={font} value={font}>
                            {font}
                        </option>
                    ))}
                </select>
            </div>

            {/* Font size selector */}
            <div className="flex items-center">
                <label className="mr-2">Font Size (px):</label>
                <input
                    type="number"
                    value={text.size}
                    min={8}
                    max={100}
                    onChange={(e) => handleTextChange('size', parseInt(e.target.value))}
                    className="w-20 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Font weight selector */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Font Weight</label>
                <select
                    value={text.fontWeight}
                    onChange={(e) => handleTextChange('fontWeight', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="bolder">Bolder</option>
                    <option value="lighter">Lighter</option>

                </select>
            </div>
            <div className="mb-4 w-1/2">
                <label className="block text-sm font-medium text-gray-700">Text Angle</label>
                <input
                    type="range"
                    min={0}
                    max={360}
                    value={text.position.angle}
                    onChange={(e) => handleTextChange('position', { ...text.position, angle: parseInt(e.target.value, 10) })}
                    className="w-full"
                />
                <div className="text-center">{text.position.angle}°</div>
            </div>
        </div>
    );
};


