import React from 'react'
import {SidebarSection} from '../ui/Sidebar'
import {Detail, DetailFallback} from '../ui/Typography'
import {selector, useRecoilValue} from 'recoil'
import {selectedElementState} from '../Element/elementState'

const imageSeedState = selector({
    key: 'imageSeed',
    get: ({get}) => {
        const selectedElement = get(selectedElementState)
        if (!selectedElement || selectedElement.type !== 'image') return null

        return selectedElement.seed
    },
})

const imageDetailsState = selector({
    key: 'imageDetails',
    get: ({get}) => {
        const seed = get(imageSeedState)
        if (!seed) return null

        return fetch(
            `https://recoil-design-tool.jacquesblom.com/.netlify/functions/image-details/?seed=${seed}`,
        ).then((res) => res.json())
    },
})

export const DetailsFallback: React.FC = () => {
    return (
        <SidebarSection title="Details">
            <DetailFallback label="Author" />
            <DetailFallback label="Original Image" />
        </SidebarSection>
    )
}

export const Details: React.FC = () => {
    const imageDetails = useRecoilValue(imageDetailsState)
    if (!imageDetails) return null

    return (
        <SidebarSection title="Details">
            <Detail label="Author" value={imageDetails.author} />
            <Detail label="Original Image" value={imageDetails.url} />
        </SidebarSection>
    )
}
