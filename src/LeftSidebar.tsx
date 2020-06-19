import React from 'react'
import {
    useRecoilState,
    // @ts-ignore
} from 'recoil'
import {Sidebar, Title} from './ui'
import styled, {css} from 'styled-components'
import {elementState, isSelectedState} from './Element'
import {FiSquare, FiImage} from 'react-icons/fi'
import {elementsState, selectedElementsState} from './elementsState'

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

const ElementLayerContainer = styled.button<{selected: boolean}>`
    margin: 0;
    padding: 0;
    border: 0;
    padding: 10px;
    background-color: transparent;
    border-radius: 3px;
    font-size: 16px;
    color: #fff;
    width: 100%;
    margin-bottom: 10px;
    text-align: left;

    ${(props) =>
        props.selected &&
        css`
            background-color: #565656;
        `}
`

const ElementLayer: React.FC<{id: number}> = ({id}) => {
    const [element] = useRecoilState(elementState(id))
    const [isSelected, setSelected] = useRecoilState(isSelectedState(id))

    return (
        <ElementLayerContainer
            selected={isSelected}
            onClick={() => {
                setSelected(!isSelected)
            }}
        >
            {element.label}
        </ElementLayerContainer>
    )
}

export const LeftSidebar: React.FC = () => {
    const [elements, setElements] = useRecoilState(elementsState)
    const [selectedElements] = useRecoilState(selectedElementsState)

    console.log('selectedElements', selectedElements)

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
            <div style={{height: 20}} />
            <Title>Layers</Title>
            {elements.map((element: number) => (
                <ElementLayer key={element} id={element} />
            ))}
        </Sidebar>
    )
}
