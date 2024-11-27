"use client"
import { HeroPattern } from '@/components/hero-pattern'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const error = ({ error }: { error: Error & { digest?: string } }) => {
    return (
        <div className='flex items-center justify-center flex-col h-screen gap-4'>
            <HeroPattern />
            <h1 className='font-semibold text-2xl'>An error occured. It's probably our fault.</h1>
            <p>Please move back to safe place now.</p>
            <Link href="/dashboard"><Button>Go back to dashboard</Button></Link>
            {/* {JSON.stringify(error)} */}
        </div>
    )
}

export default error