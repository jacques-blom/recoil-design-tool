import React, {useContext} from 'react'
import styled from 'styled-components'
import {Element} from './Element'
import {ElementsContext} from './App'

const CanvasContainer = styled.div`
    flex: 1;
    position: relative;
`

export const Canvas: React.FC = () => {
    const {elements, setSelectedElement, setElements} = useContext(ElementsContext)

    return (
        <CanvasContainer>
            {elements.map((element) => {
                return (
                    <Element
                        key={element.id}
                        top={element.top}
                        left={element.left}
                        onDrag={(top, left) => {
                            setElements(
                                elements.map((el) => {
                                    if (el.id === element.id) {
                                        return {
                                            ...el,
                                            top,
                                            left,
                                        }
                                    } else {
                                        return el
                                    }
                                }),
                            )
                        }}
                        onSelect={() => setSelectedElement(element.id)}
                    />
                )
            })}
        </CanvasContainer>
    )
}
