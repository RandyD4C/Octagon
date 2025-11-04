import siteConfig from "../config/siteConfig"
import PageHeader from "../components/common/PageHeader"
import Title from "../components/common/Title"

export default function About() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
        <PageHeader title="About Us" />

        {siteConfig.about.paragraphs.map((para, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed mt-4">{para}</p>
        ))}

        <Title title="Our Office World Network" />

        <img
            src="../../about/office-world-network.png"
            alt="Office World Network"
            className="mt-4 w-full border rounded-lg shadow"
        />

        <Title title="About Octagon Precision Mold (M) Sdn. Bhd." />

        <img
            src="../../about/about-opm.png"
            alt="About Octagon Precision Mold (M) Sdn. Bhd."
            className="mt-4 w-full border rounded-lg shadow"
        />

        <Title title="Our Clients & Partners" />
        <img
            src="../../about/octagon-customers.png"
            alt="Our Clients & Partners"
            className="mt-4 w-full border rounded-lg shadow"
        />
    </div>
  )
}
