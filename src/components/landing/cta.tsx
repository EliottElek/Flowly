import ctaDark from '@/images/ctadark.png'
import cta from '@/images/cta.png'
import Image from 'next/image'

export default function Cta() {
    return (
        <div className="mx-auto grid md:grid-cols-2  max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                    Boost your productivity. Start using our app today.
                </h2>
                <p className="mt-6 text-lg/8 text-pretty opacity-60">
                    Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                    <a
                        href="#"
                        className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Get started
                    </a>
                    <a href="#" className="text-sm/6 font-semibold">
                        Learn more <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
            <div className="relative mt-16  h-80 lg:mt-8">
                <Image
                    alt="App screenshot"
                    src={ctaDark}
                    width={1824}
                    height={1080}
                    className="absolute dark:block hidden top-0 left-0 w-[57rem] max-w-none rounded-md ring-1 ring-white/10"
                />
                <Image
                    alt="App screenshot"
                    src={cta}
                    width={1824}
                    height={1080}
                    className="absolute dark:hidden block top-0 left-0 w-[57rem] max-w-none rounded-md ring-1 ring-white/10"
                />
            </div>
        </div>
    )
}
