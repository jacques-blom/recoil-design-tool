import React from 'react'
import {Sidebar, Title} from './ui'
import styled from 'styled-components'
import {FiSquare, FiImage} from 'react-icons/fi'
import {useRecoilCallback, useRecoilState} from 'recoil'
import {ElementType, elementsState, elementState} from './state'
// @ts-ignore
import randomMC from 'random-material-color'

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

const useInsertElement = () => {
    const [elements, setElements] = useRecoilState(elementsState)

    return useRecoilCallback(
        ({set}) => {
            return (type: ElementType) => {
                const newId = elements.length

                setElements((elements) => [...elements, newId])

                if (type === 'rectangle') {
                    set(elementState(newId), {
                        type,
                        style: {
                            top: 0,
                            left: 0,
                            width: 200,
                            height: 170,
                        },
                        color: randomMC.getColor({shades: ['500']}),
                    })
                }
            }
        },
        [elements],
    )
}

export const LeftSidebar: React.FC = () => {
    const insertElement = useInsertElement()

    return (
        <Sidebar>
            <Title>Insert</Title>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <InsertButton onClick={() => insertElement('rectangle')}>
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
