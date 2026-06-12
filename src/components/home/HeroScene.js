// Hero: a two-plate injection mold assembles itself from floating components.
// Choreography is a single eased progress value mapped onto staggered
// per-subassembly windows — no per-frame React state.
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import {
  ContactShadow,
  LightRig,
  METALS,
  SceneBoundary,
  StudioEnvironment,
  clamp01,
  easeInOutCubic,
  windowProgress,
} from './scene-utils'
import {
  Bore,
  CapScrew,
  CorePin,
  EjectorPin,
  EjectorSleeve,
  GuideBushing,
  GuidePin,
  LocatingRing,
  Plate,
  SprueBushing,
} from './parts'

const CAMERA_FROM = new THREE.Vector3(8.4, 5.8, 11.0)
const CAMERA_TO = new THREE.Vector3(5.7, 3.3, 7.1)
const GROUP_Y = -1.45
const STACK_CENTER_Y = 1.58 // mold stack center in group-local units

function buildParts(seg) {
  return [
    {
      key: 'bottom-clamp',
      home: [0, 0.13, 0],
      scatter: [-4.6, 3.2, -2.5],
      scatterRot: [0.6, 0.8, 0.4],
      node: <Plate width={3.7} thickness={0.26} depth={2.8} metal={METALS.plate} />,
    },
    {
      key: 'rail-left',
      home: [-1.48, 0.685, 0],
      scatter: [-5.4, 0.6, 2.2],
      scatterRot: [0.3, -0.7, 0.5],
      node: <Plate width={0.5} thickness={0.85} depth={2.8} metal={METALS.graphite} />,
    },
    {
      key: 'rail-right',
      home: [1.48, 0.685, 0],
      scatter: [5.0, 0.4, 2.8],
      scatterRot: [-0.4, 0.5, -0.6],
      node: <Plate width={0.5} thickness={0.85} depth={2.8} metal={METALS.graphite} />,
    },
    {
      key: 'ejector-base',
      home: [0, 0.39, 0],
      scatter: [-3.5, 4.4, 1.8],
      scatterRot: [0.8, 0.2, -0.5],
      node: <Plate width={2.1} thickness={0.14} depth={2.4} metal={METALS.plateLight} />,
    },
    {
      key: 'ejector-retainer',
      home: [0, 0.52, 0],
      scatter: [3.7, 4.8, -1.6],
      scatterRot: [-0.6, -0.4, 0.7],
      node: <Plate width={2.1} thickness={0.12} depth={2.4} metal={METALS.plateLight} />,
    },
    {
      key: 'ejection-set',
      home: [0, 0.58, 0],
      scatter: [-2.3, 5.6, -3.0],
      scatterRot: [1.2, 0.3, 0.2],
      node: (
        <group>
          <EjectorPin segments={seg / 2} position={[-0.5, 0, -0.42]} />
          <EjectorPin segments={seg / 2} position={[0.5, 0, -0.42]} />
          <EjectorPin segments={seg / 2} position={[-0.5, 0, 0.42]} />
          <EjectorPin segments={seg / 2} position={[0.5, 0, 0.42]} />
          <EjectorSleeve segments={seg} position={[-0.95, 0, 0]} scale={0.7} />
          <EjectorSleeve segments={seg} position={[0.95, 0, 0]} scale={0.7} />
        </group>
      ),
    },
    {
      key: 'core-plate',
      home: [0, 1.36, 0],
      scatter: [5.6, 2.4, -2.1],
      scatterRot: [0.5, -0.9, 0.4],
      node: (
        <group>
          <Plate width={3.5} thickness={0.5} depth={2.7} metal={METALS.plate} />
          <Plate width={1.3} thickness={0.025} depth={0.95} radius={0.05} metal={METALS.graphite} position={[0, 0.255, 0.1]} />
          <CorePin segments={seg} position={[-0.32, 0.26, 0.1]} scale={0.42} />
          <CorePin segments={seg} position={[0.32, 0.26, 0.1]} scale={0.42} />
          <Bore radius={0.09} position={[-1.0, 0.255, -0.85]} />
          <Bore radius={0.09} position={[1.0, 0.255, -0.85]} />
        </group>
      ),
    },
    {
      key: 'guide-bushings',
      home: [0, 1.61, 0],
      scatter: [-5.0, 2.0, 3.4],
      scatterRot: [-0.3, 0.7, 0.8],
      node: (
        <group>
          <GuideBushing segments={seg} position={[-1.42, 0, -1.05]} scale={0.8} />
          <GuideBushing segments={seg} position={[1.42, 0, -1.05]} scale={0.8} />
          <GuideBushing segments={seg} position={[-1.42, 0, 1.05]} scale={0.8} />
          <GuideBushing segments={seg} position={[1.42, 0, 1.05]} scale={0.8} />
        </group>
      ),
    },
    {
      key: 'cavity-plate',
      home: [0, 2.41, 0],
      scatter: [4.3, 3.8, 3.8],
      scatterRot: [0.7, 0.4, -0.7],
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
      key: 'top-clamp',
      home: [0, 2.79, 0],
      scatter: [-3.9, 5.8, -1.2],
      scatterRot: [-0.5, -0.6, 0.3],
      node: <Plate width={3.7} thickness={0.26} depth={2.8} metal={METALS.plate} />,
    },
    {
      key: 'sprue-bushing',
      home: [0, 2.62, 0],
      scatter: [1.3, 7.0, -2.8],
      scatterRot: [0.6, -0.5, 0.6],
      node: <SprueBushing segments={seg} scale={0.8} />,
    },
    {
      key: 'locating-ring',
      home: [0, 2.92, 0],
      scatter: [-1.7, 6.6, 2.6],
      scatterRot: [-0.8, 0.2, -0.4],
      node: <LocatingRing segments={seg + 12} />,
    },
    {
      key: 'cap-screws',
      home: [0, 2.92, 0],
      scatter: [0.5, 6.4, 4.0],
      scatterRot: [-0.4, 0.8, -0.8],
      node: (
        <group>
          <CapScrew position={[-1.6, 0, -1.18]} />
          <CapScrew position={[1.6, 0, -1.18]} />
          <CapScrew position={[-1.6, 0, 1.18]} />
          <CapScrew position={[1.6, 0, 1.18]} />
        </group>
      ),
    },
  ]
}

