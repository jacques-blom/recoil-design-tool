import React from 'react'
import {DraggableCore} from 'react-draggable'
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    width: 200px;
    height: 170px;
    background-color: rgba(60, 60, 60, 0.4);
    backdrop-filter: blur(20px);
`

const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Label = styled.input`
    background-color: transparent;
    width: 100%;
    border: 0;
    font-size: 17px;
    outline: none;
    text-align: center;
    color: #fff;
`

type ElementProps = {
    top: number
    left: number
    onDrag: (top: number, left: number) => void
    onSelect: () => void
}

export const Element: React.FC<ElementProps> = ({top, left, onDrag, onSelect}) => {
    return (
        <Container style={{top, left}} onMouseDown={onSelect}>
            <DraggableCore onDrag={(e: any) => onDrag(top + e.movementY, left + e.movementX)}>
                <InnerContainer>
                    <Label value="Hello world" />
                </InnerContainer>
            </DraggableCore>
        </Container>
    )
}
