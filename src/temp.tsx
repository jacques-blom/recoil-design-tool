// const ElementLayerContainer = styled.button<{selected: boolean}>`
//     margin: 0;
//     padding: 0;
//     border: 0;
//     padding: 10px;
//     background-color: transparent;
//     border-radius: 3px;
//     font-size: 16px;
//     color: #fff;
//     width: 100%;
//     margin-bottom: 10px;
//     text-align: left;

//     ${(props) =>
//         props.selected &&
//         css`
//             background-color: #565656;
//         `}
// `

// const ElementLayer: React.FC<{id: number}> = ({id}) => {
//     const [element] = useRecoilState(elementState(id))
//     const [isSelected, setSelected] = useState(false)

//     return (
//         <ElementLayerContainer
//             selected={isSelected}
//             onClick={() => {
//                 setSelected(!isSelected)
//             }}
//         >
//             {element.label}
//         </ElementLayerContainer>
//     )
// }

export default null
