import React, {useState} from 'react'
import {Sidebar, Title} from './ui'
import styled from 'styled-components'
import {FiSquare, FiImage} from 'react-icons/fi'

const InsertButton = styled.button`
    width: 40px;
    height: 40px;
    background-color: #565656;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    border: 0;
`

export const LeftSidebar: React.FC = () => {
    const [elements, setElements] = useState<number[]>([])

    return (
        <Sidebar>
            <Title>Insert</Title>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <InsertButton
                    onClick={() => {
                        setElements((elements: number[]) => {
                            return [...elements, elements.length]
                        })
                    }}
                >
                    <FiSquare color="white" size={30} />
                </InsertButton>
                <div style={{width: 15}} />
                <InsertButton>
                    <FiImage color="white" size={30} />
                </InsertButton>
            </div>
        </Sidebar>
    )
}
