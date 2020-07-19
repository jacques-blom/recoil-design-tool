import React from 'react'
import styled from 'styled-components'

import {Canvas} from './Canvas'
import {LeftSidebar} from './LeftSidebar'
import {RightSidebar} from './RightSidebar'
import {GlobalStyles} from './ui'
import {RecoilRoot} from 'recoil'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
`

const App: React.FC = () => {
    return (
        <Container>
            <LeftSidebar />
            <Canvas />
            <RightSidebar />
            <GlobalStyles />
        </Container>
    )
}

function Root() {
    return (
        <RecoilRoot>
            <App />
        </RecoilRoot>
    )
}

export default Root
