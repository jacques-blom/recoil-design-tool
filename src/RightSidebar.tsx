import React, {useContext} from 'react'
import {Sidebar, Title} from './ui'
import styled from 'styled-components'
import {ElementsContext} from './App'

const InputLabel = styled.div`
    font-weight: 500;
    margin-bottom: 4px;
    font-size: 14px;
`

const Input = styled.input`
    background-color: rgba(10, 10, 10, 0.3);
    border-radius: 15px;
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
    const {selectedElement: selectedElementId, elements, setElements} = useContext(ElementsContext)

    const selectedElement = elements.find((element) => element.id === selectedElementId)

    if (!selectedElement) return null

    return (
        <>
            <Title>Properties</Title>
            <PropertyInput
                label="Top"
                value={selectedElement.top}
                onChange={(top) => {
                    setElements(
                        elements.map((el) => {
                            if (el.id === selectedElement.id) {
                                return {...el, top}
                            } else {
                                return el
                            }
                        }),
                    )
                }}
            />
            <PropertyInput
                label="Left"
                value={selectedElement.left}
                onChange={(left) => {
                    setElements(
                        elements.map((el) => {
                            if (el.id === selectedElement.id) {
                                return {...el, left}
                            } else {
                                return el
                            }
                        }),
                    )
                }}
            />
        </>
    )
}

export const RightSidebar: React.FC = () => {
    return (
        <Sidebar>
            <Properties />
        </Sidebar>
    )
}
