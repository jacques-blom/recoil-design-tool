import React from 'react'
import {CommonState, selectedElementState} from '../Element/elementState'
import {NumberInput} from '../ui/Input'
import {capitalizeFirst} from '../utils'
import {useRecoilState} from 'recoil'

export const StyleInput: React.FC<{property: keyof CommonState['style']}> = ({property}) => {
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)
    if (!selectedElement) return null

    return (
        <NumberInput
            label={capitalizeFirst(property)}
            value={selectedElement.style[property]}
            onChange={(value) => {
                setSelectedElement({
                    ...selectedElement,
                    style: {...selectedElement.style, [property]: value},
                })
            }}
        />
    )
}
