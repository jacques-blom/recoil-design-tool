import {useEffect, useRef} from 'react'

type OnChange = (pressed: boolean) => void

export const useKeyPressed = (keyCode: number, onChange: OnChange) => {
    const onChangeRef = useRef(onChange)
    useEffect(() => {
        onChangeRef.current = onChange
    }, [onChange])

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            if (keyCode === event.keyCode) onChangeRef.current(true)
        }
        const keyup = (event: KeyboardEvent) => {
            if (keyCode === event.keyCode) onChangeRef.current(false)
        }

        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)

        return () => {
            document.removeEventListener('keydown', keydown)
            document.removeEventListener('keyup', keyup)
        }
    }, [keyCode])
}

const smallest = (arr: number[]) => {
    const sorted = arr.concat().sort((a, b) => a - b)
    return sorted[0]
}

const largest = (arr: number[]) => {
    const sorted = arr.concat().sort((a, b) => a - b)
    return sorted[sorted.length - 1]
}

type Element = {position: {top: number; left: number}; size: {width: number; height: number}}

export const calculateSelectionBounds = (elements: Element[]) => {
    const top = smallest(elements.map((element) => element.position.top))
    const left = smallest(elements.map((element) => element.position.left))
    const right = largest(elements.map((element) => element.position.left + element.size.width))
    const bottom = largest(elements.map((element) => element.position.top + element.size.height))

    return {top, left, width: right - left, height: bottom - top}
}
