import products from '../../data/products.json'
import { useState } from 'react'
import SearchBar from '../../components/SearchBar'

export default function Catalogue() {
  const [query, setQuery] = useState('')

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Product Catalogue</h1>
      <SearchBar value={query} onChange={setQuery} />
      <ul className="mt-6 space-y-3">
        {console.log(filtered)}
        {filtered.map(p => (
            <li key={p.id}>
                <a
                    href={p.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                    <h2 className="text-xl font-semibold text-[#154A9A]">{p.name}</h2>
                    {p.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{p.description}</p>
                    )}
                </a>
            </li>
        ))}
      </ul>
    </div>
  )
}