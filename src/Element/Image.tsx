import React, {useEffect} from 'react'
import {useRecoilValue, selectorFamily, useSetRecoilState} from 'recoil'
import {elementState} from './elementState'
import {getImageDimensions} from '../utils'

type ImageProps = {
    id: number
}

const imageSrcState = selectorFamily({
    key: 'imageSrc',
    get: (id: number) => ({get}) => {
        const element = get(elementState(id))
        if (element.type !== 'image') return null

        return element.src
    },
})

const imageDimensionsState = selectorFamily({
    key: 'imageDimensions',
    get: (id: number) => ({get}) => {
        const src = get(imageSrcState(id))
        if (!src) return null

        return getImageDimensions(src)
    },
})

const useSetDefaultDimensions = (id: number) => {
    const imageDimensions = useRecoilValue(imageDimensionsState(id))
    const width = imageDimensions?.width
    const height = imageDimensions?.height

    const setElement = useSetRecoilState(elementState(id))

    useEffect(() => {
        if (!width || !height) return

        setElement((element) => {
            return {
                ...element,
                style: {
                    ...element.style,
                    width,
                    height,
                },
            }
        })
    }, [width, height, setElement])
}

export const Image: React.FC<ImageProps> = ({id}) => {
    useSetDefaultDimensions(id)

    const imageSrc = useRecoilValue(imageSrcState(id))
    if (!imageSrc) return null

    return (
        <div
            style={{
                backgroundImage: `url('${imageSrc}')`,
                backgroundSize: '100% 100%',
                flex: 1,
            }}
        />
    )
}
