import React, {useEffect} from 'react'
// @ts-ignore
import {RecoilRoot, useSetRecoilState, selector, useRecoilState} from 'recoil'
import styled, {createGlobalStyle} from 'styled-components'

import {Canvas} from './Canvas'
import {LeftSidebar} from './LeftSidebar'
import {RightSidebar} from './RightSidebar'
import {keyPressedState, elementsState, selectedElementsState} from './elementsState'
import {elementState} from './Element'

const GlobalStyles = createGlobalStyle`
    body {
        color: #FFF;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    * {
        box-sizing: border-box;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
`

const smallest = (arr: number[]) => {
    const sorted = arr.concat().sort((a, b) => a - b)
    return sorted[0]
}

const largest = (arr: number[]) => {
    const sorted = arr.concat().sort((a, b) => a - b)
    return sorted[sorted.length - 1]
}

const resizeBoxState = selector({
    key: 'resizeBox',
    get: ({get}: any) => {
        const selectedElements = get(selectedElementsState)
        if (selectedElements.length === 0) return false

        const selectedElementsInternalState = selectedElements.map((id: number) => get(elementState(id)))

        const top = smallest(selectedElementsInternalState.map((e: any) => e.position.top))
        const left = smallest(selectedElementsInternalState.map((e: any) => e.position.left))
        const right = largest(selectedElementsInternalState.map((e: any) => e.position.left + e.size.width))
        const bottom = largest(selectedElementsInternalState.map((e: any) => e.position.top + e.size.height))

        return {top, left, width: right - left, height: bottom - top}
    },
})

const ResizeControl: React.FC = () => {
    const [resizeBox] = useRecoilState(resizeBoxState)

    return (
        <div
            style={{
                pointerEvents: 'none',
                position: 'absolute',
                border: '2px dashed blue',
                ...resizeBox,
            }}
        ></div>
    )
}

const App: React.FC = () => {
    const setShiftPressed = useSetRecoilState(keyPressedState('shift'))

    useEffect(() => {
        const SHIFT_KEY_CODE = 16
        const keydown = ({keyCode}: KeyboardEvent) => {
            if (keyCode === SHIFT_KEY_CODE) setShiftPressed(true)
        }
        const keyup = ({keyCode}: KeyboardEvent) => {
            if (keyCode === SHIFT_KEY_CODE) setShiftPressed(false)
        }

        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)

        return () => {
            document.removeEventListener('keydown', keydown)
            document.removeEventListener('keyup', keyup)
        }
    }, [setShiftPressed])

    return (
        <Container>
            <LeftSidebar />
            <Canvas>
                <ResizeControl />
            </Canvas>
            <RightSidebar />
        </Container>
    )
}

function Root() {
    return (
        <RecoilRoot>
            <App />
            <GlobalStyles />
        </RecoilRoot>
    )
}

export default Root
