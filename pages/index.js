import Link from 'next/link'
export default function Home() { 
    return (
        <div>
            <section className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='p-6 border rounded-lg'>
                    <h2 className='font-semibold'>Company Profile</h2>
                    <p className='text-sm mt-2'>20 years of brand focus — empowering intelligent mold strategy across 60+ regions, trusted by 20,000 customers.</p>
                    <Link className='text-sm text-blue-600 mt-3 inline-block' href='/about'>Read more →</Link>
                </div>
                <div className='p-6 border rounded-lg'>
                    <h2 className='font-semibold'>Catalogue</h2>
                    <p className='text-sm mt-2'>Browse products and components. Searchable and mobile-friendly.</p>
                    <Link className='text-sm text-blue-600 mt-3 inline-block' href='/catalogue'>View catalogue →</Link>
                </div>
                <div className='p-6 border rounded-lg'>
                    <h2 className='font-semibold'>Contact</h2>
                    <p className='text-sm mt-2'>Get in touch for sales, service or technical enquiries.</p>
                    <Link className='text-sm text-blue-600 mt-3 inline-block' href='/contact'>Contact us →</Link>
                </div>
            </section>
        </div>
    )
}