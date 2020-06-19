import React, {useState, useRef} from 'react'
// @ts-ignore
import {useRecoilState, useRecoilValue, selector} from 'recoil'
import {canvasColorState} from './Canvas'
import {Sidebar, Title} from './ui'
import {SketchPicker} from 'react-color'
import styled from 'styled-components'
import useOnClickOutside from 'use-onclickoutside'
import {selectedElementsState} from './elementsState'
import {elementState} from './Element'
import produce from 'immer'

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

const selectedElementState = selector({
    key: 'selectedElement',
    get: ({get}: any) => {
        const selectedElements = get(selectedElementsState)
        if (selectedElements.length === 1) {
            return get(elementState(selectedElements[0]))
        }

        return null
    },
    set: ({set, get}: any, newValue: any) => {
        const selectedElements = get(selectedElementsState)
        if (selectedElements.length === 1) {
            set(elementState(selectedElements[0]), newValue)
        }
    },
})

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
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)

    if (!selectedElement) return null

    return (
        <>
            <Title>Properties</Title>
            <PropertyInput
                label="Top"
                value={selectedElement.position.top}
                onChange={(value) => {
                    setSelectedElement(
                        produce((draftState) => {
                            draftState.position.top = value
                        }),
                    )
                }}
            />
            <PropertyInput
                label="Left"
                value={selectedElement.position.left}
                onChange={(value) => {
                    setSelectedElement(
                        produce((draftState) => {
                            draftState.position.left = value
                        }),
                    )
                }}
            />
            <PropertyInput
                label="Width"
                value={selectedElement.size.width}
                onChange={(value) => {
                    setSelectedElement(
                        produce((draftState) => {
                            draftState.size.width = value
                        }),
                    )
                }}
            />
            <PropertyInput
                label="Height"
                value={selectedElement.size.height}
                onChange={(value) => {
                    setSelectedElement(
                        produce((draftState) => {
                            draftState.size.height = value
                        }),
                    )
                }}
            />
        </>
    )
}

export const RightSidebar: React.FC = () => {
    const [canvasColor, setCanvasColor] = useRecoilState(canvasColorState)

    return (
        <Sidebar>
            <Title>Canvas Background</Title>
            <ColorPicker value={canvasColor} onChange={setCanvasColor} />
            <div style={{height: 20}} />
            <Properties />
        </Sidebar>
    )
}
