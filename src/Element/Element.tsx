import React from 'react'
import {useRecoilValue} from 'recoil'
import {elementState} from './elementState'
import {ElementContainer} from './ElementContainer'
import hexToRgba from 'hex-to-rgba'

export const Element: React.FC<{id: number}> = ({id}) => {
    const element = useRecoilValue(elementState(id))
    const backgroundColor = element.type === 'rectangle' ? hexToRgba(element.color, 0.6) : undefined

    return <ElementContainer id={id} style={{backgroundColor}}></ElementContainer>
}
