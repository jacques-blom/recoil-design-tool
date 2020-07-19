import React, {useState} from 'react'
import {DraggableCore} from 'react-draggable'
import styled from 'styled-components'
import hexToRgba from 'hex-to-rgba'
// @ts-ignore
import randomMC from 'random-material-color'
import {atomFamily, useRecoilState, atom, useSetRecoilState} from 'recoil'

const Container = styled.div`
    position: absolute;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    border-radius: 20px;
    width: 200px;
    height: 170px;
    backdrop-filter: blur(10px);
    transition: 0.2s transform ease-in-out, 0.2s box-shadow ease-in-out;
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
        color: randomMC.getColor({shades: ['500']}),
    }),
})

export const selectedElementIdState = atom<null | number>({
    key: 'selectedElementId',
    default: null,
})

export const Element: React.FC<ElementProps> = ({id}) => {
    const [element, setElement] = useRecoilState(elementState(id))
    const [mouseDown, setMouseDown] = useState(false)
    const setSelectedElement = useSetRecoilState(selectedElementIdState)

    if (element.type !== 'rectangle') return null

    return (
        <Container
            style={{
                top: element.top,
                left: element.left,
                backgroundColor: hexToRgba(element.color, 0.6),
                transform: `scale(${mouseDown ? 1.1 : 1})`,
                boxShadow: mouseDown ? `0 8px 20px 0 rgba(0, 0, 0, 0.2)` : undefined,
            }}
            onMouseDown={() => {
                setMouseDown(true)
                setSelectedElement(id)
            }}
            onMouseUp={() => {
                setMouseDown(false)
            }}
        >
            <DraggableCore
                scale={mouseDown ? 1.1 : 1}
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
