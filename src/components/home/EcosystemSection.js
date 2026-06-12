// Stage 05 — manufacturing ecosystem. A hand-built flow diagram of the
// operation plus the company's real figures and certificate documents.
// Every number here comes from existing site content; nothing is invented.
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import styles from '../../styles/home.module.css'

const STATS = [
  { value: 'Est. 2020', label: 'Malaysian operation, Penang' },
  { value: '200+', label: 'Employees across the operation' },
  { value: '±0.002 mm', label: 'Tolerance capability on selected components' },
  { value: '60+', label: 'Countries served by the brand network' },
]

const INDUSTRIES = ['Electronics', 'Medical devices', 'Industrial equipment', 'Aerospace supply chain']

const CERTIFICATES = [
  { src: '/certificates/honorary-certificate-1.webp', title: 'Octagon certificate document 1' },
  { src: '/certificates/honorary-certificate-2.webp', title: 'Octagon certificate document 2' },
  { src: '/certificates/honorary-certificate-3.webp', title: 'Octagon certificate document 3' },
  { src: '/certificates/honorary-certificate-4.webp', title: 'Octagon certificate document 4' },
  { src: '/certificates/honorary-certificate-5.webp', title: 'Octagon certificate document 5' },
  { src: '/certificates/honorary-certificate-6.webp', title: 'Octagon certificate document 6' },
  { src: '/certificates/honorary-certificate-8.webp', title: 'Octagon certificate document 7' },
]

const FLOW_NODES = [
  { x: 40, label: 'MACHINING' },
  { x: 235, label: 'GRINDING · EDM' },
  { x: 430, label: 'INSPECTION' },
  { x: 625, label: 'ASSEMBLY' },
  { x: 820, label: 'EXPORT' },
]

export default function EcosystemSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className={`${styles.ecosystem} ${styles.frame}`} aria-labelledby="stage-ecosystem">
      <header className={styles.stageHead}>
        <p className={styles.stageNumber} aria-hidden="true">05</p>
        <h2 id="stage-ecosystem" className={styles.stageTitle}>Manufacturing ecosystem</h2>
        <p className={styles.stageLede}>
          From machining cell to export crate — one operation, documented at every step.
        </p>
      </header>

      <div className={styles.ecosystemGrid}>
        <motion.div
          className={styles.flowPanel}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            viewBox="0 0 1000 280"
            className={styles.flowSvg}
            role="img"
            aria-label="Production flow: machining, grinding and EDM, inspection, assembly, export"
          >
            {/* connecting rail */}
            <path d="M110 150 H890" className={styles.flowRail} />
            {FLOW_NODES.map((node, index) => (
              <g key={node.label} transform={`translate(${node.x} 90)`}>
                {/* isometric station block */}
                <path d="M0 60 l70 -32 70 32 -70 32 z" className={styles.flowTop} />
                <path d="M0 60 v36 l70 32 v-36 z" className={styles.flowLeft} />
                <path d="M140 60 v36 l-70 32 v-36 z" className={styles.flowRight} />
                <text x="70" y="180" textAnchor="middle" className={styles.boardLabel}>
                  {node.label}
                </text>
                {index < FLOW_NODES.length - 1 && (
                  <path d="M150 60 h28 m0 0 l-8 -5 m8 5 l-8 5" className={styles.flowArrow} />
                )}
              </g>
            ))}
          </svg>
        </motion.div>

        <dl className={styles.statList}>
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.value}
              className={styles.statRow}
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>

      <div className={styles.industriesRow}>
        <h3 className={styles.industriesTitle}>Industries served</h3>
        <ul className={styles.industriesList}>
          {INDUSTRIES.map((industry) => (
            <li key={industry} className={styles.industry}>{industry}</li>
          ))}
        </ul>
      </div>

      <div className={styles.certStrip}>
        <div className={styles.certHead}>
          <h3 className={styles.industriesTitle}>Certificates &amp; honorary documents</h3>
          <Link href="/about" className={styles.stageLink}>
            Company profile <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <ul className={styles.certRow}>
          {CERTIFICATES.map((certificate) => (
            <li key={certificate.src} className={styles.certItem}>
              <Image
                src={certificate.src}
                alt={certificate.title}
                width={170}
                height={226}
                loading="lazy"
                className={styles.certImage}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
