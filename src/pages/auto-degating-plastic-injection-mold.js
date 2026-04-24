import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import siteConfig from "../config/siteConfig"

const autoDegatingExamples = [
  {
    src: "/solutions/auto-degating-example-1.jpg",
    alt: "Before and after auto degating example for rectangular plastic component",
    title: "Example 1: Rectangular cover component",
    description:
      "This comparison highlights how the auto-degating solution removes the need for a large visible gate remnant and leaves a cleaner molded surface."
  },
  {
    src: "/solutions/auto-degating-example-2.jpg",
    alt: "Before and after auto degating example for bracket plastic part",
    title: "Example 2: Bracket-style molded part",
    description:
      "The part geometry shows how a self-degating approach can separate the molded component from the runner more cleanly during the molding cycle."
  },
  {
    src: "/solutions/auto-degating-example-3.jpg",
    alt: "Before and after auto degating example for long plastic trim part",
    title: "Example 3: Long trim component",
    description:
      "For larger linear parts, auto degating helps reduce secondary trimming work and supports more consistent output across repeated cycles."
  },
  {
    src: "/solutions/auto-degating-example-4.jpg",
    alt: "Before and after auto degating example for frame plastic part",
    title: "Example 4: Frame-shaped component",
    description:
      "This example demonstrates how the gate and runner layout can be managed so the finished frame is separated more efficiently during mold opening or ejection."
  },
  {
    src: "/solutions/auto-degating-example-5.jpg",
    alt: "Before and after auto degating example for hinged plastic housing part",
    title: "Example 5: Hinged housing panel",
    description:
      "For cosmetic exterior parts, an automatic degating mold concept can reduce manual finishing effort while helping maintain repeatable gate break quality."
  },
  {
    src: "/solutions/auto-degating-example-6.jpg",
    alt: "Before and after auto degating example for rounded plastic cover part",
    title: "Example 6: Rounded cover component",
    description:
      "This sample shows how auto degating can improve presentation on visible surfaces by controlling where the gate is separated from the final molded part."
  }
]

