import { useState, useEffect } from "react"
import siteConfig from "../config/siteConfig"
import PageHeader from "../components/common/PageHeader"
import CatalogueList from "../components/catalogue/CatalogueList"
import SearchBar from '../components/common/SearchBar'
import SeoHead from "../components/common/SeoHead"

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
    <div className="w-full">
      <SeoHead
        title="Catalogue | Octagon Precision Mold"
        description="Browse the Octagon Precision Mold catalogue for precision mold parts, fastening products, and industrial manufacturing references."
        canonicalPath="/catalogue"
        image="/catalogue-preview/insert-nuts.webp"
      />
      <PageHeader title="Catalogue" />
      <div className="p-6 max-w-4xl mx-auto">
        <SearchBar value={query} onChange={setQuery} />
        <CatalogueList catalogues={filtered} />
      </div>
    </div>
  )
}
