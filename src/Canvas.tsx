import React from 'react'
import styled from 'styled-components'
import {Element} from './Element/Element'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {elementsState, selectedElementIdsState} from './Element/elementState'

const CanvasContainer = styled.div`
    flex: 1;
    position: relative;
`

export const Canvas: React.FC = () => {
    const elements = useRecoilValue(elementsState)
    const setSelectedElement = useSetRecoilState(selectedElementIdsState)

    return (
        <CanvasContainer
            onClick={(e) => {
                if (e.currentTarget === e.target) {
                    // Deselect all selected elements, when clicking on CanvasContainer
                    setSelectedElement([])
                }
            }}
        >
            {elements.map((element) => {
                return <Element id={element} />
            })}
        </CanvasContainer>
    )
}
