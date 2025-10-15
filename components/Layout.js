import Link from 'next/link'
export default function Layout({ children }) { 
    return (
        <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
            <header className='border-b dark:border-gray-800'>
                <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
                    <div>
                        <Link href='/' className='text-4xl font-extrabold mb-2 text-[#154A9A]'>Octagon Precision Mold</Link>
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
            <footer className='border-t dark:border-gray-800 mt-12'>
                <div className='container mx-auto px-4 py-6 text-sm text-gray-500 dark:text-gray-400'>© {new Date().getFullYear()} Octagon Precision Mold Malaysia Branch — All rights reserved.</div>
            </footer>
        </div>
    ) 
}