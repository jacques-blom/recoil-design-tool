import {useRecoilCallback, useRecoilState} from 'recoil'
import {elementsState, elementState, defaultStyle, ElementState} from '../Element/elementState'
import randomMC from 'random-material-color'
import {getRandomImageUrl} from '../utils'

/**
 * A hook that returns a function that can be called
 * to insert a new Element of a given type.
 */
export const useInsertElement = () => {
    const [elements, setElements] = useRecoilState(elementsState)

    return useRecoilCallback(
        ({set}) => {
            return (type: ElementState['type']) => {
                const newId = elements.length

                setElements((elements) => [...elements, newId])

                if (type === 'rectangle') {
                    set(elementState(newId), {
                        type: 'rectangle',
                        style: defaultStyle,
                        color: randomMC.getColor({shades: ['500']}),
                    })
                } else if (type === 'image') {
                    const randomImage = getRandomImageUrl()

                    set(elementState(newId), {
                        type: 'image',
                        style: defaultStyle,
                        src: randomImage.src,
                        seed: randomImage.seed,
                    })
                }
            }
        },
        [elements],
    )
}
