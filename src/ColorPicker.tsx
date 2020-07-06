import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import useOnClickOutside from 'use-onclickoutside'
import {SketchPicker} from 'react-color'

const Color = styled.div`
    width: 40px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
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
            <div ref={ref} style={{display: 'inline-block'}}>
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
