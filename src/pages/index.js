import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import SeoHead from '../components/common/SeoHead'
import {
  ArrowRight,
  Bot,
  Cable,
  CheckCircle2,
  ClipboardCheck,
  Component,
  Factory,
  FileCheck2,
  Gauge,
  Globe2,
  Layers3,
  Microscope,
  PackageCheck,
  Settings2,
  ShieldCheck,
  Wrench,
} from 'lucide-react'

const capabilityMetrics = [
  { value: '±0.002 mm', label: 'Precision target for selected components' },
  { value: 'Ra 0.05-0.2', label: 'Mirror finish range when specified' },
  { value: 'Malaysia', label: 'Technical sales and manufacturing support' },
  { value: 'OEM / ODM', label: 'Custom non-standard part supply' },
]

const heroTags = [
  'Precision mold components',
  'Wire harness assemblies',
  'Injection molding spare parts',
  'Auto degating systems',
]

const productShowcases = [
  {
    eyebrow: '01 / Mold Components',
    title: 'Precision parts for mold maintenance and production tooling',
    description:
      'Custom cores, pins, sleeves, inserts, blocks, and non-standard mold components made for replacement, repair, and new tooling support.',
    image: '/solutions/mold-components.webp',
    href: '/mold-components',
    icon: Component,
    specs: ['Core pins and sleeves', 'EDM and grinding support', 'Surface finish control'],
  },
  {
    eyebrow: '02 / Wire Harness',
    title: 'Harness assemblies built around drawings, samples, and usage conditions',
    description:
      'Connector, terminal, cable, and routing support for industrial equipment, electrical modules, and production line applications.',
    image: '/solutions/wire-harness.webp',
    href: '/wire-harness',
    icon: Cable,
    specs: ['Connector sourcing', 'Terminal crimping', 'Continuity checks'],
  },
  {
    eyebrow: '03 / Injection Molding',
    title: 'Spare parts and fixture support for plastic injection environments',
    description:
      'Mold-related spare parts, fasteners, inserts, and production support items for maintenance teams that need reliable repeat supply.',
    image: '/solutions/spare-parts.webp',
    href: '/plastic-injection-spare-parts',
    icon: Settings2,
    specs: ['Replacement supply', 'Sample matching', 'Batch documentation'],
  },
  {
    eyebrow: '04 / Auto Degating',
    title: 'In-mold degating concepts for cleaner part separation',
    description:
      'Auto degating mold concepts and peripheral automation support for plastic parts where cycle repeatability and trimming consistency matter.',
    image: '/solutions/auto-degating-mold.webp',
    href: '/auto-degating-plastic-injection-mold',
    icon: Bot,
    specs: ['Runner separation', 'Fixture integration', 'Process review'],
  },
]

const processSteps = [
  {
    title: 'Technical review',
    description: 'Drawings, samples, tolerances, materials, and operating conditions are checked before quotation.',
    icon: ClipboardCheck,
  },
  {
    title: 'Controlled production',
    description: 'Machining, assembly, and finishing are planned around the part function and required repeatability.',
    icon: Gauge,
  },
  {
    title: 'Inspection record',
    description: 'Critical dimensions and assembly checks are verified before packing and delivery.',
    icon: Microscope,
  },
  {
    title: 'Shipment support',
    description: 'Parts are packed, labelled, and documented for procurement teams and overseas buyers.',
    icon: PackageCheck,
  },
]

const trustItems = [
  'Engineering-led review before order confirmation',
  'Custom and replacement supply for non-standard parts',
  'Inspection-first handling for critical dimensions',
  'Export-ready communication for B2B customers',
]

const applications = [
  { name: 'Electronics', image: '/home/electronic.webp' },
  { name: 'Medical Devices', image: '/home/medical.webp' },
  { name: 'Industrial Equipment', image: '/home/mechanical.webp' },
  { name: 'Aerospace Supply Chain', image: '/home/aerospace.webp' },
]

const certificates = [
  '/certificates/honorary-certificate-1.webp',
  '/certificates/honorary-certificate-2.webp',
  '/certificates/honorary-certificate-3.webp',
]

