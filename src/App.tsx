import React, {Suspense} from 'react'
import styled from 'styled-components'
import {Canvas} from './Canvas'
import {LeftSidebar} from './LeftSidebar/LeftSidebar'
import {RightSidebar} from './RightSidebar/RightSidebar'
import {GlobalStyles} from './ui/GlobalStyles'
import {RecoilRoot} from 'recoil'
import {CenteredLoading} from './ui/CenteredLoading'
import {TopBanner, BottomBanner} from './Banner'

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
`

const AppColumns = styled.div`
    display: flex;
    flex: 1;
`

const App: React.FC = () => (
    <Suspense fallback={<CenteredLoading />}>
        <AppContainer>
            <TopBanner />
            <AppColumns>
                <LeftSidebar />
                <Canvas />
                <RightSidebar />
            </AppColumns>
            <BottomBanner />
        </AppContainer>
    </Suspense>
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
