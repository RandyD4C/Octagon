import siteConfig from '../config/siteConfig';

export default function Contact() { 
    return (
        <div>
            <h1 className='text-3xl font-bold mb-4'>Contact</h1>
            <p className='text-gray-600'>Email: {siteConfig.contact.email}</p>
            <p className='text-gray-600 mt-2'>Phone: {siteConfig.contact.phone}</p>
        </div>
    )
}