// Device/preference profile for the homepage experience. Lives in its own
// module (no three.js imports) so the page bundle stays lean — 3D code is
// only pulled in through next/dynamic.
import { useEffect, useState } from 'react'

export default function useDeviceProfile() {
  const [profile, setProfile] = useState({
    isMobile: false,
    isTouch: false,
    reducedMotion: false,
    ready: false,
  })

  useEffect(() => {
    const queries = {
      isMobile: window.matchMedia('(max-width: 768px)'),
      isTouch: window.matchMedia('(pointer: coarse)'),
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }
    const update = () =>
      setProfile({
        isMobile: queries.isMobile.matches,
        isTouch: queries.isTouch.matches,
        reducedMotion: queries.reducedMotion.matches,
        ready: true,
      })
    update()
    Object.values(queries).forEach((query) => query.addEventListener('change', update))
    return () => Object.values(queries).forEach((query) => query.removeEventListener('change', update))
  }, [])

  return profile
}
