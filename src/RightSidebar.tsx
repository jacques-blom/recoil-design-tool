import React from 'react'
import {Sidebar, Title, colors} from './ui'
import styled from 'styled-components'
import {ColorPicker} from './ColorPicker'
import {useRecoilState, selector} from 'recoil'
import {selectedElementIdState, elementState, ElementState} from './state'

const InputLabel = styled.div`
    font-weight: 500;
    margin-bottom: 4px;
    font-size: 14px;
`

const Input = styled.input`
    background-color: ${colors.darkGray};
    border-radius: 10px;
    padding: 10px;
    border: 0;
    width: 100%;
    outline: none;
    margin-bottom: 15px;
    color: white;
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

const selectedElementState = selector<ElementState | undefined>({
    key: 'selectedElement',
    get: ({get}) => {
        const id = get(selectedElementIdState)

        if (id != null) {
            return get(elementState(id))
        }
    },
    set: ({set, get}, newElementValue) => {
        const id = get(selectedElementIdState)

        if (id != null && newElementValue) {
            set(elementState(id), newElementValue)
        }
    },
})

const Properties: React.FC = () => {
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)

    if (!selectedElement) return null

    return (
        <div>
            <Title>Properties</Title>
            {selectedElement.type === 'rectangle' && (
                <>
                    <InputLabel>Color</InputLabel>
                    <ColorPicker
                        value={selectedElement.color}
                        onChange={(color) => {
                            setSelectedElement({
                                ...selectedElement,
                                color,
                            })
                        }}
                    />
                </>
            )}
            <PropertyInput
                label="Top"
                value={selectedElement.style.top}
                onChange={(top) => {
                    setSelectedElement({
                        ...selectedElement,
                        style: {...selectedElement.style, top},
                    })
                }}
            />
            <PropertyInput
                label="Left"
                value={selectedElement.style.left}
                onChange={(left) => {
                    setSelectedElement({
                        ...selectedElement,
                        style: {...selectedElement.style, left},
                    })
                }}
            />
            <PropertyInput
                label="Width"
                value={selectedElement.style.width}
                onChange={(width) => {
                    setSelectedElement({
                        ...selectedElement,
                        style: {...selectedElement.style, width},
                    })
                }}
            />
            <PropertyInput
                label="Height"
                value={selectedElement.style.height}
                onChange={(height) => {
                    setSelectedElement({
                        ...selectedElement,
                        style: {...selectedElement.style, height},
                    })
                }}
            />
        </div>
    )
}

export const RightSidebar: React.FC = () => {
    return (
        <Sidebar>
            <Properties />
        </Sidebar>
    )
}
