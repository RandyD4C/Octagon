// Shared 3D scene utilities for the homepage experience.
// Environment lighting comes from three's RoomEnvironment (procedural, no
// network fetch) so metallic materials get studio reflections offline.
import { Component, useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Material recipes — scene paint, mirroring the page's machined-metal language.
export const METALS = {
  steel: { color: '#9aa1ab', metalness: 0.9, roughness: 0.34 },
  polished: { color: '#c9ced6', metalness: 0.96, roughness: 0.14 },
  plate: { color: '#5d646e', metalness: 0.84, roughness: 0.46 },
  plateLight: { color: '#7a818c', metalness: 0.82, roughness: 0.42 },
  graphite: { color: '#23262c', metalness: 0.6, roughness: 0.58 },
  bronze: { color: '#8a6a3c', metalness: 0.92, roughness: 0.36 },
  brand: { color: '#2f64b8', metalness: 0.72, roughness: 0.34 },
}

export function StudioEnvironment() {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const target = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = target.texture
    return () => {
      scene.environment = null
      target.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  return null
}

// Soft fake contact shadow — a radial-gradient plane instead of real shadow
// maps, which keeps every scene shadow-pass free.
export function ContactShadow({ size = 7, opacity = 0.5, position = [0, 0, 0] }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 256
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    gradient.addColorStop(0, 'rgba(2, 4, 8, 0.65)')
    gradient.addColorStop(0.5, 'rgba(2, 4, 8, 0.3)')
    gradient.addColorStop(1, 'rgba(2, 4, 8, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
    return new THREE.CanvasTexture(canvas)
  }, [])

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  )
}

export function LightRig({ intensity = 1 }) {
  return (
    <>
      <directionalLight position={[4, 7, 5]} intensity={1.6 * intensity} />
      <directionalLight position={[-6, 3, -4]} intensity={0.5 * intensity} color="#aac4ee" />
      <ambientLight intensity={0.12 * intensity} />
    </>
  )
}

export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function clamp01(value) {
  return Math.min(1, Math.max(0, value))
}

// Maps a global progress value onto a per-part animation window.
export function windowProgress(progress, start, end) {
  return clamp01((progress - start) / (end - start))
}

// Renders nothing when WebGL fails so the CSS poster behind the canvas shows.
export class SceneBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {}

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
