// Magnetic CTA — the link leans toward the cursor by a few pixels and eases
// back on leave. Pointer-fine devices only; reduced motion disables it.
// States: default · hover · focus-visible · active are styled in
// home.module.css; disabled/loading/error/success do not apply to nav links.
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import styles from '../../styles/home.module.css'

export default function MagneticCta({ href, children, variant = 'primary' }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (window.matchMedia('(pointer: coarse)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    const animate = () => {
      current.x += (target.x - current.x) * 0.18
      current.y += (target.y - current.y) * 0.18
      node.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`
      if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
        frame = requestAnimationFrame(animate)
      } else {
        frame = 0
      }
    }
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(animate)
    }

    const onMove = (event) => {
      const rect = node.getBoundingClientRect()
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 10
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 8
      kick()
    }
    const onLeave = () => {
      target.x = 0
      target.y = 0
      kick()
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const variantClass = variant === 'primary' ? styles.ctaPrimary : styles.ctaSecondary

  return (
    <Link ref={ref} href={href} className={`${styles.cta} ${variantClass}`}>
      {children}
    </Link>
  )
}
