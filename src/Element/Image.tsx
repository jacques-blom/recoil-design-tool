import React from 'react'

type ImageProps = {
    id: number
}

export const Image: React.FC<ImageProps> = ({id}) => {
    return (
        <div
            style={{
                backgroundImage: `url('')`,
                backgroundSize: '100% 100%',
                flex: 1,
            }}
        />
    )
}
