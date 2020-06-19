import React from 'react'
// @ts-ignore
import {useRecoilState, useRecoilValue, atom, useSetRecoilState} from 'recoil'
import {Element} from './Element'
import styled from 'styled-components'
import {elementsState, selectedElementsState} from './elementsState'

export const canvasColorState = atom({
    key: 'canvasColor',
    default: '#1d1e1f',
})

const CanvasContainer = styled.div`
    flex: 1;
    position: relative;
`

export const Canvas: React.FC = ({children}) => {
    const backgroundColor = useRecoilValue(canvasColorState)
    const [elements] = useRecoilState(elementsState)
    const setSelected = useSetRecoilState(selectedElementsState)

    return (
        <CanvasContainer
            style={{backgroundColor}}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setSelected([])
                }
            }}
        >
            {elements.map((element: number) => {
                return <Element key={element} id={element} />
            })}
            {children}
        </CanvasContainer>
    )
}
