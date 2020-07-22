import React from 'react'
import styled from 'styled-components'
import {colors} from './constants'
import {Title} from './Typography'
import {InputGroup} from './Input'

export const Sidebar = styled.div`
    width: 300px;
    height: 100%;
    background-color: ${colors.lightGray};
    padding: 20px;
`

export const SidebarSection: React.FC<{title: string}> = ({title, children}) => (
    <div style={{marginBottom: 30}}>
        <Title>{title}</Title>
        <InputGroup>{children}</InputGroup>
    </div>
)
