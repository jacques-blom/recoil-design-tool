import React from 'react'
import {FiSquare, FiImage} from 'react-icons/fi'
import {Sidebar} from '../ui/Sidebar'
import {Title} from '../ui/Typography'
import {IconButton} from '../ui/IconButton'
import {ButtonGroup} from '../ui/ButtonGroup'
import {useInsertElement} from './useInsertElement'

export const LeftSidebar: React.FC = () => {
    const insertElement = useInsertElement()

    return (
        <Sidebar>
            <Title>Insert</Title>
            <ButtonGroup>
                <IconButton icon={FiSquare} onClick={() => insertElement('rectangle')} />
                <IconButton icon={FiImage} onClick={() => insertElement('image')} />
            </ButtonGroup>
        </Sidebar>
    )
}
