import {useRef, useEffect} from 'react'

export const getImageDimensions = (src: string) => {
    return new Promise<{width: number; height: number}>((resolve, reject) => {
        const image = new Image()
        image.onload = () => {
            resolve({width: image.width, height: image.height})
        }
        image.onerror = (error) => {
            reject(error)
        }
        image.src = src
    })
}

export function useDelay<TArgs extends unknown[]>(set: (...args: TArgs) => void, duration: number) {
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
