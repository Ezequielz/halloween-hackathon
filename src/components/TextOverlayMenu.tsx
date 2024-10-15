/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from '@/interfaces';

interface Props {
    text: Text
    onTextChange: (field: string, value: any) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Trebuchet MS'];

export const TextOverlayMenu = ({ text, onTextChange, handleInputChange }: Props) => {
    return (
        <div className="p-4 bg-white text-slate-800 rounded shadow-lg space-y-4">
            {/* Color selector */}
            <input
                type="text"
                value={text.content}
                onChange={handleInputChange}
                className='text-slate-900 p-5 font-medium text-lg'
            />
            <div className="flex items-center">
                <label className="mr-2">Text Color:</label>
                <input
                    type="color"
                    value={text.color}
                    onChange={(e) => onTextChange('color', e.target.value)}
                    className="w-10 h-10 border-none"
                />
            </div>

            {/* Font family selector */}
            <div className="flex items-center">
                <label className="mr-2">Font Family:</label>
                <select
                    value={text.fontFamily}
                    onChange={(e) => onTextChange('fontFamily', e.target.value)}
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
                    onChange={(e) => onTextChange('size', parseInt(e.target.value))}
                    className="w-20 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Font weight selector */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Font Weight</label>
                <select
                    value={text.fontWeight}
                    onChange={(e) => onTextChange('fontWeight', e.target.value)}
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
                    onChange={(e) => onTextChange('position', { ...text.position, angle: parseInt(e.target.value, 10) })}
                    className="w-full"
                />
                <div className="text-center">{text.position.angle}°</div>
            </div>
        </div>
    );
};


