import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import useOnClickOutside from 'use-onclickoutside'
import {SketchPicker} from 'react-color'
import {Label} from '../ui/Typography'

const Color = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 15px;
`

const Popover = styled.div`
    position: absolute;
    top: 5px;
    left: 0;
`

export const ColorPicker: React.FC<{value: string; onChange: (value: string) => void}> = ({value, onChange}) => {
    const [pickerVisible, setPickerVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useOnClickOutside(ref, () => setPickerVisible(false))

    return (
        <div>
            <Label>Color</Label>
            <div ref={ref} style={{width: 60, height: 60}}>
                <Color style={{backgroundColor: value}} onClick={() => setPickerVisible(!pickerVisible)} />
                <div style={{position: 'relative'}}>
                    {pickerVisible && (
                        <Popover>
                            <SketchPicker color={value} onChange={({hex}) => onChange(hex)} />
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}
