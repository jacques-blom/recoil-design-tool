import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import {useSetRecoilState, useRecoilValue} from 'recoil'
import {Resizable} from './Resizable'
import {elementState, selectedElementIdsState, isSelectedState} from './elementState'
import {Draggable} from './Draggable'
import {colors} from '../ui/constants'
import {useShiftKeyPressed} from './useShftKeyPressed'

const Container = styled.div<{mouseDown: boolean; isSelected: boolean}>`
    position: absolute;
    box-shadow: 0 0 0 0 transparent;
    border-radius: 20px;
    width: 200px;
    height: 170px;
    backdrop-filter: blur(10px);
    transition: 0.1s transform ease-out, 0.1s box-shadow ease-out, 0.1s border-color ease-out;
    border: 2px solid ${(props) => (props.isSelected ? colors.primary : 'transparent')};
    background-color: ${colors.lightGray};

    ${(props) =>
        props.mouseDown &&
        css`
            transform: scale(1.2);
            box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.3);
        `}
`

const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 20px;
`

type ElementProps = {
    id: number
    style?: React.CSSProperties
}

/**
 * Provides the basic styling and common functionality
 * (dragging / resizing / mouseDown state / selected state) for Elements.
 */
export const ElementContainer: React.FC<ElementProps> = ({id, style, children}) => {
    const element = useRecoilValue(elementState(id))
    const [mouseDown, setMouseDown] = useState(false)
    const setSelectedElement = useSetRecoilState(selectedElementIdsState)
    const isSelected = useRecoilValue(isSelectedState(id))
    const shiftKeyPressed = useShiftKeyPressed()

    return (
        <Resizable id={id}>
            <Container
                style={{...element.style, ...style}}
                mouseDown={mouseDown}
                isSelected={isSelected}
                onMouseDown={() => {
                    setSelectedElement((ids) => {
                        // Do nothing if the element is already selected
                        if (isSelected) return ids

                        // Add this element to the selection if shift is pressed
                        if (shiftKeyPressed) return [...ids, id]

                        // Otherwise, make this one the only selected element
                        return [id]
                    })
                }}
            >
                <Draggable id={id} mouseDown={mouseDown} setMouseDown={setMouseDown}>
                    <InnerContainer>{children}</InnerContainer>
                </Draggable>
            </Container>
        </Resizable>
    )
}
