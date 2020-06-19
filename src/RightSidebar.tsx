import React, {useState, useRef} from 'react'
import {Sidebar, Title} from './ui'
import {SketchPicker} from 'react-color'
import styled from 'styled-components'
import useOnClickOutside from 'use-onclickoutside'

const Color = styled.div`
    width: 40px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #ccc;
`

const Popover = styled.div`
    position: absolute;
    top: 5px;
    left: 0;
`

const ColorPicker: React.FC<{value: string; onChange: (value: string) => void}> = ({value, onChange}) => {
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

const InputLabel = styled.div`
    font-weight: 500;
    margin-bottom: 4px;
    font-size: 14px;
`

const Input = styled.input`
    background-color: #565656;
    border-radius: 3px;
    padding: 10px;
    border: 0;
    width: 100%;
    outline: none;
    margin-bottom: 15px;
    color: #fff;
    font-size: 16px;
`

const PropertyInput: React.FC<{label: string; value: number; onChange: (value: number) => void}> = ({
    label,
    value,
    onChange,
}) => {
    return (
        <>
            <InputLabel>{label}</InputLabel>
            <Input type="number" value={value} onChange={(e) => onChange(Number(e.currentTarget.value))} />
        </>
    )
}

const Properties: React.FC = () => {
    const [selectedElement, setSelectedElement] = useState<number | undefined>()

    if (!selectedElement) return null

    return (
        <>
            <Title>Properties</Title>
            <PropertyInput
                label="Top"
                value={0}
                onChange={(value) => {
                    console.log('onChange Top', value)
                }}
            />
            <PropertyInput
                label="Left"
                value={0}
                onChange={(value) => {
                    console.log('onChange Left', value)
                }}
            />
            <PropertyInput
                label="Width"
                value={0}
                onChange={(value) => {
                    console.log('onChange Width', value)
                }}
            />
            <PropertyInput
                label="Height"
                value={0}
                onChange={(value) => {
                    console.log('onChange Height', value)
                }}
            />
        </>
    )
}

export const RightSidebar: React.FC = () => {
    const [canvasColor, setCanvasColor] = useState('#101010')

    return (
        <Sidebar>
            <Title>Canvas Background</Title>
            <ColorPicker value={canvasColor} onChange={setCanvasColor} />
            <div style={{height: 20}} />
            <Properties />
        </Sidebar>
    )
}
