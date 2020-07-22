import React from 'react'
import styled from 'styled-components'
import {Spinner} from '../ui/Spinner'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`

export const ElementFallback: React.FC = () => (
    <Container>
        <Spinner />
    </Container>
)