function AssemblyScene({ progressRef, onStage, mobile, reducedMotion }) {
  const camera = useThree((state) => state.camera)
  const aspect = useThree((state) => state.viewport.aspect)
  const groupRef = useRef(null)
  const partRefs = useRef([])
  const stageRef = useRef(-1)
  const pointer = useRef({ x: 0, y: 0 })

  const parts = useMemo(() => {
    const defs = buildParts(mobile ? 26 : 44)
    return defs.map((def) => ({
      ...def,
      homeV: new THREE.Vector3(...def.home),
      scatterV: new THREE.Vector3(...def.scatter),
    }))
  }, [mobile])

  // Frame the stack regardless of viewport aspect: the group shrinks on
  // narrow canvases and the camera target follows the scaled stack centre.
  const effScale = (mobile ? 0.62 : 1) * Math.min(1, Math.max(0.68, aspect / 1.5))
  const lookTarget = useMemo(
    () => new THREE.Vector3(mobile ? 0 : 0.7, GROUP_Y + STACK_CENTER_Y * effScale, 0),
    [mobile, effScale],
  )

  useEffect(() => {
    if (mobile || reducedMotion) return undefined
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mobile, reducedMotion])

  useFrame((state) => {
    const p = progressRef.current
    const time = state.clock.elapsedTime
    const stagger = 0.052
    const windowLength = 0.28

    parts.forEach((part, index) => {
      const node = partRefs.current[index]
      if (!node) return
      const start = 0.03 + index * stagger
      const t = easeInOutCubic(windowProgress(p, start, start + windowLength))
      node.position.lerpVectors(part.scatterV, part.homeV, t)
      node.position.y += Math.sin(time * 0.7 + index * 1.7) * 0.085 * (1 - t)
      node.rotation.set(part.scatterRot[0] * (1 - t), part.scatterRot[1] * (1 - t), part.scatterRot[2] * (1 - t))
    })

    if (groupRef.current) {
      const settled = p >= 0.995 && !reducedMotion ? 1 : 0
      groupRef.current.rotation.y = Math.sin(time * 0.11) * 0.05 * settled + pointer.current.x * 0.055
      groupRef.current.rotation.x = pointer.current.y * -0.02
    }

    const cameraT = easeInOutCubic(clamp01(p * 1.12))
    camera.position.lerpVectors(CAMERA_FROM, CAMERA_TO, cameraT)
    camera.lookAt(lookTarget)

    const stage = p < 0.18 ? 0 : p < 0.55 ? 1 : p < 0.92 ? 2 : 3
    if (stage !== stageRef.current) {
      stageRef.current = stage
      onStage?.(stage)
    }
  })

  return (
    <>
      <StudioEnvironment />
      <LightRig />
      <fog attach="fog" args={['#11141a', 15, 28]} />
      <group ref={groupRef} position={[mobile ? 0 : 1.0, GROUP_Y, 0]} scale={effScale}>
        {parts.map((part, index) => (
          <group key={part.key} ref={(node) => (partRefs.current[index] = node)}>
            {part.node}
          </group>
        ))}
        <ContactShadow size={8.5} opacity={0.55} position={[0, 0.004, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.012, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#101319" metalness={0.4} roughness={0.85} />
        </mesh>
      </group>
    </>
  )
}

export default function HeroScene({ active = true, reducedMotion = false, mobile = false, onStage }) {
  const progressRef = useRef(reducedMotion ? 1 : 0)

  useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 1
      onStage?.(3)
      return undefined
    }
    const state = { p: 0 }
    const tween = gsap.to(state, {
      p: 1,
      duration: 5.4,
      delay: 0.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        progressRef.current = state.p
      },
    })
    return () => tween.kill()
  }, [reducedMotion, onStage])

  return (
    <SceneBoundary>
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={mobile ? [1, 1.5] : [1, 1.75]}
        camera={{ position: CAMERA_FROM.toArray(), fov: 30, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <AssemblyScene progressRef={progressRef} onStage={onStage} mobile={mobile} reducedMotion={reducedMotion} />
      </Canvas>
    </SceneBoundary>
  )
}
