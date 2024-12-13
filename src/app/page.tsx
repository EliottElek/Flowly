import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Logo from "@/components/logo"
import { HeroPattern } from "@/components/hero-pattern"
import Features from "@/components/landing/features"
import Cta from "@/components/landing/cta"
import Footer from "@/components/landing/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import Hero from "@/components/landing/hero"

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Deploy', href: '/docs/supabase-setup' },
    { name: 'Docs', href: '/docs' },
    { name: 'Github', href: 'https://github.com/EliottElek/Flowly' },
]

export default async function Home() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()

    return (
        <>
            <header className="absolute h-14 sticky top-0 bg-backgroundinset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex h-full items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Logo />
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <span key={item.name}>
                                {item.href.startsWith("http") ?
                                    <a href={item.href} target="_blank" className="text-sm/6 font-semibold">
                                        {item.name}
                                    </a>
                                    :
                                    <Link href={item.href} className="text-sm/6 font-semibold">
                                        {item.name}
                                    </Link>}
                            </span>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 gap-3 items-center lg:justify-end">
                        <ThemeToggle />
                        <Link href={data?.user ? "/dashboard" : "/login"} className="text-sm/6 font-semibold">
                            {data?.user ? "Dashboard" : "Login"} <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="bg-background overflow-hidden">
                <Hero user={data?.user} />
                <Features />
                <Cta />
                <Footer />
            </div>
        </>
    )
}
