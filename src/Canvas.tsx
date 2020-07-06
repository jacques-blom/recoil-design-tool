import React, {useContext} from 'react'
import styled from 'styled-components'
import {Element} from './Element'
import {ElementsContext} from './App'

const CanvasContainer = styled.div`
    flex: 1;
    position: relative;
`

export const Canvas: React.FC = () => {
    const {elements} = useContext(ElementsContext)

    return (
        <CanvasContainer>
            {elements.map((element) => {
                return <Element key={element} />
            })}
        </CanvasContainer>
    )
}
