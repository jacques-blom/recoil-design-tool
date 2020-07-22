import React from 'react'
import styled from 'styled-components'
import {colors} from './constants'
import {Label} from './Typography'

export const Input = styled.input`
    background-color: ${colors.darkGray};
    border-radius: 10px;
    padding: 10px;
    border: 0;
    width: 100%;
    outline: none;
    color: white;
    font-size: 16px;
`

export const InputGroup: React.FC = ({children}) => {
    const childCount = React.Children.count(children)

    return (
        <div>
            {React.Children.map(children, (child, index) => {
                if (!child) return null
                return (
                    <>
                        {child}
                        {index !== childCount - 1 && <div style={{height: 20}} />}
                    </>
                )
            })}
        </div>
    )
}

type NumberInputProps = {
    label: string
    value: number
    onChange: (value: number) => void
}

export const NumberInput: React.FC<NumberInputProps> = ({label, value, onChange}) => (
    <>
        <Label>{label}</Label>
        <Input type="number" value={value} onChange={(e) => onChange(Number(e.currentTarget.value))} />
    </>
)
