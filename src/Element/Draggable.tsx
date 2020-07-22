import React from 'react'
import {DraggableCore} from 'react-draggable'
import {useSetRecoilState} from 'recoil'
import {elementState} from './elementState'
import {useDebounce} from '../utils'

type DraggableProps = {
    id: number
    mouseDown: boolean
    setMouseDown: (mouseDown: boolean) => void
}

export const Draggable: React.FC<DraggableProps> = ({id, mouseDown, setMouseDown, children}) => {
    const setElement = useSetRecoilState(elementState(id))
    const setMouseDownDelayed = useDebounce(setMouseDown, 100)

    return (
        <DraggableCore
            scale={mouseDown ? 1.1 : 1}
            onMouseDown={() => setMouseDownDelayed(true)}
            onStop={() => setMouseDownDelayed(false)}
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
