import { useState } from "react"
import PageHeader from "../components/common/PageHeader"
import CatalogueList from "../components/catalogue/CatalogueList"
import SearchBar from '../components/common/SearchBar'
import catalogues from '../data/catalogues.json'

export default function Catalogue() {
    const [query, setQuery] = useState('')
    const filtered = catalogues.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    )
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <PageHeader title="Product Catalogue" />
        <SearchBar value={query} onChange={setQuery} />
        <CatalogueList catalogues={filtered}/>
      </div>
    )
}
