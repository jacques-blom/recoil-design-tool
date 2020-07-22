import React from 'react'

export const ButtonGroup: React.FC = ({children}) => {
    const childCount = React.Children.count(children)

    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {React.Children.map(children, (child, index) => (
                <>
                    {child}
                    {index !== childCount - 1 && <div style={{width: 20}} />}
                </>
            ))}
        </div>
    )
}
