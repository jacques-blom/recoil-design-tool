import React from 'react'
import {Sidebar, Title, colors} from './ui'
import styled from 'styled-components'
import {FiSquare, FiImage} from 'react-icons/fi'
import {useRecoilCallback, useRecoilState} from 'recoil'
import {ElementType, elementsState, elementState, defaultStyle} from './state'
// @ts-ignore
import randomMC from 'random-material-color'

const InsertButton = styled.button`
    width: 60px;
    height: 60px;
    background-color: ${colors.darkGray};
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
                        style: defaultStyle,
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
