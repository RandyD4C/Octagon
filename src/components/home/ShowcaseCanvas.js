// Stage 04 viewer — one canvas, four machined parts. Drag (or touch-drag)
// rotates with inertia; idle resumes a slow turntable.
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadow,
  LightRig,
  METALS,
  SceneBoundary,
  StudioEnvironment,
} from './scene-utils'
import { CorePin, EjectorSleeve, GuideBushing, LocatingRing } from './parts'

function PartStage({ partId, spinRef, mobile, reducedMotion }) {
  const groupRef = useRef(null)
  const switchClock = useRef(0)
  const lastPart = useRef(partId)
  const seg = mobile ? 30 : 48

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    if (lastPart.current !== partId) {
      lastPart.current = partId
      switchClock.current = 0
    }
    switchClock.current = Math.min(1, switchClock.current + delta / 0.32)
    const pop = 1 - Math.pow(1 - switchClock.current, 3)
    group.scale.setScalar(reducedMotion ? 1 : 0.9 + 0.1 * pop)

    const spin = spinRef.current
    if (!spin.dragging) {
      spin.velocity *= 0.94
      // idle turntable only when the user hasn't asked for reduced motion
      if (!reducedMotion && Math.abs(spin.velocity) < 0.002) spin.rotation += delta * 0.25
    }
    spin.rotation += spin.velocity
    group.rotation.y = spin.rotation
  })

  return (
    <group ref={groupRef} rotation={[0.12, 0, 0]}>
      <group visible={partId === 'core-pin'} position={[0, -0.82, 0]} scale={0.98}>
        <CorePin segments={seg} />
      </group>
      <group visible={partId === 'ejector-sleeve'} position={[0, -0.78, 0]} scale={1.1}>
        <EjectorSleeve segments={seg} />
      </group>
      <group visible={partId === 'guide-bushing'} position={[0, -0.58, 0]} scale={2.0}>
        <GuideBushing segments={seg} />
      </group>
      <group visible={partId === 'locating-ring'} position={[0, -0.12, 0]} scale={1.3} rotation={[0.42, 0, 0]}>
        <LocatingRing segments={seg + 12} position={[0, -0.1, 0]} />
      </group>
    </group>
  )
}

export default function ShowcaseCanvas({ partId, partLabel = '', active = true, mobile = false, reducedMotion = false }) {
  const wrapRef = useRef(null)
  const spinRef = useRef({ rotation: 0.6, velocity: 0, dragging: false })

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return undefined

    let lastX = 0
    const onDown = (event) => {
      spinRef.current.dragging = true
      lastX = event.clientX
      node.setPointerCapture(event.pointerId)
    }
    const onMove = (event) => {
      if (!spinRef.current.dragging) return
      const deltaX = event.clientX - lastX
      lastX = event.clientX
      spinRef.current.rotation += deltaX * 0.011
      spinRef.current.velocity = deltaX * 0.0028
    }
    const onUp = (event) => {
      spinRef.current.dragging = false
      if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId)
    }

    node.addEventListener('pointerdown', onDown)
    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerup', onUp)
    node.addEventListener('pointercancel', onUp)
    return () => {
      node.removeEventListener('pointerdown', onDown)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerup', onUp)
      node.removeEventListener('pointercancel', onUp)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={`Interactive 3D model of a ${partLabel || 'machined component'} — drag to rotate`}
      style={{ width: '100%', height: '100%', cursor: 'grab', touchAction: 'pan-y' }}
    >
      <SceneBoundary>
        <Canvas
          frameloop={active ? 'always' : 'never'}
          dpr={mobile ? [1, 1.5] : [1, 1.75]}
          camera={{ position: [0, 0.3, 5.3], fov: 28, near: 0.1, far: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ pointerEvents: 'none' }}
        >
          <StudioEnvironment />
          <LightRig intensity={1.05} />
          <PartStage partId={partId} spinRef={spinRef} mobile={mobile} reducedMotion={reducedMotion} />
          <ContactShadow size={4.6} opacity={0.45} position={[0, -1.18, 0]} />
        </Canvas>
      </SceneBoundary>
    </div>
  )
}
