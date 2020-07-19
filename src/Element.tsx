import React from 'react'
import {DraggableCore} from 'react-draggable'
import styled from 'styled-components'
import hexToRgba from 'hex-to-rgba'
// @ts-ignore
import randomMC from 'random-material-color'
import {atomFamily, useRecoilState, atom, useSetRecoilState} from 'recoil'

const Container = styled.div`
    position: absolute;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    width: 200px;
    height: 170px;
    background-color: rgba(17, 17, 17, 0.45);
    backdrop-filter: blur(30px);
`

const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

type ElementProps = {
    id: number
}

type RectangleState = {
    type: 'rectangle'
    color: string
}

type ImageState = {
    type: 'image'
    url: string
}

export type ElementState = {
    top: number
    left: number
} & (RectangleState | ImageState)

export const elementState = atomFamily<ElementState, number>({
    key: 'element',
    default: () => ({
        type: 'rectangle',
        top: 0,
        left: 0,
        color: randomMC.getColor(),
    }),
})

export const selectedElementIdState = atom<null | number>({
    key: 'selectedElementId',
    default: null,
})

export const Element: React.FC<ElementProps> = ({id}) => {
    const [element, setElement] = useRecoilState(elementState(id))
    const setSelectedElement = useSetRecoilState(selectedElementIdState)

    if (element.type !== 'rectangle') return null

    return (
        <Container
            style={{top: element.top, left: element.left, backgroundColor: hexToRgba(element.color, 0.45)}}
            onMouseDown={() => setSelectedElement(id)}
        >
            <DraggableCore
                onDrag={(e: any) => {
                    setElement({
                        ...element,
                        top: element.top + e.movementY,
                        left: element.left + e.movementX,
                    })
                }}
            >
                <InnerContainer>
                    <div>Top: {element.top}</div>
                    <div>Left: {element.left}</div>
                </InnerContainer>
            </DraggableCore>
        </Container>
    )
}
