import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import hero from '@/images/hero.png'
import heroDark from '@/images/herodark.png'
import { HeroPattern } from "@/components/hero-pattern"
import Features from "@/components/landing/features"
import Cta from "@/components/landing/cta"
import Footer from "@/components/landing/footer"

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

export default async function Home() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    return (
        <div className="bg-background overflow-hidden">
            <header className="absolute h-14 sticky top-0 bg-background/10 backdrop-blur inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex h-full items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Logo />
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm/6 font-semibold">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link href={data?.user ? "/dashboard" : "/login"} className="text-sm/6 font-semibold">
                            {data?.user ? "Dashboard" : "Login"} <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="relative isolate pt-3">
                <div className="py-24 sm:py-32 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto max-w-5xl text-center">
                            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
                                The open-source <span className="text-emerald-400">ticket management</span> platform you've been looking for.
                            </h1>
                            <p className="mt-8 text-pretty text-lg font-normal opacity-60">
                                Fully open source Trello like management app, with support for markdown.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link href={data?.user ? "/dashboard" : "/login"} className="text-sm/6 font-semibold text-gray-900">
                                    <Button>
                                        {data?.user ? "Dashboard" : "Deploy in seconds"}
                                    </Button>
                                </Link>
                                <Link href={"/docs"} className="text-sm/6 font-semibold">
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
            <Features />
            <Cta />
            <Footer />
        </div>
    )
}
