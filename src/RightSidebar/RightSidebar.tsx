import React, {Suspense} from 'react'
import {Sidebar} from '../ui/Sidebar'
import {Properties} from './Properties'
import {Details, DetailsFallback} from './Details'

export const RightSidebar: React.FC = () => (
    <Sidebar>
        <Properties />
        <Suspense fallback={<DetailsFallback />}>
            <Details />
        </Suspense>
    </Sidebar>
)
