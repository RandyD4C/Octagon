export default function SearchBar({ value, onChange }) { 
    return (
        <div className='mb-4 sticky top-[128px] z-40 bg-white py-3'>
            <input value={value} onChange={(e)=>onChange(e.target.value)} placeholder='Search...'
                className="w-full p-2  border rounded" />
        </div>
    ) 
}