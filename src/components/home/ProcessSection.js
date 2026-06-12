// Stage 03 — manufacturing process. Five stations on a drawn rail:
// raw material → machining → inspection → assembly → delivery.
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from '../../styles/home.module.css'

const STATIONS = [
  {
    index: '03.1',
    title: 'Raw material',
    body: 'Tool steels and stock checked against the part requirement before work begins.',
    glyph: (
      <g>
        <rect x="6" y="14" width="28" height="8" rx="1" />
        <rect x="10" y="24" width="28" height="8" rx="1" />
        <path d="M6 36h32" />
      </g>
    ),
  },
  {
    index: '03.2',
    title: 'Machining',
    body: 'CNC milling, turning, EDM, and grinding planned around function and repeatability.',
    glyph: (
      <g>
        <path d="M22 6v12" />
        <path d="M16 18h12l-2 14h-8z" />
        <path d="M12 38h20" />
      </g>
    ),
  },
  {
    index: '03.3',
    title: 'Inspection',
    body: 'Critical dimensions verified and recorded before any part is released.',
    glyph: (
      <g>
        <circle cx="22" cy="18" r="10" />
        <path d="M22 12v6l4 3" />
        <path d="M22 28v8" />
        <path d="M14 36h16" />
      </g>
    ),
  },
  {
    index: '03.4',
    title: 'Assembly',
    body: 'Fit-up, ejection, and alignment checked as a complete unit, not loose parts.',
    glyph: (
      <g>
        <rect x="8" y="10" width="28" height="9" rx="1" />
        <rect x="8" y="25" width="28" height="9" rx="1" />
        <path d="M22 19v6" />
      </g>
    ),
  },
  {
    index: '03.5',
    title: 'Delivery',
    body: 'Packed, labelled, and documented for procurement teams and overseas buyers.',
    glyph: (
      <g>
        <path d="M8 16l14-7 14 7v14l-14 7-14-7z" />
        <path d="M8 16l14 7 14-7" />
        <path d="M22 23v14" />
      </g>
    ),
  },
]

export default function ProcessSection() {
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    let trigger
    let cancelled = false

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/dist/ScrollTrigger'),
      ])
      if (cancelled || !sectionRef.current || !railRef.current) return
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        railRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center 42%',
            scrub: 0.5,
          },
        },
      )
      trigger = ScrollTrigger.getAll().at(-1)
    }

    setup()
    return () => {
      cancelled = true
      trigger?.kill()
    }
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className={`${styles.process} ${styles.frame}`} aria-labelledby="stage-process">
      <header className={styles.stageHead}>
        <p className={styles.stageNumber} aria-hidden="true">03</p>
        <h2 id="stage-process" className={styles.stageTitle}>Manufacturing process</h2>
        <p className={styles.stageLede}>
          The same path for every order — visible from quotation to shipment.
        </p>
      </header>

      <div className={styles.processRailTrack} aria-hidden="true">
        <div ref={railRef} className={styles.processRail} />
      </div>

      <ol className={styles.stationRow}>
        {STATIONS.map((station, index) => (
          <motion.li
            key={station.index}
            className={styles.station}
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 44 44" className={styles.stationGlyph} aria-hidden="true">
              {station.glyph}
            </svg>
            <p className={styles.stationIndex}>{station.index}</p>
            <h3 className={styles.stationTitle}>{station.title}</h3>
            <p className={styles.stationBody}>{station.body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
