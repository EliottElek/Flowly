import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Logo = ({ className }: { className?: string }) => {
    return (
        <Link className='' href="/dashboard">
            <Image alt="reconurge" className={"h-8 w-8"} height={350} width={350} src='/logo.png' />
        </Link>
    )
}

export default Logo