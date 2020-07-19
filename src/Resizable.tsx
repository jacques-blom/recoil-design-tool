import React from 'react'
import {Resizable as ReactResizable} from 'react-resizable'
import styled, {css} from 'styled-components'
import {useRecoilState, useRecoilValue} from 'recoil'
import {elementState, isSelectedState} from './state'

export const Resizable: React.FC<{id: number}> = ({children, id}) => {
    const [element, setElement] = useRecoilState(elementState(id))
    const isSelected = useRecoilValue(isSelectedState(id))

    return (
        <ReactResizable
            width={element.style.width}
            height={element.style.height}
            onResize={(_, {size}) => {
                setElement((element) => ({
                    ...element,
                    style: {...element.style, ...size},
                }))
            }}
            resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
            handle={(h) => <Handle className={`handle-${h}`} isVisible={isSelected} />}
        >
            {children}
        </ReactResizable>
    )
}

const Handle = styled.span<{isVisible: boolean}>`
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #b1e4ff;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    transition: 0.1s opacity ease-in-out;

    ${(props) =>
        props.isVisible &&
        css`
            opacity: 1;
            pointer-events: initial;
        `}

    &.handle-sw {
        bottom: 1px;
        left: 1px;
        cursor: sw-resize;
    }
    &.handle-se {
        bottom: 1px;
        right: 1px;
        cursor: se-resize;
    }
    &.handle-nw {
        top: 1px;
        left: 1px;
        cursor: nw-resize;
    }
    &.handle-ne {
        top: 1px;
        right: 1px;
        cursor: ne-resize;
    }
    &.handle-w,
    &.handle-e {
        top: 50%;
        margin-top: -4px;
        cursor: ew-resize;
    }
    &.handle-w {
        left: -4px;
    }
    &.handle-e {
        right: -4px;
    }
    &.handle-n,
    &.handle-s {
        left: 50%;
        margin-left: -4px;
        cursor: ns-resize;
    }
    &.handle-n {
        top: -4px;
    }
    &.handle-s {
        bottom: -4px;
    }
`
