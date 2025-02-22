import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover.tsx";
import {HexColorPicker} from "react-colorful";
import React from "react";


interface ColorPickerProps {
    color: string;
    setColor: React.Dispatch<any>
}

const ColorPicker = ({setColor, color}: ColorPickerProps) => {
    return <>
        <Popover modal={true}>
            <PopoverTrigger asChild>
                <div className={'size-5 rounded-xl flex items-center justify-center'}
                     style={{
                         border: `1px solid ${color}`
                     }}
                >
                    <div className="size-4 rounded-full" style={{backgroundColor: color}}></div>
                </div>
            </PopoverTrigger>
            <PopoverContent className={'w-fit'}>
                <HexColorPicker color={color} onChange={setColor}/>
            </PopoverContent>
        </Popover>
    </>
}

export default ColorPicker;