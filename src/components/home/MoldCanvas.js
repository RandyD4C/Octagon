// Exploded-view mold stack, scrubbed by scroll progress from the parent
// section: closed tool → exploded along Y → reassembled.
import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  ContactShadow,
  LightRig,
  METALS,
  SceneBoundary,
  StudioEnvironment,
  clamp01,
  easeInOutCubic,
} from './scene-utils'
import {
  Bore,
  CorePin,
  EjectorPin,
  GuideBushing,
  GuidePin,
  LocatingRing,
  Plate,
  SprueBushing,
} from './parts'

const LOOK_BASE = new THREE.Vector3(0, 1.45, 0)

// Closed-tool Y positions plus per-element explode travel.
function buildStack(seg) {
  return [
    {
      key: 'top-group',
      y: 2.24,
      travel: 2.0,
      node: (
        <group>
          <Plate width={3.7} thickness={0.26} depth={2.8} metal={METALS.plate} />
          <LocatingRing segments={seg + 12} position={[0, 0.13, 0]} />
          <SprueBushing segments={seg} scale={0.8} position={[0, -0.18, 0]} />
        </group>
      ),
    },
    {
      key: 'cavity-plate',
      y: 1.86,
      travel: 1.15,
      node: (
        <group>
          <Plate width={3.5} thickness={0.5} depth={2.7} metal={METALS.plateLight} />
          <GuidePin segments={seg} position={[-1.42, -0.25, -1.05]} rotation={[Math.PI, 0, 0]} scale={0.7} />
          <GuidePin segments={seg} position={[1.42, -0.25, -1.05]} rotation={[Math.PI, 0, 0]} scale={0.7} />
          <GuidePin segments={seg} position={[-1.42, -0.25, 1.05]} rotation={[Math.PI, 0, 0]} scale={0.7} />
          <GuidePin segments={seg} position={[1.42, -0.25, 1.05]} rotation={[Math.PI, 0, 0]} scale={0.7} />
        </group>
      ),
    },
    {
      key: 'core-plate',
      y: 1.36,
      travel: 0.32,
      node: (
        <group>
          <Plate width={3.5} thickness={0.5} depth={2.7} metal={METALS.plate} />
          <Plate width={1.3} thickness={0.025} depth={0.95} radius={0.05} metal={METALS.graphite} position={[0, 0.255, 0.1]} />
          <CorePin segments={seg} position={[-0.32, 0.26, 0.1]} scale={0.42} />
          <CorePin segments={seg} position={[0.32, 0.26, 0.1]} scale={0.42} />
          <GuideBushing segments={seg} position={[-1.42, 0.25, -1.05]} scale={0.8} />
          <GuideBushing segments={seg} position={[1.42, 0.25, -1.05]} scale={0.8} />
          <GuideBushing segments={seg} position={[-1.42, 0.25, 1.05]} scale={0.8} />
          <GuideBushing segments={seg} position={[1.42, 0.25, 1.05]} scale={0.8} />
          <Bore radius={0.09} position={[-1.0, 0.255, -0.85]} />
          <Bore radius={0.09} position={[1.0, 0.255, -0.85]} />
        </group>
      ),
    },
    {
      key: 'ejector-unit',
      y: 0.46,
      travel: -0.85,
      node: (
        <group>
          <Plate width={2.1} thickness={0.14} depth={2.4} metal={METALS.plateLight} position={[0, -0.07, 0]} />
          <Plate width={2.1} thickness={0.12} depth={2.4} metal={METALS.plateLight} position={[0, 0.06, 0]} />
          <EjectorPin segments={seg / 2} position={[-0.5, 0.12, -0.42]} />
          <EjectorPin segments={seg / 2} position={[0.5, 0.12, -0.42]} />
          <EjectorPin segments={seg / 2} position={[-0.5, 0.12, 0.42]} />
          <EjectorPin segments={seg / 2} position={[0.5, 0.12, 0.42]} />
        </group>
      ),
    },
    {
      key: 'base-group',
      y: 0.13,
      travel: -1.55,
      node: (
        <group>
          <Plate width={3.7} thickness={0.26} depth={2.8} metal={METALS.plate} />
          <Plate width={0.5} thickness={0.85} depth={2.8} metal={METALS.graphite} position={[-1.48, 0.555, 0]} />
          <Plate width={0.5} thickness={0.85} depth={2.8} metal={METALS.graphite} position={[1.48, 0.555, 0]} />
        </group>
      ),
    },
  ]
}

function explodeFactor(progress) {
  const rise = easeInOutCubic(clamp01((progress - 0.04) / 0.42))
  const fall = easeInOutCubic(clamp01((progress - 0.74) / 0.24))
  return rise * (1 - fall)
}

function ExplodedScene({ progressRef, mobile }) {
  const camera = useThree((state) => state.camera)
  const elementRefs = useRef([])
  const lookTarget = useRef(LOOK_BASE.clone())

  const stack = useMemo(() => buildStack(mobile ? 26 : 44), [mobile])

  useFrame(() => {
    const progress = progressRef.current
    const factor = explodeFactor(progress)

    stack.forEach((element, index) => {
      const node = elementRefs.current[index]
      if (!node) return
      node.position.y = element.y + element.travel * factor
    })

    const angle = 0.72 + progress * 0.38
    const radius = mobile ? 9.4 : 7.6
    camera.position.set(Math.sin(angle) * radius, 2.5 + factor * 0.9, Math.cos(angle) * radius)
    lookTarget.current.set(0, 1.45 + factor * 0.55, 0)
    camera.lookAt(lookTarget.current)
  })

  return (
    <>
      <StudioEnvironment />
      <LightRig />
      <fog attach="fog" args={['#11141a', 16, 30]} />
      <group position={[0, -1.6, 0]}>
        {stack.map((element, index) => (
          <group key={element.key} ref={(node) => (elementRefs.current[index] = node)} position={[0, element.y, 0]}>
            {element.node}
          </group>
        ))}
        <ContactShadow size={9} opacity={0.5} position={[0, 0.004, 0]} />
      </group>
    </>
  )
}

export default function MoldCanvas({ progressRef, active = true, mobile = false }) {
  return (
    <SceneBoundary>
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={mobile ? [1, 1.5] : [1, 1.75]}
        camera={{ position: [5.0, 2.5, 5.8], fov: 32, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ExplodedScene progressRef={progressRef} mobile={mobile} />
      </Canvas>
    </SceneBoundary>
  )
}
