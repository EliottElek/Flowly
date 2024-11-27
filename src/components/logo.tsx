import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Logo = () => {
    return (
        <Link href="/dashboard">
            <Image alt="reconurge" height={50} width={50} src='/logo.png' />
        </Link>
    )
}

export default Logo