import Link from 'next/link'
export default function ProductCard({ product }) {
    return (
        <Link href={`/catalogue/${product.id}`} className='block border rounded-lg p-4 hover:shadow-lg transition bg-white'>
            {product.image ? 
            (<img src={product.image} alt={product.name} className='w-full h-40 object-cover rounded mb-3' />) : 
            (<div className='w-full h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400'>No image</div>)}
            <h3 className='font-semibold'>{product.name}</h3>
            {product.description && <p className='text-sm text-gray-500 mt-1'>{product.description}</p>}
        </Link>
    ) 
}