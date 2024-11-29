import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Logo = ({ className }: { className?: string }) => {
    return (
        <Link href="/dashboard">
            <Image alt="reconurge" className={className} height={150} width={150} src='/logo.png' />
        </Link>
    )
}

export default Logo