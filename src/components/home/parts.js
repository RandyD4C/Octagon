// Procedural precision-mold components. Every part is a machined revolve
// profile (LatheGeometry) or a beveled plate (ExtrudeGeometry) — no external
// model downloads, so the 3D scenes carry zero asset weight.
import { useMemo } from 'react'
import * as THREE from 'three'
import { METALS } from './scene-utils'

function latheFrom(points, segments) {
  const geometry = new THREE.LatheGeometry(
    points.map(([x, y]) => new THREE.Vector2(x, y)),
    segments,
  )
  geometry.computeVertexNormals()
  return geometry
}

export function Revolve({ profile, segments = 44, metal = METALS.steel, doubleSide = false, ...props }) {
  const geometry = useMemo(() => latheFrom(profile, segments), [profile, segments])
  return (
    <mesh geometry={geometry} {...props}>
      <meshStandardMaterial
        color={metal.color}
        metalness={metal.metalness}
        roughness={metal.roughness}
        side={doubleSide ? THREE.DoubleSide : THREE.FrontSide}
      />
    </mesh>
  )
}

function roundedRectShape(width, depth, radius) {
  const shape = new THREE.Shape()
  const x = -width / 2
  const y = -depth / 2
  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + depth - radius)
  shape.quadraticCurveTo(x + width, y + depth, x + width - radius, y + depth)
  shape.lineTo(x + radius, y + depth)
  shape.quadraticCurveTo(x, y + depth, x, y + depth - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)
  return shape
}

// A mold plate: rounded-corner extrusion with a small chamfer bevel, laid flat.
export function Plate({ width = 3, thickness = 0.4, depth = 2.4, radius = 0.07, metal = METALS.plate, ...props }) {
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(roundedRectShape(width, depth, radius), {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 1,
      curveSegments: 4,
    })
    geo.rotateX(-Math.PI / 2)
    geo.center()
    return geo
  }, [width, thickness, depth, radius])

  return (
    <mesh geometry={geometry} {...props}>
      <meshStandardMaterial color={metal.color} metalness={metal.metalness} roughness={metal.roughness} />
    </mesh>
  )
}

// ── Revolve profiles (x = radius, y = height, base at y 0) ──────────────────

const CORE_PIN_PROFILE = [
  [0, 0],
  [0.27, 0],
  [0.3, 0.03],
  [0.3, 0.16],
  [0.155, 0.16],
  [0.155, 1.0],
  [0.09, 1.07],
  [0.09, 1.6],
  [0.062, 1.65],
  [0, 1.65],
]

const EJECTOR_SLEEVE_PROFILE = [
  [0.1, 0.01],
  [0.2, 0.01],
  [0.225, 0.04],
  [0.225, 0.16],
  [0.142, 0.16],
  [0.142, 1.42],
  [0.1, 1.42],
  [0.1, 0.01],
]

const GUIDE_PIN_PROFILE = [
  [0, 0],
  [0.21, 0],
  [0.21, 0.12],
  [0.135, 0.12],
  [0.135, 1.32],
  [0.1, 1.4],
  [0, 1.4],
]

const GUIDE_BUSHING_PROFILE = [
  [0.142, 0.01],
  [0.24, 0.01],
  [0.265, 0.04],
  [0.265, 0.14],
  [0.205, 0.14],
  [0.205, 0.56],
  [0.142, 0.56],
  [0.142, 0.01],
]

const LOCATING_RING_PROFILE = [
  [0.42, 0.01],
  [0.82, 0.01],
  [0.86, 0.05],
  [0.86, 0.16],
  [0.74, 0.16],
  [0.7, 0.2],
  [0.46, 0.2],
  [0.42, 0.14],
  [0.42, 0.01],
]

const SPRUE_BUSHING_PROFILE = [
  [0.08, 0],
  [0.2, 0],
  [0.2, 0.55],
  [0.34, 0.55],
  [0.34, 0.7],
  [0.08, 0.7],
  [0.08, 0],
]

export function CorePin({ metal = METALS.polished, segments = 40, ...props }) {
  return <Revolve profile={CORE_PIN_PROFILE} segments={segments} metal={metal} {...props} />
}

export function EjectorSleeve({ metal = METALS.steel, segments = 40, ...props }) {
  return <Revolve profile={EJECTOR_SLEEVE_PROFILE} segments={segments} metal={metal} doubleSide {...props} />
}

export function GuidePin({ metal = METALS.polished, segments = 36, ...props }) {
  return <Revolve profile={GUIDE_PIN_PROFILE} segments={segments} metal={metal} {...props} />
}

export function GuideBushing({ metal = METALS.bronze, segments = 36, ...props }) {
  return <Revolve profile={GUIDE_BUSHING_PROFILE} segments={segments} metal={metal} doubleSide {...props} />
}

export function LocatingRing({ metal = METALS.steel, segments = 56, ...props }) {
  return <Revolve profile={LOCATING_RING_PROFILE} segments={segments} metal={metal} doubleSide {...props} />
}

export function SprueBushing({ metal = METALS.steel, segments = 36, ...props }) {
  return <Revolve profile={SPRUE_BUSHING_PROFILE} segments={segments} metal={metal} {...props} />
}

export function EjectorPin({ length = 1.3, segments = 20, metal = METALS.polished, ...props }) {
  const profile = useMemo(
    () => [
      [0, 0],
      [0.085, 0],
      [0.085, 0.05],
      [0.035, 0.05],
      [0.035, length],
      [0, length],
    ],
    [length],
  )
  return <Revolve profile={profile} segments={segments} metal={metal} {...props} />
}

// Socket-head cap screw: turned head + dark hex socket inset.
export function CapScrew({ segments = 28, ...props }) {
  return (
    <group {...props}>
      <Revolve
        profile={[
          [0, 0],
          [0.115, 0],
          [0.115, 0.115],
          [0.095, 0.13],
          [0, 0.13],
        ]}
        segments={segments}
        metal={METALS.graphite}
      />
      <mesh position={[0, 0.125, 0]}>
        <cylinderGeometry args={[0.058, 0.058, 0.02, 6]} />
        <meshStandardMaterial color="#0b0d11" metalness={0.5} roughness={0.7} />
      </mesh>
    </group>
  )
}

// Dark bore inserts suggest drilled holes without CSG cost.
export function Bore({ radius = 0.1, depth = 0.04, ...props }) {
  return (
    <mesh {...props}>
      <cylinderGeometry args={[radius, radius, depth, 24]} />
      <meshStandardMaterial color="#0d0f13" metalness={0.4} roughness={0.8} />
    </mesh>
  )
}
