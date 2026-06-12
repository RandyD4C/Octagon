// Homepage — immersive 3D manufacturing experience.
// Hallmark · macrostructure: Narrative Workflow · theme: custom dark industrial
// (full stamp in src/styles/home.module.css)
import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import SeoHead from '../components/common/SeoHead'
import MagneticCta from '../components/home/MagneticCta'
import MoldSection from '../components/home/MoldSection'
import HarnessSection from '../components/home/HarnessSection'
import ProcessSection from '../components/home/ProcessSection'
import ShowcaseSection from '../components/home/ShowcaseSection'
import EcosystemSection from '../components/home/EcosystemSection'
import useDeviceProfile from '../components/home/useDeviceProfile'
import styles from '../styles/home.module.css'

const HeroScene = dynamic(() => import('../components/home/HeroScene'), { ssr: false })

const HUD_STAGES = ['Components', 'Alignment', 'Assembly', 'Tool complete']

export default function Home() {
  const deviceProfile = useDeviceProfile()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { margin: '120px 0px 120px 0px' })
  const [heroStage, setHeroStage] = useState(0)

  const handleHeroStage = useCallback((stage) => setHeroStage(stage), [])

  // Momentum scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger
  // scrubs stay in sync. Skipped entirely under reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let lenis
    let gsapModule
    let rafCallback
    let cancelled = false

    const setup = async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/dist/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      gsapModule = gsap
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, autoRaf: false })
      lenis.on('scroll', ScrollTrigger.update)
      rafCallback = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(rafCallback)
      gsap.ticker.lagSmoothing(0)
    }

    setup()
    return () => {
      cancelled = true
      if (gsapModule && rafCallback) gsapModule.ticker.remove(rafCallback)
      lenis?.destroy()
    }
  }, [])

  const { reducedMotion, isMobile, ready } = deviceProfile

  return (
    <div className={styles.page}>
      <SeoHead
        title="Octagon Precision Mold | Mold Parts & Wire Harness"
        description="Octagon Precision Mold supplies precision mold components, wire harness assemblies, injection molding spare parts, and auto degating support for OEM buyers."
        canonicalPath="/"
        image="/home/core-products.webp"
      />

      {/* ── Hero · staged 3D assembly ─────────────────────────────── */}
      <section ref={heroRef} className={styles.hero} aria-label="Octagon Precision Mold introduction">
        <div className={styles.heroPoster} aria-hidden="true" />
        <div className={styles.heroCanvas} aria-hidden="true">
          {ready && (
            <HeroScene
              active={heroInView}
              reducedMotion={reducedMotion}
              mobile={isMobile}
              onStage={handleHeroStage}
            />
          )}
        </div>
        <div className={styles.heroScrim} aria-hidden="true" />

        <div className={`${styles.heroInner} ${styles.frame}`}>
          <motion.div
            className={styles.heroCopy}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.heroEyebrow}>Octagon Precision Mold · Malaysia</p>
            <h1 className={styles.heroTitle}>Precision components for modern manufacturing</h1>
            <p className={styles.heroLede}>
              Engineering-grade mold components, wire harness assemblies, and industrial solutions trusted by
              manufacturers worldwide.
            </p>
            <div className={styles.heroCtas}>
              <MagneticCta href="/catalogue" variant="primary">Explore products</MagneticCta>
              <MagneticCta href="/contact" variant="secondary">Request quotation</MagneticCta>
            </div>
          </motion.div>
        </div>

        <div className={styles.heroHud} aria-hidden="true">
          <span>Assembly seq</span>
          <span className={styles.hudTicks}>
            {HUD_STAGES.map((label, index) => (
              <span key={label} className={`${styles.hudTick} ${index <= heroStage ? styles.hudTickActive : ''}`} />
            ))}
          </span>
          <span>{HUD_STAGES[heroStage]}</span>
        </div>
      </section>

      {/* ── Stages 01–05 ──────────────────────────────────────────── */}
      <MoldSection deviceProfile={deviceProfile} />
      <HarnessSection deviceProfile={deviceProfile} />
      <ProcessSection />
      <ShowcaseSection deviceProfile={deviceProfile} />
      <EcosystemSection />

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className={styles.frame} aria-labelledby="final-cta">
        <div className={styles.finalCta}>
          <div>
            <h2 id="final-cta" className={styles.finalTitle}>
              Send a drawing. Engineering reviews before quotation.
            </h2>
            <p className={styles.finalBody}>
              The fastest way to begin: part function, material, quantity, tolerance notes, and delivery location.
            </p>
          </div>
          <MagneticCta href="/contact" variant="primary">Request quotation</MagneticCta>
        </div>
      </section>
    </div>
  )
}
