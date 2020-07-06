import React from 'react'
import {DraggableCore} from 'react-draggable'
import styled from 'styled-components'
import hexToRgba from 'hex-to-rgba'

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
    align-items: center;
    justify-content: center;
`

type ElementProps = {
    top: number
    left: number
    color: string
    onDrag: (top: number, left: number) => void
    onSelect: () => void
}

export const Element: React.FC<ElementProps> = ({top, left, color, onDrag, onSelect}) => {
    return (
        <Container style={{top, left, backgroundColor: hexToRgba(color, 0.45)}} onMouseDown={onSelect}>
            <DraggableCore onDrag={(e: any) => onDrag(top + e.movementY, left + e.movementX)}>
                <InnerContainer />
            </DraggableCore>
        </Container>
    )
}
