import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Logo = ({ className }: { className?: string }) => {
    return (
        <Link className='' href="/dashboard">
            <Image alt="reconurge" className={"h-6 w-6"} height={350} width={350} src='/logo.svg' />
        </Link>
    )
}

export default Logo