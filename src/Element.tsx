import React from 'react'
import {useRecoilValue} from 'recoil'
import {elementState} from './state'
import {ElementContainer} from './ElementContainer'

export const Element: React.FC<{id: number}> = ({id}) => {
    const element = useRecoilValue(elementState(id))
    const backgroundColor = element.type === 'rectangle' ? element.color : undefined

    return <ElementContainer id={id} style={{backgroundColor}} />
}
