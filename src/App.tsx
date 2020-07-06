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

type ElementsContext = {
    elements: number[]
    setElements: React.Dispatch<React.SetStateAction<number[]>>
}

export const ElementsContext = React.createContext<ElementsContext>({
    elements: [],
    setElements: () => {},
})

const App: React.FC = () => {
    const [elements, setElements] = useState<number[]>([])

    return (
        <ElementsContext.Provider value={{elements, setElements}}>
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
