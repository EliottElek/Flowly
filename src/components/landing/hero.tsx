import React from 'react'
import Image from 'next/image'
import hero from '@/images/hero.png'
import heroDark from '@/images/herodark.png'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { HeroPattern } from '../hero-pattern'
const Hero = ({ user }: { user: any }) => {
    return (
        <div className="relative isolate pt-3">
            <div className="py-24 sm:py-32 lg:pb-40">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-5xl text-center">
                        <h1 className="text-balance text-5xl font-medium tracking-tight sm:text-6xl">
                            <span className=" font-bold">Flowly</span>, the open-source <span className="text-emerald-400">ticket management</span> platform you've been looking for.
                        </h1>
                        <p className="mt-8 text-pretty text-lg font-normal opacity-60">
                            Fully open source Trello like management app, with support for markdown.
                        </p>
                        <div className="mt-10 flex items-center font-bold justify-center gap-x-6">
                            <Link href={user ? "/dashboard" : "/login"} className="text-sm/6">
                                <Button className='text-white font-bold bg-emerald-600 hover:bg-emerald-500'>
                                    {user ? "Dashboard" : "Deploy in seconds"}
                                </Button>
                            </Link>
                            <Link href={"/docs"} className="text-sm/6">
                                <Button variant={"ghost"}>
                                    Read the docs <span aria-hidden="true">&rarr;</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-16 flow-root sm:mt-24">
                        <div className="-m-2 dark:block hidden rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <Image
                                alt="App screenshot"
                                src={heroDark}
                                width={2432}
                                height={1442}
                                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                            />
                        </div>
                        <div className="-m-2 block dark:hidden rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <Image
                                alt="App screenshot"
                                src={hero}
                                width={2432}
                                height={1442}
                                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <HeroPattern />

        </div>
    )
}

export default Hero