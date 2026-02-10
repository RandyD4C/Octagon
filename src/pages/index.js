import Link from 'next/link'
import siteConfig from '../config/siteConfig'

export default function Home() {
    return (
        <div>
            <section className='grid grid-cols-3 md:grid-cols-1 gap-4'>
                <Link className='group p-6 mx-[15%] rounded-lg border overflow-hidden relative cursor-pointer' href='/about'>
                    <div className='absolute translate-x-[-99%] duration-[900ms] bg-[#154A9A] inset-0 z-20 group-hover:text-white transition-transform group-hover:translate-x-[-35%] group-hover:duration-[900ms] ease-in-out'></div>
                    <div className='absolute translate-x-[-99%] duration-[900ms] bg-[#4877BE] inset-0 z-10 group-hover:text-white transition-transform group-hover:translate-x-[-25%] group-hover:duration-[900ms] ease-in-out'></div>
                    <div className='absolute translate-x-[-99%] duration-[900ms] bg-[#96B2DC] inset-0 z-1 group-hover:text-white transition-transform group-hover:translate-x-[-15%] group-hover:duration-[900ms] ease-in-out'></div>
                    <div className='gap-50'>
                        <div className='grid grid-cols-2 grid-rows-1 h-full'>
                            <div className='z-30 flex flex-col justify-left '>
                                <h2 className='font-semibold duration-[900ms] group-hover:text-white group-hover:duration-[900ms]'>Company Profile</h2>
                                <p className='text-sm mt-2 text-white'>{siteConfig.tagline}</p>
                                <img className='w-20 h-20 z-10 group-hover:opacity-0 duration-[900ms]' src='/home/Profile.png' />
                            </div>

                        </div>
                        <div className='text-right'>
                            <Link className='text-sm text-blue-600 mt-3 inline-block' href='/about'>Read more →</Link>
                        </div>
                    </div>
                </Link>
                <Link className='group p-6 mx-[15%] rounded-lg border overflow-hidden relative cursor-pointer' href='/catalogue'>
                    <div className='absolute translate-x-[-99%] duration-[900ms] bg-[#154A9A] inset-0 z-20 group-hover:text-white transition-transform group-hover:translate-x-[-35%] group-hover:duration-[900ms] ease-in-out'></div>
                    <div className='absolute translate-x-[-99%] duration-[900ms] bg-[#4877BE] inset-0 z-10 group-hover:text-white transition-transform group-hover:translate-x-[-25%] group-hover:duration-[900ms] ease-in-out'></div>
                    <div className='absolute translate-x-[-99%] duration-[900ms] bg-[#96B2DC] inset-0 z-1 group-hover:text-white transition-transform group-hover:translate-x-[-15%] group-hover:duration-[900ms] ease-in-out'></div>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div className='z-30'>
                            <h2 className='font-semibold duration-[900ms] group-hover:text-white group-hover:duration-[900ms]'>Catalogue</h2>
                            <p className='text-sm mt-2 text-white'>Browse products and components. Searchable and mobile-friendly</p>
                        </div>
                        <div className='text-right'>
                            <Link className='text-sm text-blue-600 mt-3 inline-block' href='/catalogue'>View catalogue →</Link>
                        </div>
                    </div>
                </Link>
                <Link className='group p-6 mx-[15%] rounded-lg border overflow-hidden relative cursor-pointer' href='/contact'>
                    <div className='absolute translate-x-[-99%] duration-[900ms] bg-[#154A9A] inset-0 z-20 group-hover:text-white transition-transform group-hover:translate-x-[-35%] group-hover:duration-[900ms] ease-in-out'></div>
                    <div className='absolute translate-x-[-99%] duration-[900ms] bg-[#4877BE] inset-0 z-10 group-hover:text-white transition-transform group-hover:translate-x-[-25%] group-hover:duration-[900ms] ease-in-out'></div>
                    <div className='absolute translate-x-[-99%] duration-[900ms] bg-[#96B2DC] inset-0 z-1 group-hover:text-white transition-transform group-hover:translate-x-[-15%] group-hover:duration-[900ms] ease-in-out'></div>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div className='z-30'>
                            <h2 className='font-semibold duration-[900ms] group-hover:text-white group-hover:duration-[900ms]'>Contact</h2>
                            <p className='text-sm mt-2 text-white'>Get in touch for sales, service or technical enquiries.</p>
                        </div>
                        <div className='text-right'>
                            <Link className='text-sm text-blue-600 mt-3 inline-block' href='/contact'>Contact us →</Link>
                        </div>
                    </div>
                </Link>
            </section>
        </div>
    )
}