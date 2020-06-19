import React from 'react'
// @ts-ignore
import {useRecoilState, atom, selector, useSetRecoilState} from 'recoil'
import memoize from 'lodash.memoize'
import {DraggableCore} from 'react-draggable'
import {selectedElementsState, keyPressedState} from './elementsState'
import styled, {css} from 'styled-components'

export const elementState = memoize((id: number) => {
    return atom({
        key: `element${id}`,
        default: {
            label: 'Hello world',
            size: {width: 250, height: 150},
            position: {top: 0, left: 0},
            fill: '#2E2E2F',
        },
    })
})

export const isSelectedState = memoize((id: number) => {
    return selector({
        key: `isSelected${id}`,
        get: ({get}: any) => {
            const selectedElements = get(selectedElementsState)
            return selectedElements.includes(id)
        },
        set: ({set, get}: any) => {
            const selectedElements = get(selectedElementsState)
            const shiftKeyPressed = get(keyPressedState('shift'))

            if (shiftKeyPressed && !selectedElements.includes(id)) {
                set(selectedElementsState, [...selectedElements, id])
            } else {
                set(selectedElementsState, [id])
            }
        },
    })
})

const Container = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
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

export const Element: React.FC<{id: number}> = ({id}) => {
    const [element, setElement] = useRecoilState(elementState(id))
    const setSelected = useSetRecoilState(isSelectedState(id))

    return (
        <DraggableCore
            onDrag={(e: any) => {
                setElement((el: any) => ({
                    ...el,
                    position: {
                        top: el.position.top + e.movementY,
                        left: el.position.left + e.movementX,
                    },
                }))
            }}
        >
            <div>
                <Container
                    style={{
                        backgroundColor: element.fill,
                        ...element.size,
                        ...element.position,
                    }}
                    onMouseDown={setSelected}
                >
                    <Label
                        value={element.label}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                            setElement((el: any) => ({
                                ...el,
                                label: e.currentTarget.value,
                            }))
                        }
                    />
                </Container>
            </div>
        </DraggableCore>
    )
}
