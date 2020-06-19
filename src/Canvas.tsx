import React, {useState} from 'react'
import styled from 'styled-components'
import {Element} from './Element'

const CanvasContainer = styled.div`
    flex: 1;
    position: relative;
`

export const Canvas: React.FC = ({children}) => {
    const [backgroundColor] = useState('#101010')
    const [elements] = useState<number[]>([])

    return (
        <CanvasContainer
            style={{backgroundColor}}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    // Deselect all elements
                }
            }}
        >
            {elements.map((element) => {
                return <Element key={element} id={element} />
            })}
            {children}
        </CanvasContainer>
    )
}
