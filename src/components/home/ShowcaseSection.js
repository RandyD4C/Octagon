// Stage 04 — interactive component showcase. Representative machined
// geometries; specifications follow the drawing on real orders.
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import styles from '../../styles/home.module.css'
import { SHOWCASE_PARTS } from './showcase-data'

const ShowcaseCanvas = dynamic(() => import('./ShowcaseCanvas'), { ssr: false })

const PART_DETAILS = {
  'core-pin': {
    summary: 'Forming cores supplied to drawing or reverse-engineered from samples.',
    specs: [
      ['Function', 'Core forming & replacement'],
      ['Finishing', 'Grinding · polishing'],
      ['Tolerance', 'Targets to ±0.002 mm where specified'],
    ],
  },
  'ejector-sleeve': {
    summary: 'Sleeve ejection around standing cores, fit-checked against mating pins.',
    specs: [
      ['Function', 'Ejection around cores'],
      ['Finishing', 'EDM · grinding support'],
      ['Fit', 'Checked against mating pins'],
    ],
  },
  'guide-bushing': {
    summary: 'Alignment and wear parts, including matching for legacy tooling.',
    specs: [
      ['Function', 'Plate-set alignment'],
      ['Supply', 'Wear-part replacement'],
      ['Matching', 'From drawings or samples'],
    ],
  },
  'locating-ring': {
    summary: 'Mold-base interface parts supplied for repair and new tool builds.',
    specs: [
      ['Function', 'Machine-platen interface'],
      ['Supply', 'Drawing or sample based'],
      ['Records', 'Batch documentation available'],
    ],
  },
}

export default function ShowcaseSection({ deviceProfile }) {
  const sectionRef = useRef(null)
  const [activePart, setActivePart] = useState('core-pin')
  const inView = useInView(sectionRef, { margin: '200px 0px 200px 0px' })
  const details = PART_DETAILS[activePart]

  return (
    <section ref={sectionRef} className={`${styles.showcase} ${styles.frame}`} aria-labelledby="stage-showcase">
      <header className={styles.stageHead}>
        <p className={styles.stageNumber} aria-hidden="true">04</p>
        <h2 id="stage-showcase" className={styles.stageTitle}>Component showcase</h2>
        <p className={styles.stageLede}>
          Representative geometries from the catalogue. Every production part follows your drawing, sample, or usage
          conditions.
        </p>
      </header>

      <div className={styles.showcaseGrid}>
        <div className={styles.showcaseControls}>
          <div className={styles.partTabs} role="tablist" aria-label="Component selector">
            {SHOWCASE_PARTS.map((part) => (
              <button
                key={part.id}
                type="button"
                role="tab"
                aria-selected={activePart === part.id}
                className={`${styles.partTab} ${activePart === part.id ? styles.partTabActive : ''}`}
                onClick={() => setActivePart(part.id)}
              >
                {part.label}
              </button>
            ))}
          </div>

          <p className={styles.partSummary}>{details.summary}</p>

          <dl className={styles.specList}>
            {details.specs.map(([term, value]) => (
              <div key={term} className={styles.specRow}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <Link href="/catalogue" className={styles.stageLink}>
            Browse the catalogue <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className={styles.showcaseViewport}>
          <ShowcaseCanvas
            partId={activePart}
            partLabel={SHOWCASE_PARTS.find((part) => part.id === activePart)?.label}
            active={inView}
            mobile={deviceProfile.isMobile}
            reducedMotion={deviceProfile.reducedMotion}
          />
          <p className={styles.viewportHint} aria-hidden="true">Drag to rotate</p>
        </div>
      </div>
    </section>
  )
}
