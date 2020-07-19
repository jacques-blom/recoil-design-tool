import React from 'react'
import {DraggableCore} from 'react-draggable'
import {useSetRecoilState} from 'recoil'
import {elementState} from './state'

type DraggableProps = {
    id: number
    mouseDown: boolean
    setMouseDown: (mouseDown: boolean) => void
}

export const Draggable: React.FC<DraggableProps> = ({id, mouseDown, setMouseDown, children}) => {
    const setElement = useSetRecoilState(elementState(id))

    return (
        <DraggableCore
            scale={mouseDown ? 1.1 : 1}
            onMouseDown={() => setMouseDown(true)}
            onStop={() => setMouseDown(false)}
            onDrag={(e: any) => {
                setElement((element) => ({
                    ...element,
                    style: {
                        ...element.style,
                        top: element.style.top + e.movementY,
                        left: element.style.left + e.movementX,
                    },
                }))
            }}
        >
            {children}
        </DraggableCore>
    )
}
