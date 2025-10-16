import Link from 'next/link';
import siteConfig from '../config/siteConfig';

export default function Layout({ children }) { 
    return (
        <div className='min-h-screen bg-white text-gray-900'>
            <header className='border-b'>
                <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
                    <div>
                        <Link href='/' className='text-4xl font-extrabold mb-2' style={{color: siteConfig.brand_color}}>
                            {siteConfig.company_name}
                        </Link>
                    </div>
                    <nav className='space-x-4'>
                        <Link href='/'>Home</Link>
                        <Link href='/about'>About Us</Link>
                        <Link href='/catalogue'>Catalogue</Link>
                        <Link href='/contact'>Contact</Link>
                    </nav>
                </div>
            </header>
            <main className='container mx-auto px-4 py-8'>{children}</main>
            <footer className='border-t mt-12'>
                <div className='container mx-auto px-4 py-6 text-sm text-gray-500'>© {new Date().getFullYear()} 
                    {siteConfig.company_name} Malaysia Branch — All rights reserved.
                </div>
            </footer>
        </div>
    ) 
}