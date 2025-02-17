import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'


const Sun = React.memo(() => {
  const sunRef = useRef<THREE.Mesh | null>(null)

  const [sunTexture] = useTexture(['/assets/sun_map.jpg'])

  useFrame(() => {
    if (!sunRef.current) return
    sunRef.current.rotation.y -= 0.002
  })

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshPhongMaterial
        map={sunTexture}
        emissiveMap={sunTexture}
        emissiveIntensity={0.6}
        emissive={0xffffff}
      />
      <pointLight castShadow />
    </mesh>
  )
})

export default Sun
