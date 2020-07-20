// @ts-ignore
import randomMC from 'random-material-color'
import {atomFamily, atom, selectorFamily} from 'recoil'

export const elementsState = atom<number[]>({
    key: 'elements',
    default: [],
})

type CommonState = {
    style: {
        top: number
        left: number
        width: number
        height: number
    }
}

type RectangleState = {
    type: 'rectangle'
    color: string
}

export type ElementState = CommonState & RectangleState

export const defaultStyle = {
    top: 20,
    left: 20,
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