export default function AutoDegatingPlasticInjectionMoldPage() {
  const [activeImage, setActiveImage] = useState(null)
  const companyName = siteConfig?.company_name || "Octagon Precision Mold"
  const canonicalUrl = siteConfig?.site_url
    ? `${siteConfig.site_url}/auto-degating-plastic-injection-mold`
    : "/auto-degating-plastic-injection-mold"

  return (
    <>
      <Head>
        <title>
          Auto Degating Plastic Injection Mold | Improve Efficiency & Reduce Cost | {companyName}
        </title>
        <meta
          name="description"
          content="Learn how auto degating plastic injection mold systems improve molding efficiency, reduce labor cost, and support consistent production through tunnel gates, 3-plate molds, and automation."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#154A9A]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-slate-600">Solutions</span>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#154A9A]">Auto Degating Plastic Injection Mold</li>
          </ol>
        </nav>

        <article className="space-y-8">
          <header className="space-y-5">
            <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#154A9A]">
              Injection Mold Automation
            </div>
            <h1 className="text-4xl font-extrabold text-[#154A9A]">
              Auto Degating for Plastic Injection Mold
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">
              Auto degating in plastic injection molding refers to the automatic removal of the gate from the molded part during mold opening or ejection. For engineering teams, this means less manual handling, better cycle-to-cycle consistency, and a more scalable approach to plastic injection mold automation for high-volume production.
            </p>
          </header>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src="/solutions/auto-degating-mold.png"
              alt="Auto Degating Plastic Injection Mold"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-3">
            <Link
              href="/mold-components"
              className="rounded-xl border border-slate-200 p-4 transition hover:border-[#154A9A] hover:bg-blue-50"
            >
              <span className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                Mold Components
              </span>
              <span className="mt-2 block text-lg font-semibold text-slate-900">
                Review our mold components manufacturing support
              </span>
            </Link>
            <Link
              href="/plastic-injection-spare-parts"
              className="rounded-xl border border-slate-200 p-4 transition hover:border-[#154A9A] hover:bg-blue-50"
            >
              <span className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                Spare Parts
              </span>
              <span className="mt-2 block text-lg font-semibold text-slate-900">
                Explore plastic injection spare parts support
              </span>
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-200 p-4 transition hover:border-[#154A9A] hover:bg-blue-50"
            >
              <span className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                Consultation
              </span>
              <span className="mt-2 block text-lg font-semibold text-slate-900">
                Contact our team for mold design consultation
              </span>
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">
              What is Degating in Injection Molding
            </h2>
            <div className="space-y-4 text-base leading-7 text-slate-700">
              <p>
                Degating is the process of separating the molded part from the gate and runner after filling. In conventional molding, this step may be performed manually by operators using hand tools or trimming fixtures. In automated production, the objective is to design the mold so the part is cleanly separated as part of the molding cycle.
              </p>
              <p>
                From an engineering perspective, the degating system injection molding approach must consider resin behavior, gate position, wall thickness, ejection direction, and acceptable vestige. These factors determine whether a manual trimming process is necessary or whether an automatic degating mold can be used reliably.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">
              Manual vs Automatic Degating
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">Manual Degating</h3>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                  <li>Operator removes gate after molding using cutters or trimming tools</li>
                  <li>Common for complex parts or when gate vestige tolerance is tight</li>
                  <li>Higher labor input and greater dependence on operator consistency</li>
                  <li>May be acceptable for low-volume or highly cosmetic parts</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Automatic Degating</h3>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                  <li>Gate is separated during mold opening, ejection, or downstream automation</li>
                  <li>Supports auto degating injection molding for repeatable production</li>
                  <li>Reduces handling variation and improves production flow</li>
                  <li>Best suited for programs that justify self degating mold design</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">
              How Auto Degating Works (Design Concepts)
            </h2>
            <div className="space-y-4 text-base leading-7 text-slate-700">
              <p>
                Auto degating injection molding depends on geometry and controlled separation. The mold is designed so that during opening or ejection, the gate breaks predictably at the intended section without damaging the part. This is why the gate type, gate land dimensions, runner layout, and opening sequence all matter.
              </p>
              <p>
                A self degating mold design often uses directional stress at the gate to force clean separation. For example, a tunnel gate can shear the gate automatically during ejection, while a 3-plate mold structure can separate runner and part during mold opening. In more advanced cells, robotic handling may remove parts and runners as part of a broader plastic injection mold automation strategy.
              </p>
              <ul className="list-disc space-y-2 pl-6 text-slate-700">
                <li>Gate position must support controlled break-off without deforming the part</li>
                <li>Runner and part release timing must be predictable across repeated cycles</li>
                <li>Material selection affects gate vestige, shear response, and break consistency</li>
                <li>Mold maintenance is important to preserve degating performance over time</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">
              Types of Auto Degating Solutions
            </h2>
            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">Tunnel Gate</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  A tunnel gate, also called a submarine gate, feeds material below the parting line and is designed to shear automatically when the part is ejected. It is widely used when a compact gate location and automatic separation are required.
                </p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">3-Plate Mold Structure</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  A 3-plate mold structure creates a separate opening sequence for runner and part, allowing the gate to detach during mold opening. This design is often selected when gate location needs to be optimized for filling but the process still requires an automatic degating mold solution.
                </p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">Robotic Degating</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  For parts that cannot fully self-degate within the mold, robotic degating may be integrated after ejection. This can include pick-and-place units, cutters, or automated trimming stations that extend the degating system injection molding workflow beyond the tool itself.
                </p>
              </section>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">
              Benefits of Auto Degating
            </h2>
            <ul className="list-disc space-y-3 pl-6 text-slate-700">
              <li>Reduce labor cost by removing or minimizing manual trimming steps</li>
              <li>Improve consistency by controlling how the gate separates each cycle</li>
              <li>Increase production efficiency through faster cycle completion and less handling</li>
              <li>Support cleaner process flow for high-volume manufacturing cells</li>
              <li>Lower dependence on operator skill for gate removal quality</li>
              <li>Enable better integration with downstream inspection, packing, or robotic handling</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">
              Before and After Auto-Degating Examples
            </h2>
            <p className="text-base leading-7 text-slate-700">
              The following examples show molded products before and after applying an auto-degating solution. These comparisons help illustrate how automatic gate separation can reduce visible gate remnants, minimize manual finishing, and support a more consistent production result.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {autoDegatingExamples.map((example) => (
                <figure
                  key={example.src}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setActiveImage(example)}
                    className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-slate-100 transition hover:bg-slate-200"
                    aria-label={`View full image for ${example.title}`}
                  >
                    <img
                      src={example.src}
                      alt={example.alt}
                      className="h-full w-full object-contain"
                    />
                  </button>
                  <figcaption className="space-y-2 p-5">
                    <h3 className="text-lg font-semibold text-slate-900">{example.title}</h3>
                    <p className="text-sm leading-6 text-slate-700">{example.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">
              Applications &amp; Industries
            </h2>
            <ul className="list-disc space-y-3 pl-6 text-slate-700">
              <li>Consumer electronics parts that require stable output and repeatability</li>
              <li>Automotive plastic components produced in medium to high volumes</li>
              <li>Medical and laboratory device housings where process control is important</li>
              <li>Industrial connectors, covers, and small molded precision parts</li>
              <li>Programs where procurement teams are targeting automation-driven cost savings</li>
            </ul>
            <p className="mt-4 leading-7 text-slate-700">
              When evaluating an automatic degating mold approach, engineering teams usually review both mold cost and long-term production cost. For many programs, the added design effort is justified when labor reduction, consistency, and throughput improvements are considered together.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">
              Why Choose {companyName}
            </h2>
            <ul className="list-disc space-y-3 pl-6 text-slate-700">
              <li>Understanding of mold design factors that influence degating performance and manufacturability</li>
              <li>Support for technical review of gate selection, runner concepts, and production practicality</li>
              <li>Experience in precision mold-related manufacturing and component support</li>
              <li>Suitable for B2B customers looking for practical engineering discussion rather than generic sales claims</li>
              <li>Capability to support mold-related enquiries for Malaysia and international industrial customers</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">Related Resources</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <Link
                href="/mold-components"
                className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700 transition hover:border-[#154A9A] hover:bg-blue-50 hover:text-[#154A9A]"
              >
                Learn more about our mold components capabilities
              </Link>
              <Link
                href="/plastic-injection-spare-parts"
                className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700 transition hover:border-[#154A9A] hover:bg-blue-50 hover:text-[#154A9A]"
              >
                Review plastic injection spare parts support
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700 transition hover:border-[#154A9A] hover:bg-blue-50 hover:text-[#154A9A]"
              >
                Discuss your mold automation project with our team
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">FAQ</h2>
            <div className="space-y-4">
              <details className="rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  Is auto degating suitable for every injection molded part?
                </summary>
                <p className="mt-3 leading-7 text-slate-700">
                  No. Part geometry, gate location, cosmetic requirements, resin type, and vestige tolerance all affect whether auto degating is practical. Some parts still require manual or robotic trimming.
                </p>
              </details>

              <details className="rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  What is the difference between a tunnel gate and a 3-plate mold for degating?
                </summary>
                <p className="mt-3 leading-7 text-slate-700">
                  A tunnel gate typically shears the gate during ejection, while a 3-plate mold uses a separate opening action to detach the runner and gate during mold opening. The right choice depends on part design and gating requirements.
                </p>
              </details>

              <details className="rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  Why do procurement teams consider automatic degating mold concepts?
                </summary>
                <p className="mt-3 leading-7 text-slate-700">
                  Procurement teams often evaluate automatic degating because it can reduce direct labor, improve process consistency, and support better production efficiency over the lifetime of a mold program.
                </p>
              </details>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">View our catalogue</h2>
            <p className="text-base leading-7 text-slate-700">
              Review our available product references and supporting materials related to mold systems and industrial manufacturing.
            </p>
            <Link
              href="/catalogue"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-lg bg-[#154A9A] px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              View our catalogue
            </Link>
          </section>

          <section className="rounded-2xl bg-[#154A9A] p-8 text-white">
            <h2 className="text-2xl font-semibold mt-8 mb-2">
              Contact us for mold design consultation
            </h2>
            <p className="max-w-3xl text-base leading-7 text-blue-50">
              If you are evaluating self degating mold design, runner concepts, or broader plastic injection mold automation options, share your part details or tooling requirements with {companyName}. We support technical discussions for engineers, mold designers, and procurement teams.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-[#154A9A] transition hover:bg-slate-100"
            >
              Contact us for mold design consultation
            </Link>
          </section>
        </article>

        {activeImage && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.title}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white transition hover:bg-black"
                aria-label="Close full image view"
              >
                Close
              </button>
              <div className="flex max-h-[75vh] items-center justify-center bg-slate-100 p-4">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-lg font-semibold text-slate-900">{activeImage.title}</h3>
                <p className="text-sm leading-6 text-slate-700">{activeImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
