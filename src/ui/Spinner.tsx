import React from 'react'
import styled, {keyframes} from 'styled-components'
import {colors} from './constants'

const rotator = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(270deg);
    }
`

const Container = styled.svg`
    animation: ${rotator} 1.4s linear infinite;
`

const dash = keyframes`
    0% {
        stroke-dashoffset: 187;
    }
    50% {
        stroke-dashoffset: 46.75;
        transform: rotate(135deg);
    }
    100% {
        stroke-dashoffset: 187;
        transform: rotate(450deg);
    }
`

const Path = styled.circle`
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${dash} 1.4s ease-in-out infinite;
    stroke: ${colors.primary};
`

export const Spinner: React.FC = () => (
    <Container width="30px" height="30px" viewBox="0 0 66 66">
        <Path fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
    </Container>
)
