export default function SearchBar({ value, onChange }) { 
    return (
        <input value={value} onChange={(e)=>onChange(e.target.value)} placeholder='Search...' className='w-full p-2 border rounded' />
    ) 
}