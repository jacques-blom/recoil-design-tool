import React from 'react'
import styled from 'styled-components'
import {Element} from './Element'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {elementsState, selectedElementIdState} from './state'

const CanvasContainer = styled.div`
    flex: 1;
    position: relative;
`

export const Canvas: React.FC = () => {
    const elements = useRecoilValue(elementsState)
    const setSelectedElement = useSetRecoilState(selectedElementIdState)

    return (
        <CanvasContainer
            onClick={(e) => {
                if (e.currentTarget === e.target) {
                    setSelectedElement(null)
                }
            }}
        >
            {elements.map((element) => {
                return <Element key={element} id={element} />
            })}
        </CanvasContainer>
    )
}
