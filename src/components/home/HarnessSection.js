// Stage 02 — wire harness solutions. A hand-built SVG routing board: the
// trunk and branches draw on as the section scrolls through the viewport,
// branch connectors seat into place, then a continuity pulse runs the loom.
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from '../../styles/home.module.css'

const CALLOUTS = [
  'Connector sourcing',
  'Terminal crimping',
  'Routing to usage conditions',
  'Continuity checks',
]

const TRUNK = 'M84 268 H300 Q332 268 332 240 V196 Q332 168 364 168 H468'
const BRANCH_A = 'M468 168 H560 Q592 168 592 140 V112 Q592 84 624 84 H806'
const BRANCH_B = 'M468 168 H620 Q652 168 652 196 V240 Q652 268 684 268 H806'
const BRANCH_C = 'M468 168 H560 Q592 168 592 196 V356 Q592 384 624 384 H806'

export default function HarnessSection({ deviceProfile }) {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)
  const { reducedMotion } = deviceProfile

  useEffect(() => {
    if (reducedMotion) return undefined

    let timeline
    let cancelled = false

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/dist/ScrollTrigger'),
      ])
      if (cancelled || !sectionRef.current || !svgRef.current) return
      gsap.registerPlugin(ScrollTrigger)

      const svg = svgRef.current
      const wires = svg.querySelectorAll('[data-wire]')
      wires.forEach((path) => {
        const length = path.getTotalLength()
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`
      })

      timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          end: 'center 38%',
          scrub: 0.5,
        },
      })

      timeline
        .to(svg.querySelector('[data-wire="trunk"]'), { strokeDashoffset: 0, duration: 0.4 }, 0)
        .to(svg.querySelectorAll('[data-wire^="branch"]'), { strokeDashoffset: 0, duration: 0.38, stagger: 0.06 }, 0.34)
        .fromTo(
          svg.querySelectorAll('[data-connector]'),
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.16, stagger: 0.05 },
          0.66,
        )
        .to(svg.querySelectorAll('[data-flow]'), { opacity: 1, duration: 0.12 }, 0.9)
    }

    setup()
    return () => {
      cancelled = true
      timeline?.scrollTrigger?.kill()
      timeline?.kill()
    }
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className={`${styles.harness} ${styles.frame}`} aria-labelledby="stage-harness">
      <header className={styles.stageHead}>
        <p className={styles.stageNumber} aria-hidden="true">02</p>
        <h2 id="stage-harness" className={styles.stageTitle}>Wire harness solutions</h2>
        <p className={styles.stageLede}>
          Harness assemblies built around drawings, samples, and usage conditions — connectors, terminals, cable, and
          routing for industrial equipment.
        </p>
      </header>

      <div className={styles.harnessBoard} data-static={reducedMotion ? 'true' : undefined}>
        <svg
          ref={svgRef}
          viewBox="0 0 880 460"
          className={styles.harnessSvg}
          role="img"
          aria-label="Schematic of a wire harness: a main trunk splitting into three connector branches"
        >
          <defs>
            <pattern id="boardGrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" className={styles.boardDot} />
            </pattern>
          </defs>

          <rect x="8" y="8" width="864" height="444" rx="6" className={styles.boardFrame} />
          <rect x="8" y="8" width="864" height="444" rx="6" fill="url(#boardGrid)" />

          {/* main connector, left */}
          <g className={styles.connectorBlock}>
            <rect x="30" y="240" width="54" height="56" rx="4" />
            <rect x="42" y="252" width="30" height="7" rx="2" className={styles.connectorPin} />
            <rect x="42" y="265" width="30" height="7" rx="2" className={styles.connectorPin} />
            <rect x="42" y="278" width="30" height="7" rx="2" className={styles.connectorPin} />
          </g>

          {/* loom paths */}
          <path d={TRUNK} data-wire="trunk" className={styles.wireTrunk} />
          <path d={BRANCH_A} data-wire="branch-a" className={styles.wire} />
          <path d={BRANCH_B} data-wire="branch-b" className={styles.wire} />
          <path d={BRANCH_C} data-wire="branch-c" className={styles.wire} />

          {/* continuity pulse overlays */}
          <path d={TRUNK} data-flow className={styles.wireFlow} />
          <path d={BRANCH_B} data-flow className={styles.wireFlow} />

          {/* cable tie marks */}
          {[180, 260, 420].map((x) => (
            <rect key={x} x={x} y={x === 180 || x === 260 ? 260 : 160} width="5" height="16" rx="2" className={styles.cableTie} />
          ))}

          {/* junction */}
          <circle cx="468" cy="168" r="7" className={styles.junction} />

          {/* branch connectors, right — seat into place on scroll */}
          {[
            { y: 62, label: 'BRANCH A' },
            { y: 246, label: 'BRANCH B' },
            { y: 362, label: 'BRANCH C' },
          ].map((connector) => (
            <g key={connector.label} data-connector>
              <rect x="806" y={connector.y} width="44" height="44" rx="4" className={styles.connectorHousing} />
              <rect x="816" y={connector.y + 10} width="24" height="6" rx="2" className={styles.connectorPin} />
              <rect x="816" y={connector.y + 22} width="24" height="6" rx="2" className={styles.connectorPin} />
            </g>
          ))}

          {/* mono annotations */}
          <text x="84" y="318" className={styles.boardLabel}>MAIN TRUNK</text>
          <text x="700" y="52" className={styles.boardLabel}>BRANCH A</text>
          <text x="700" y="300" className={styles.boardLabel}>BRANCH B</text>
          <text x="700" y="416" className={styles.boardLabel}>BRANCH C</text>
          <text x="440" y="140" className={styles.boardLabel}>JUNCTION</text>
        </svg>
      </div>

      <ul className={styles.calloutRow}>
        {CALLOUTS.map((callout) => (
          <li key={callout} className={styles.callout}>{callout}</li>
        ))}
      </ul>

      <Link href="/wire-harness" className={styles.stageLink}>
        Wire harness solutions <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  )
}
