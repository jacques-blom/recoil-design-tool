import React from 'react'
import {IconButton} from '../ui/IconButton'
import {FiRefreshCw} from 'react-icons/fi'
import {Label} from '../ui/Typography'

export type RefreshButtonProps = {
    onClick: () => void
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({onClick}) => (
    <>
        <Label>Image</Label>
        <IconButton icon={FiRefreshCw} onClick={onClick} />
    </>
)
