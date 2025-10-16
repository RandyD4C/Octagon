import siteConfig from "../config/siteConfig"
import PageHeader from "../components/common/PageHeader"

export default function About() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader title="About Us" />
      <p className="text-gray-700 leading-relaxed">{siteConfig.tagline}</p>
    </div>
  )
}
