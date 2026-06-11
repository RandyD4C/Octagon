import SeoLandingPage from "../components/common/SeoLandingPage"

export default function WireHarnessPage() {
  return (
    <SeoLandingPage
      slug="/wire-harness"
      title="Wire Harness Supplier Malaysia | Octagon Precision Mold"
      description="Octagon Precision Mold supplies custom wire harness assemblies, cable assembly support, connectors, terminals, and RFQ coordination for OEM buyers."
      keyword="Wire Harness Supplier Malaysia"
      catalogueLinkLabel="View our wire harness catalogue"
      intro="This page is for engineers, procurement teams, and OEM buyers looking for a reliable wire harness supplier in Malaysia. Octagon Precision Mold supports custom wire harness manufacturing, cable assembly planning, and production coordination for industrial applications."
      image="/solutions/wire-harness.webp"
      imageAlt="Wire Harness Assembly"
      overview={[
        "Octagon Precision Mold works with customers that require stable wire routing, connector integration, and repeatable assembly quality for industrial products. We support projects that range from simple cable sets to more complex harness builds with multiple branches, terminals, and labeling requirements.",
        "For customers evaluating a custom wire harness manufacturer, the focus is usually not only on component sourcing but also on production consistency, documentation control, and the ability to support recurring orders. Our approach is built around technical clarity and dependable execution."
      ]}
      features={[
        "Custom wire harness manufacturer support for OEM and project-based requirements",
        "Cable cutting, stripping, crimping, marking, bundling, and final assembly",
        "Integration of connectors, terminals, sleeves, tubing, and protective coverings",
        "Prototype, pilot, and repeat production support for industrial programs",
        "Assembly builds based on drawings, BOMs, samples, or performance requirements",
        "Support for custom cable assembly Malaysia projects that require export-ready coordination"
      ]}
      applications={[
        "Industrial control panels and automation systems",
        "Medical devices and diagnostic equipment",
        "Electronics assemblies and power distribution units",
        "Automotive sub-assemblies and aftermarket systems",
        "Consumer appliances and commercial equipment",
        "Machine builders requiring custom cable routing and connection points"
      ]}
      whyChoose={[
        "Experience supporting technical discussions with engineers and purchasing teams",
        "Focus on clear documentation, repeatability, and practical production planning",
        "Ability to coordinate custom builds for Malaysia supply needs and global B2B customers",
        "Responsive support for RFQ review, drawing-based enquiries, and specification alignment",
        "Broader industrial manufacturing background that supports component compatibility and assembly quality"
      ]}
      faqs={[
        {
          question: "Can Octagon support custom wire harness manufacturing based on a drawing or sample?",
          answer: "Yes. We can review drawings, samples, connector specifications, and assembly requirements to support custom wire harness manufacturing for industrial applications."
        },
        {
          question: "Do you only support customers in Malaysia?",
          answer: "No. While we serve customers looking for a wire harness supplier in Malaysia, we also support global B2B enquiries and export-oriented manufacturing programs."
        },
        {
          question: "What information is useful when sending an RFQ?",
          answer: "A useful RFQ normally includes drawings, connector or terminal references, cable specifications, target quantity, application details, and any testing or labeling requirements."
        }
      ]}
      relatedLinks={[
        { href: "/catalogue", label: "Browse our product catalogue and technical references" },
        { href: "/mold-components", label: "Review our mold components manufacturing capabilities" },
        { href: "/plastic-injection-spare-parts", label: "See plastic injection spare parts support for tooling teams" }
      ]}
    />
  )
}
