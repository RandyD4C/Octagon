import siteConfig from "../config/siteConfig"
import PageHeader from "../components/common/PageHeader"
import ContactList from "../components/contact/ContactList"
import Address from "../components/contact/Address"

export default function Contact() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <PageHeader title="Contact Us" />
            <ContactList contacts={siteConfig.contacts} />
            <Address address={siteConfig.company_address} />
        </div>
    )
}
