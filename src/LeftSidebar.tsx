import React, {useContext} from 'react'
import {Sidebar, Title} from './ui'
import styled from 'styled-components'
import {FiSquare, FiImage} from 'react-icons/fi'
import {ElementsContext} from './App'

const InsertButton = styled.button`
    width: 60px;
    height: 60px;
    background-color: rgba(10, 10, 10, 0.3);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    border: 0;
`

export const LeftSidebar: React.FC = () => {
    const {setElements} = useContext(ElementsContext)

    return (
        <Sidebar>
            <Title>Insert</Title>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <InsertButton
                    onClick={() => {
                        setElements((elements) => {
                            return [
                                ...elements,
                                {
                                    id: elements.length,
                                    top: 0,
                                    left: 0,
                                },
                            ]
                        })
                    }}
                >
                    <FiSquare color="white" size={35} />
                </InsertButton>
                <div style={{width: 15}} />
                <InsertButton>
                    <FiImage color="white" size={35} />
                </InsertButton>
            </div>
        </Sidebar>
    )
}
