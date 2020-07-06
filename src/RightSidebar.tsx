import React from 'react'
import {Sidebar, Title} from './ui'
import styled from 'styled-components'
import {ColorPicker} from './ColorPicker'

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
    const selectedElement = null

    if (!selectedElement) return null

    return (
        <>
            <Title>Properties</Title>
            <InputLabel>Color</InputLabel>
            <ColorPicker value="#FFF" onChange={(color) => {}} />
            <PropertyInput label="Top" value={0} onChange={(top) => {}} />
            <PropertyInput label="Left" value={0} onChange={(left) => {}} />
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
