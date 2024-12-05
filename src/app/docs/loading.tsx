import Logo from '@/components/logo'
import React from 'react'

const loading = () => {
    return (
        <div className='container mx-auto'>
            <div className='flex items-center grow justify-center h-[90vh] animate-pulse'>
            <Logo className = "h-9"/>
            </div>
        </div>
    )
}

export default loading