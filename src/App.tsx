import React, {useState} from 'react'
import styled from 'styled-components'

import {Canvas} from './Canvas'
import {LeftSidebar} from './LeftSidebar'
import {RightSidebar} from './RightSidebar'
import {GlobalStyles} from './ui'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
`

type Element = {
    id: number
    top: number
    left: number
    color: string
}

type SelectedElement = number | undefined

type ElementsContext = {
    elements: Element[]
    setElements: React.Dispatch<React.SetStateAction<Element[]>>
    selectedElement: SelectedElement
    setSelectedElement: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const ElementsContext = React.createContext<ElementsContext>({
    elements: [],
    setElements: () => {},
    selectedElement: undefined,
    setSelectedElement: () => {},
})

const App: React.FC = () => {
    const [elements, setElements] = useState<Element[]>([])
    const [selectedElement, setSelectedElement] = useState<number | undefined>()

    return (
        <ElementsContext.Provider value={{elements, setElements, selectedElement, setSelectedElement}}>
            <Container>
                <LeftSidebar />
                <Canvas />
                <RightSidebar />
                <GlobalStyles />
            </Container>
        </ElementsContext.Provider>
    )
}

function Root() {
    return <App />
}

export default Root
