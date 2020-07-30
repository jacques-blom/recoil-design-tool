import {useRef, useEffect} from 'react'

/**
 * Returns the width and height for the specified image.
 */
export const getImageDimensions = (src: string) => {
    return new Promise<{width: number; height: number}>((resolve, reject) => {
        const image = new Image()
        const resolveDimesions = () => resolve({width: image.width, height: image.height})
        image.src = src
        if (image.complete) {
            return resolveDimesions()
        }
        image.onload = () => {
            resolveDimesions()
        }
        image.onerror = (error) => {
            reject(error)
        }
    })
}

/**
 * A hook that will return a debounced version of the provided function.
 */
export function useDebounce<TArgs extends unknown[]>(set: (...args: TArgs) => void, duration: number) {
    const mouseDownTimeout = useRef<number>()

    useEffect(() => {
        const timeout = mouseDownTimeout.current
        return () => clearTimeout(timeout)
    }, [])

    return (...args: TArgs) => {
        clearTimeout(mouseDownTimeout.current)
        mouseDownTimeout.current = setTimeout(() => set(...args), duration)
    }
}

/**
 * Capitalises the first character in a string.
 */
export const capitalizeFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * A function that returns a random image URL and that image's
 * seed, which can be used to refer back to that image in API requests.
 */
export const getRandomImageUrl = () => {
    const seed = Date.now()
    return {src: `https://recoil-design-tool.jacquesblom.com/.netlify/functions/random-image/?seed=${seed}`, seed}
}
