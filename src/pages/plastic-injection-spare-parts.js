import SeoLandingPage from "../components/common/SeoLandingPage"

export default function PlasticInjectionSparePartsPage() {
  return (
    <SeoLandingPage
      slug="/plastic-injection-spare-parts"
      title="Plastic Injection Spare Parts Supplier | Injection Molding Support | Octagon Precision Mold"
      description="Octagon Precision Mold supplies plastic injection spare parts for maintenance, replacement planning, and tooling support. Suitable for Malaysia manufacturers and global industrial buyers."
      keyword="Plastic Injection Spare Parts Supplier"
      catalogueLinkLabel="View our spare parts catalogue"
      intro="This page is for maintenance engineers, tooling teams, and procurement managers who need a dependable plastic injection spare parts supplier. Octagon Precision Mold supports replacement components and spare part planning for injection molding operations that prioritize uptime and dimensional consistency."
      image="/solutions/spare-parts.png"
      imageAlt="Plastic Injection Spare Parts"
      overview={[
        "Plastic injection spare parts are essential for maintaining stable production, minimizing downtime, and keeping molds and machines running within expected process windows. Buyers typically need dependable supply, matching dimensions, and practical lead-time planning rather than generic off-the-shelf substitution.",
        "Octagon Precision Mold supports industrial customers that require spare parts for injection molding tooling and associated assemblies. We work with technical references, samples, and application requirements so that replacement parts fit into actual production conditions."
      ]}
      features={[
        "Support for replacement parts used in plastic injection tooling and production equipment",
        "Drawing-based and sample-based manufacturing for non-standard spare components",
        "Precision machining support for wear parts, inserts, and tooling-related items",
        "Small-batch or repeat-order production for maintenance planning",
        "Material and dimensional review based on application needs",
        "Coordination support for Malaysia factories and export manufacturing operations"
      ]}
      applications={[
        "Injection molding factories with preventive maintenance schedules",
        "Tool rooms managing spare inserts, pins, sleeves, and wear components",
        "OEM manufacturers requiring stable replacement part availability",
        "Contract manufacturers balancing uptime, tooling cost, and maintenance intervals",
        "Plastic part producers supporting electronics, consumer products, and industrial assemblies",
        "Procurement teams sourcing non-standard injection spare parts from qualified suppliers"
      ]}
      whyChoose={[
        "Industrial focus on precision parts rather than generic trading-only supply",
        "Support for technical clarification before production begins",
        "Ability to work from existing samples, production references, or engineering drawings",
        "Suitable for customers that need dependable B2B support and repeat supply planning",
        "Manufacturing background in mold-related parts, assembly requirements, and dimensional control"
      ]}
      faqs={[
        {
          question: "What kinds of plastic injection spare parts can Octagon support?",
          answer: "We support spare parts associated with tooling and mold operation, especially custom or non-standard components that need to match an existing production setup."
        },
        {
          question: "Can you manufacture spare parts from an existing sample?",
          answer: "Yes. Sample-based review is possible, especially when drawings are limited or when the replacement part must match an installed production component."
        },
        {
          question: "Is this service intended for one-time maintenance or recurring supply?",
          answer: "Both. We can support urgent replacement needs as well as recurring supply arrangements for maintenance programs and planned spare part inventory."
        }
      ]}
      relatedLinks={[
        { href: "/mold-components", label: "Review mold components manufacturing support" },
        { href: "/wire-harness", label: "See our wire harness supplier page for assembly support" },
        { href: "/contact", label: "Contact our team for a tooling or spare parts enquiry" }
      ]}
    />
  )
}
