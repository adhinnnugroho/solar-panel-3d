import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'


const AnimatedStars = () => {
    const starsRef = useRef<THREE.Points | null>(null)

    useFrame(() => {
        if (!starsRef.current) return
        starsRef.current.rotation.x += 0.0001
        starsRef.current.rotation.y += 0.0001
        starsRef.current.rotation.z += 0.0001
    })

    return <Stars ref={starsRef} />
}

export default AnimatedStars
