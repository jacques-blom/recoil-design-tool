import React from 'react'
import styled from 'styled-components'
import {Canvas} from './Canvas'
import {LeftSidebar} from './LeftSidebar/LeftSidebar'
import {RightSidebar} from './RightSidebar/RightSidebar'
import {GlobalStyles} from './ui/GlobalStyles'
import {RecoilRoot} from 'recoil'

const AppContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
`

const App: React.FC = () => (
    <AppContainer>
        <LeftSidebar />
        <Canvas />
        <RightSidebar />
    </AppContainer>
)

/**
 * An app that uses Recoil needs to be wrapped
 * in a single RecoilRoot component
 */
const Root = () => (
    <RecoilRoot>
        <App />
        <GlobalStyles />
    </RecoilRoot>
)

export default Root
