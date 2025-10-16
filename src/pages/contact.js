import siteConfig from "../config/siteConfig"
import PageHeader from "../components/common/PageHeader"

export default function Contact() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <PageHeader title="Contact Us" />
      <p>
        <strong>Email:</strong> {siteConfig.contact.email}
      </p>
      <p>
        <strong>Phone:</strong> {siteConfig.contact.phone}
      </p>
    </div>
  )
}
