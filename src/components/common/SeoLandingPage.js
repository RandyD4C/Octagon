import Link from "next/link"
import siteConfig from "../../config/siteConfig"
import SeoHead from "./SeoHead"

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">{title}</h2>
      <div className="space-y-4 text-base leading-7 text-slate-700">{children}</div>
    </section>
  )
}

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-6 text-slate-700">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function SeoLandingPage({
  slug,
  title,
  description,
  keyword,
  catalogueLinkLabel,
  intro,
  image,
  imageAlt,
  overview,
  features,
  applications,
  whyChoose,
  faqs,
  relatedLinks,
}) {
  const companyName = siteConfig?.company_name || "Octagon Precision Mold"

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        canonicalPath={slug}
        image={image}
      />

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
            <li className="text-[#154A9A]">{keyword}</li>
          </ol>
        </nav>

        <article className="space-y-8">
          <header className="space-y-5">
            <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#154A9A]">
              Industrial Manufacturing Solutions
            </div>
            <h1 className="text-4xl font-extrabold text-[#154A9A]">{keyword}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">{intro}</p>
          </header>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={image}
              alt={imageAlt}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-3">
            <Link
              href="/catalogue"
              className="rounded-xl border border-slate-200 p-4 transition hover:border-[#154A9A] hover:bg-blue-50"
            >
              <span className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                Catalogue
              </span>
              <span className="mt-2 block text-lg font-semibold text-slate-900">
                {catalogueLinkLabel}
              </span>
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-200 p-4 transition hover:border-[#154A9A] hover:bg-blue-50"
            >
              <span className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </span>
              <span className="mt-2 block text-lg font-semibold text-slate-900">
                Contact our team for technical discussion
              </span>
            </Link>
            <Link
              href={relatedLinks[0].href}
              className="rounded-xl border border-slate-200 p-4 transition hover:border-[#154A9A] hover:bg-blue-50"
            >
              <span className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                Related Page
              </span>
              <span className="mt-2 block text-lg font-semibold text-slate-900">
                {relatedLinks[0].label}
              </span>
            </Link>
          </div>

          <Section title="Overview">
            {overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Section>

          <Section title="Features / Capabilities">
            <BulletList items={features} />
          </Section>

          <Section title="Applications / Industries">
            <BulletList items={applications} />
          </Section>

          <Section title={`Why Choose ${companyName}`}>
            <BulletList items={whyChoose} />
          </Section>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">View Catalogue</h2>
            <p className="text-base leading-7 text-slate-700">
              Review our available product range, technical references, and supporting material before sending your RFQ.
            </p>
            <Link
              href="/catalogue"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-lg bg-[#154A9A] px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              View our product catalogue
            </Link>
          </section>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">Related Resources</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-slate-200 p-4 text-slate-700 transition hover:border-[#154A9A] hover:bg-blue-50 hover:text-[#154A9A]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-900">FAQ</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-slate-200 p-4">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    {faq.question}
                  </summary>
                  <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl bg-[#154A9A] p-8 text-white">
            <h2 className="text-2xl font-semibold mt-8 mb-2">Contact us for enquiry</h2>
            <p className="max-w-3xl text-base leading-7 text-blue-50">
              Share your drawings, specifications, annual volume, or project requirements with {companyName}. We support RFQ discussions for Malaysia and export-oriented B2B manufacturing programs.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-[#154A9A] transition hover:bg-slate-100"
              >
                Contact us for enquiry
              </Link>
              <Link
                href="/catalogue"
                className="inline-flex rounded-lg border border-white px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Review catalogue materials
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  )
}
