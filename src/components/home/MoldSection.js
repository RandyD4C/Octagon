// Stage 01 — precision mold components. A sticky viewport pins the exploded
// 3D stack while scroll scrubs it apart and back together; the annotation
// rail tracks the scrub.
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import styles from '../../styles/home.module.css'

const MoldCanvas = dynamic(() => import('./MoldCanvas'), { ssr: false })

const ANNOTATIONS = [
  {
    title: 'Cavity & core plates',
    body: 'Plate sets machined to drawing, ground flat and parallel for repeatable fit-up.',
  },
  {
    title: 'Cores, pins & sleeves',
    body: 'Custom cores, pins, sleeves, and inserts for replacement, repair, and new tooling.',
  },
  {
    title: 'Ejection system',
    body: 'Ejector and return pins fitted for clean, repeatable part release.',
  },
  {
    title: 'Guide & alignment',
    body: 'Guide pins and bushings hold alignment across the tool’s service life.',
  },
]

export default function MoldSection({ deviceProfile }) {
  const wrapRef = useRef(null)
  const progressRef = useRef(deviceProfile.reducedMotion ? 0.5 : 0)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const inView = useInView(wrapRef, { margin: '300px 0px 300px 0px' })
  const { reducedMotion, isMobile } = deviceProfile

  useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 0.5
      return undefined
    }

    let trigger
    let cancelled = false

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/dist/ScrollTrigger'),
      ])
      if (cancelled || !wrapRef.current) return
      gsap.registerPlugin(ScrollTrigger)

      trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top+=64',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress
          const index = Math.min(3, Math.floor(self.progress * 4))
          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index
            setActiveIndex(index)
          }
        },
      })
    }

    setup()
    return () => {
      cancelled = true
      trigger?.kill()
    }
  }, [reducedMotion])

  return (
    <section ref={wrapRef} className={styles.moldWrap} aria-labelledby="stage-mold">
      <div className={`${styles.moldSticky} ${styles.frame}`}>
        <header className={styles.stageHead}>
          <p className={styles.stageNumber} aria-hidden="true">01</p>
          <h2 id="stage-mold" className={styles.stageTitle}>Precision mold components</h2>
          <p className={styles.stageLede}>
            One tool, built up in layers. Scroll to open the stack and see what Octagon supplies at every level.
          </p>
        </header>

        <div className={styles.moldGrid}>
          <div className={styles.moldViewport} aria-hidden="true">
            <MoldCanvas progressRef={progressRef} active={inView} mobile={isMobile} />
          </div>

          <ol className={styles.annotationRail}>
            {ANNOTATIONS.map((annotation, index) => (
              <li
                key={annotation.title}
                className={`${styles.annotation} ${
                  reducedMotion || index === activeIndex ? styles.annotationActive : ''
                }`}
              >
                <span className={styles.annotationIndex}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={styles.annotationTitle}>{annotation.title}</h3>
                  <p className={styles.annotationBody}>{annotation.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Link href="/mold-components" className={styles.stageLink}>
          View mold components <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}
