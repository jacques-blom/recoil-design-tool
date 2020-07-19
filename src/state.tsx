// @ts-ignore
import randomMC from 'random-material-color'
import {atomFamily, atom, selectorFamily} from 'recoil'

export const elementsState = atom<number[]>({
    key: 'elements',
    default: [],
})

export type ElementType = 'rectangle' | 'image'

type RectangleState = {
    type: 'rectangle'
    color: string
}

type ImageState = {
    type: 'image'
    src: string
}

export type ElementState = {
    type: ElementType
    style: {
        top: number
        left: number
        width: number
        height: number
    }
} & (RectangleState | ImageState)

export const defaultStyle = {
    top: 0,
    left: 0,
    width: 200,
    height: 170,
}

export const elementState = atomFamily<ElementState, number>({
    key: 'element',
    default: () => ({
        type: 'rectangle',
        style: defaultStyle,
        color: randomMC.getColor({shades: ['500']}),
    }),
})

export const selectedElementIdState = atom<null | number>({
    key: 'selectedElementId',
    default: null,
})

export const isSelectedState = selectorFamily({
    key: 'isSelected',
    get: (id) => ({get}) => {
        const selectedElementId = get(selectedElementIdState)
        return selectedElementId === id
    },
})
