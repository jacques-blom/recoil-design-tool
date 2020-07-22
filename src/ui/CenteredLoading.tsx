import React from 'react'
import {Spinner} from './Spinner'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`

export const CenteredLoading: React.FC = () => (
    <Container>
        <Spinner />
    </Container>
)
