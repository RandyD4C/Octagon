import { useState, useEffect } from "react"
import siteConfig from "../config/siteConfig"
import PageHeader from "../components/common/PageHeader"
import CatalogueList from "../components/catalogue/CatalogueList"
import SearchBar from '../components/common/SearchBar'

export default function Catalogue() {
  const [catalogues, setCatalogues] = useState([])

  useEffect(() => {
    const fileName = siteConfig.is_dev ? '_local_catalogues.json' : 'catalogues.json';

    fetch(`/data/${fileName}`)
      .then((res) => res.json())
      .then((data) => setCatalogues(data))
  }, [])

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
