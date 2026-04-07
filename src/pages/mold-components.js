import SeoLandingPage from "../components/common/SeoLandingPage"

export default function MoldComponentsPage() {
  return (
    <SeoLandingPage
      slug="/mold-components"
      title="Mold Components Manufacturer | Precision Mold Parts | Octagon Precision Mold"
      description="Octagon Precision Mold is a mold components manufacturer supporting industrial buyers with precision mold parts, non-standard components, and tooling-related production for Malaysia and global markets."
      keyword="Mold Components Manufacturer"
      catalogueLinkLabel="View our mold components catalogue"
      intro="This page is for tooling engineers, production managers, and procurement teams sourcing a mold components manufacturer for precision parts and non-standard requirements. Octagon Precision Mold supports mold-related manufacturing with practical attention to fit, tolerance, and production reliability."
      image="/solutions/mold-components.png"
      imageAlt="Precision Mold Components"
      overview={[
        "A mold components manufacturer is often evaluated on more than machining capability alone. Industrial buyers need consistency across batches, practical understanding of mold function, and the ability to support both replacement and new-build requirements.",
        "Octagon Precision Mold supplies precision mold parts and custom non-standard components used in production tooling. Our work is aligned with customers that require technical communication, dimensional accuracy, and repeatable delivery for long-term industrial use."
      ]}
      features={[
        "Precision mold parts for injection molds, die casting molds, and related tooling systems",
        "Custom and non-standard mold components based on customer drawings or specifications",
        "Support for inserts, cores, pins, sleeves, blocks, and wear-sensitive tooling parts",
        "Machining and finishing aligned with dimensional and functional requirements",
        "Suitable for prototype tooling, maintenance replacement, and ongoing production supply",
        "B2B manufacturing support for local Malaysia customers and overseas buyers"
      ]}
      applications={[
        "Plastic injection mold manufacturing and maintenance",
        "Die casting tool repair and replacement planning",
        "Electronics and consumer product tooling programs",
        "Automotive and industrial component production",
        "Precision tooling environments requiring non-standard mold parts",
        "Factories seeking dependable mold components manufacturer partnerships"
      ]}
      whyChoose={[
        "Focused experience in mold-related equipment and custom part manufacturing",
        "Support for detailed technical review before release to production",
        "Capability to handle non-standard requirements instead of only catalogue-standard parts",
        "Reliable communication for engineers, purchasers, and project teams",
        "Strong fit for customers that need precision, repeatability, and long-term B2B supply support"
      ]}
      faqs={[
        {
          question: "Do you only supply standard mold components?",
          answer: "No. Octagon Precision Mold also supports custom and non-standard mold components based on project requirements, drawings, and existing tooling references."
        },
        {
          question: "Can you support both new tooling and replacement parts?",
          answer: "Yes. We support mold components for new programs as well as replacement parts used for maintenance, repair, and production continuity."
        },
        {
          question: "What should be included in a mold components enquiry?",
          answer: "Useful information includes part drawings, material requirements, tolerance expectations, quantity, mold type, and any critical functional notes related to fit or wear."
        }
      ]}
      relatedLinks={[
        { href: "/plastic-injection-spare-parts", label: "Explore plastic injection spare parts supply" },
        { href: "/wire-harness", label: "Review wire harness supplier capabilities" },
        { href: "/contact", label: "Send us your mold components RFQ or drawing package" }
      ]}
    />
  )
}