export default function Home() {
  const pageRef = useRef(null)

  useEffect(() => {
    let isActive = true
    let cleanup = () => {}

    const setupAnimations = async () => {
      const page = pageRef.current
      if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/dist/ScrollTrigger'),
      ])

      if (!isActive) return

      gsap.registerPlugin(ScrollTrigger)

      const listenerCleanups = []

      const ctx = gsap.context(() => {
        gsap.defaults({ ease: 'power3.out', duration: 0.9 })

        gsap.from('[data-home-hero-item]', {
          autoAlpha: 0,
          y: 28,
          duration: 1,
          stagger: 0.12,
          clearProps: 'all',
        })

        gsap.from('[data-home-hero-visual]', {
          autoAlpha: 0,
          y: 22,
          scale: 0.985,
          duration: 1.1,
          stagger: 0.14,
          delay: 0.18,
          clearProps: 'all',
        })

        gsap.from('[data-home-hero-tag]', {
          autoAlpha: 0,
          y: 14,
          duration: 0.75,
          stagger: 0.06,
          delay: 0.42,
          clearProps: 'all',
        })

        gsap.utils.toArray('[data-home-section]').forEach((section) => {
          gsap.from(section, {
            autoAlpha: 0,
            y: 34,
            duration: 0.95,
            clearProps: 'all',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              once: true,
            },
          })
        })

        gsap.utils.toArray('[data-home-stagger]').forEach((group) => {
          const items = group.querySelectorAll('[data-home-stagger-item]')
          if (!items.length) return

          gsap.from(items, {
            autoAlpha: 0,
            y: 22,
            duration: 0.8,
            stagger: 0.08,
            clearProps: 'all',
            scrollTrigger: {
              trigger: group,
              start: 'top 84%',
              once: true,
            },
          })
        })

        gsap.utils.toArray('[data-home-image]').forEach((image) => {
          gsap.from(image, {
            autoAlpha: 0,
            scale: 0.985,
            duration: 0.9,
            clearProps: 'all',
            scrollTrigger: {
              trigger: image,
              start: 'top 86%',
              once: true,
            },
          })
        })

        gsap.utils.toArray('[data-home-button]').forEach((button) => {
          const hoverIn = () => gsap.to(button, { y: -2, duration: 0.28, ease: 'power2.out', overwrite: 'auto' })
          const hoverOut = () => gsap.to(button, { y: 0, duration: 0.28, ease: 'power2.out', overwrite: 'auto' })

          button.addEventListener('mouseenter', hoverIn)
          button.addEventListener('mouseleave', hoverOut)
          button.addEventListener('focus', hoverIn)
          button.addEventListener('blur', hoverOut)

          listenerCleanups.push(() => {
            button.removeEventListener('mouseenter', hoverIn)
            button.removeEventListener('mouseleave', hoverOut)
            button.removeEventListener('focus', hoverIn)
            button.removeEventListener('blur', hoverOut)
          })
        })

        gsap.utils.toArray('[data-home-count]').forEach((counter) => {
          const type = counter.getAttribute('data-home-count')
          const value = { current: 0 }

          const formatters = {
            tolerance: (current) => `±${current.toFixed(3)} mm`,
            finish: (current) => `Ra ${current.toFixed(2)}-0.2`,
          }

          const endValues = {
            tolerance: 0.002,
            finish: 0.05,
          }

          if (!formatters[type]) return

          gsap.to(value, {
            current: endValues[type],
            duration: 1.25,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = formatters[type](value.current)
            },
            scrollTrigger: {
              trigger: counter,
              start: 'top 88%',
              once: true,
            },
          })
        })
      }, page)

      cleanup = () => {
        listenerCleanups.forEach((removeListener) => removeListener())
        ctx.revert()
      }
    }

    setupAnimations()

    return () => {
      isActive = false
      cleanup()
    }
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f7f8f8] text-[#111820]">
      <SeoHead
        title="Octagon Precision Mold | Mold Parts & Wire Harness"
        description="Octagon Precision Mold supplies precision mold components, wire harness assemblies, injection molding spare parts, and auto degating support for OEM buyers."
        canonicalPath="/"
        image="/home/core-products.webp"
      />

      <section className="relative isolate overflow-hidden bg-[#111820] text-white">
        <div className="absolute inset-0">
          <Image
            src="/home/core-products.webp"
            alt="Precision machined mold components and wire harness assemblies on an industrial workbench"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.42]"
          />
          <div className="absolute inset-0 bg-[#111820]/72" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(90deg,rgba(17,24,32,0),rgba(17,24,32,0.86))]" />
        </div>

        <div className="container relative z-10 grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <div className="max-w-3xl pt-4">
            <p data-home-hero-item className="mb-5 inline-flex border-l-2 border-[#b84a2f] pl-3 text-sm font-semibold tracking-[0.18em] text-slate-200">
              Malaysia precision manufacturing support
            </p>
            <h1 data-home-hero-item className="max-w-4xl text-[2.65rem] font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Precision parts for mold, harness, and automation production.
            </h1>
            <p data-home-hero-item className="mt-7 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Octagon supports OEMs, engineers, and procurement teams with custom mold-related parts, wire harness assemblies, injection molding spares, and auto degating solutions built around real production requirements.
            </p>

            <div data-home-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                data-home-button
                className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-[#111820] transition hover:bg-[#d9dde1] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111820]"
              >
                Discuss a requirement
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/catalogue"
                data-home-button
                className="inline-flex items-center justify-center border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111820]"
              >
                View catalogue
              </Link>
            </div>

            <div className="mt-12 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2">
              {heroTags.map((tag) => (
                <div key={tag} data-home-hero-tag className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="h-px w-7 bg-[#b84a2f]" />
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[560px] lg:block">
            <div data-home-hero-visual className="absolute right-0 top-0 h-[360px] w-[78%] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
              <Image
                src="/solutions/mold-components.webp"
                alt="Machined mold components arranged in a workshop"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div data-home-hero-visual className="absolute bottom-6 left-0 h-[285px] w-[56%] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
              <Image
                src="/solutions/wire-harness.webp"
                alt="Custom wire harness assembly with terminals and connectors"
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                className="object-cover"
              />
            </div>
            <div data-home-hero-visual className="absolute bottom-0 right-4 w-[360px] border border-white/15 bg-[#151d26]/95 p-6 shadow-2xl backdrop-blur">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-semibold tracking-[0.18em] text-slate-400">Capability note</span>
                <Wrench className="h-5 w-5 text-[#d46b4d]" aria-hidden="true" />
              </div>
              <p className="text-sm leading-7 text-slate-200">
                Built for low-volume replacement work, custom production parts, and project-based industrial requirements where drawings, samples, and inspection records matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-home-section className="border-b border-[#d9dde1] bg-white">
        <div data-home-stagger className="container grid gap-0 md:grid-cols-4">
          {capabilityMetrics.map((metric, index) => (
            <div key={metric.value} data-home-stagger-item className="border-[#d9dde1] py-8 md:border-l md:px-7 md:first:border-l-0">
              <p
                data-home-count={index === 0 ? 'tolerance' : index === 1 ? 'finish' : undefined}
                className="text-2xl font-semibold tracking-tight text-[#111820]"
              >
                {metric.value}
              </p>
              <p className="mt-2 max-w-[14rem] text-sm leading-6 text-slate-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-home-section className="bg-[#f7f8f8] py-20 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
          <div>
            <p className="border-l-2 border-[#b84a2f] pl-3 text-sm font-semibold tracking-[0.16em] text-slate-500">
              Manufacturing capability
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#111820] sm:text-5xl">
              Practical engineering support across mold, cable, and automation requirements.
            </h2>
          </div>
          <div data-home-stagger className="grid gap-7 border-l border-[#ccd2d8] pl-7 sm:grid-cols-2">
            <div data-home-stagger-item>
              <Factory className="mb-5 h-8 w-8 text-[#b84a2f]" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-[#111820]">Production-aware supply</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Parts are discussed in the context of machine use, maintenance urgency, material behavior, and expected fit-up.
              </p>
            </div>
            <div data-home-stagger-item>
              <ShieldCheck className="mb-5 h-8 w-8 text-[#b84a2f]" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-[#111820]">Quality before shipment</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Critical specifications are reviewed through inspection checks, sample confirmation, or project documentation where required.
              </p>
            </div>
            <div data-home-stagger-item>
              <Layers3 className="mb-5 h-8 w-8 text-[#b84a2f]" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-[#111820]">Custom non-standard work</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The team supports drawings, reverse samples, modification requests, and small batches for factory maintenance teams.
              </p>
            </div>
            <div data-home-stagger-item>
              <Globe2 className="mb-5 h-8 w-8 text-[#b84a2f]" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-[#111820]">B2B export communication</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Clear quotation, packing, and delivery coordination for procurement teams and overseas industrial buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-home-section className="bg-white py-20 sm:py-28">
        <div className="container">
          <div className="grid items-end gap-8 border-b border-[#d9dde1] pb-10 lg:grid-cols-[0.95fr_0.55fr]">
            <div>
              <p className="border-l-2 border-[#b84a2f] pl-3 text-sm font-semibold tracking-[0.16em] text-slate-500">
                Product areas
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[#111820] sm:text-5xl">
                Connected supply for the parts that keep industrial lines running.
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-600">
              Instead of separating every product into a generic card, the homepage groups them by how factory teams usually source them: tooling, wiring, injection production, and automation.
            </p>
          </div>

          <div className="divide-y divide-[#d9dde1]">
            {productShowcases.map((product, index) => (
              <article
                key={product.title}
                data-home-stagger
                className={`grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:py-20 ${
                  index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div data-home-image data-home-stagger-item className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </div>

                <div data-home-stagger-item className="max-w-xl lg:px-8">
                  <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-slate-500">
                    <product.icon className="h-5 w-5 text-[#b84a2f]" aria-hidden="true" />
                    {product.eyebrow}
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-[#111820] sm:text-4xl">
                    {product.title}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-slate-600">{product.description}</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {product.specs.map((spec) => (
                      <div key={spec} className="border-l border-[#b84a2f] bg-[#f7f8f8] px-4 py-3 text-sm font-medium text-slate-700">
                        {spec}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={product.href}
                    data-home-button
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#111820] transition hover:text-[#b84a2f] focus:outline-none focus:ring-2 focus:ring-[#b84a2f] focus:ring-offset-4"
                  >
                    View this capability
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-home-section className="bg-[#111820] py-20 text-white sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
          <div>
            <p className="border-l-2 border-[#d46b4d] pl-3 text-sm font-semibold tracking-[0.16em] text-slate-300">
              Workflow
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              A simple process for parts that cannot be treated as catalogue-only items.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300">
              Many requests start with an old component, a drawing revision, or a production problem. The workflow keeps the engineering conversation visible from quotation to shipment.
            </p>
          </div>

          <div data-home-stagger className="grid gap-px bg-white/12 sm:grid-cols-2">
            {processSteps.map((step) => (
              <div key={step.title} data-home-stagger-item className="bg-[#111820] p-7 transition hover:bg-[#182331]">
                <step.icon className="mb-8 h-8 w-8 text-[#d46b4d]" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-home-section className="bg-white py-20 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="border-l-2 border-[#b84a2f] pl-3 text-sm font-semibold tracking-[0.16em] text-slate-500">
              Industrial applications
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[#111820] sm:text-5xl">
              Built for buyers who need fit, repeatability, and dependable communication.
            </h2>
          </div>

          <div data-home-stagger className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item} data-home-stagger-item className="flex gap-3 border-t border-[#d9dde1] pt-4 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#b84a2f]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div data-home-stagger className="container mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((application) => (
            <div key={application.name} data-home-stagger-item data-home-image className="group relative aspect-[4/5] overflow-hidden bg-slate-200">
              <Image
                src={application.image}
                alt={`${application.name} application`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111820]/78 via-[#111820]/18 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-lg font-semibold text-white">{application.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-home-section className="border-y border-[#d9dde1] bg-[#f7f8f8] py-20 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[0.78fr_1fr] lg:items-center">
          <div>
            <p className="border-l-2 border-[#b84a2f] pl-3 text-sm font-semibold tracking-[0.16em] text-slate-500">
              Quality evidence
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#111820] sm:text-5xl">
              Documentation, certificates, and inspection discipline are part of the supply conversation.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Certificates and supporting documents are presented as evidence, not decoration. For technical purchases, Octagon focuses on fit-for-purpose quality checks and clear records.
            </p>
            <Link
              href="/about"
              data-home-button
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#111820] transition hover:text-[#b84a2f] focus:outline-none focus:ring-2 focus:ring-[#b84a2f] focus:ring-offset-4"
            >
              Review company profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div data-home-stagger className="grid gap-4 sm:grid-cols-3">
            {certificates.map((certificate, index) => (
              <div key={certificate} data-home-stagger-item className={`bg-white p-3 shadow-sm ${index === 1 ? 'sm:mt-12' : ''}`}>
                <div data-home-image className="relative aspect-[3/4] overflow-hidden border border-[#d9dde1]">
                  <Image
                    src={certificate}
                    alt={`Octagon certificate document ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-home-section className="bg-white py-20 sm:py-28">
        <div className="container">
          <div className="grid gap-10 border border-[#cfd5da] bg-[#111820] p-8 text-white sm:p-12 lg:grid-cols-[1fr_0.42fr] lg:p-16">
            <div>
              <FileCheck2 className="mb-8 h-9 w-9 text-[#d46b4d]" aria-hidden="true" />
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Send a drawing, sample photo, or production requirement for review.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                The fastest way to begin is with the part function, material, quantity, tolerance notes, and expected delivery location.
              </p>
            </div>
            <div className="flex items-end lg:justify-end">
              <Link
                href="/contact"
                data-home-button
                className="inline-flex w-full items-center justify-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-[#111820] transition hover:bg-[#d9dde1] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111820] sm:w-auto"
              >
                Contact sales engineering
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
