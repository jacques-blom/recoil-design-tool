// @ts-ignore
import {atom} from 'recoil'
import memoize from 'lodash.memoize'

export const elementsState = atom({
    key: 'elements',
    default: [],
})

export const selectedElementsState = atom({
    key: 'selectedElements',
    default: [],
})

export const keyPressedState = memoize((key: 'shift') =>
    atom({
        key: `keyPressed-${key}`,
        default: false,
    }),
)
