import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'

import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import Moon from './Moon'
import ISS from './ISS'

const Earth = React.memo(({ displacementScale }: any) => {
  const earthRef = useRef<THREE.Group | null>(null)

  const clockRef = useRef(new THREE.Clock())

  const { camera } = useThree()

  const [hovered, hover] = useState(false)
  const [followingEarth, setFollowingEarth] = useState(false)

  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(16.14, 8.32, 19.81)
  )

  const [cameraTarget, setCameraTarget] = useState(new THREE.Vector3(0, 0, 0))

  const [
    earthTexture,
    earthNormalMap,
    earthSpecularMap,
    earthDisplacementMap,
    earthEmissiveMap,
  ] = useTexture([
    '/assets/earth_day.jpg',
    '/assets/earth_normal.jpg',
    '/assets/earth_specular.jpg',
    '/assets/earth_displacement.jpg',
    '/assets/earth_night.jpg',
  ])

  const updateEarthPosition = useCallback(() => {
    const angle = clockRef.current.getElapsedTime() * 0.5
    const distance = 14
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    if (!earthRef.current) return
    earthRef.current.position.set(x, 0, z)
    earthRef.current.rotation.y += 0.002
  }, [])

  const toggleFollowingEarth = () => {
    setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth)
  }

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  const tweenLogic = useCallback(() => {
    TWEEN.update()
    if (!earthRef.current) return
    const earthPositionRef = earthRef.current.position

    if (followingEarth) {
      const cameraTargetPosition = new THREE.Vector3(
        earthPositionRef.x + 10,
        earthPositionRef.y + 2,
        earthPositionRef.z + 5
      )
      //Tween for camera position
      new TWEEN.Tween(cameraPosition)
        .to(cameraTargetPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraPosition(cameraPosition)
        })
        .start()

      //Tween for camera targeting
      new TWEEN.Tween(cameraTarget)
        .to(earthPositionRef, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraTarget(cameraTarget)
        })
        .start()
    } else {
      const originalCameraPosition = new THREE.Vector3(16.14, 8.32, 19.81)
      const originalCameraTarget = new THREE.Vector3(0, 0, 0)
      //Tween to original position
      new TWEEN.Tween(cameraPosition)
        .to(originalCameraPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraPosition(cameraPosition)
        })
        .start()
      //Tween to original target
      new TWEEN.Tween(cameraTarget)
        .to(originalCameraTarget, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraTarget(cameraTarget)
        })
        .start()
    }
    camera.lookAt(cameraTarget)
    camera.position.copy(cameraPosition)
    camera.updateProjectionMatrix()
  }, [earthRef, followingEarth, cameraPosition])

  useFrame(() => {
    updateEarthPosition()
    tweenLogic()
  })

  return (
    <group ref={earthRef}>
      <mesh
        castShadow
        receiveShadow
        onClick={toggleFollowingEarth}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={1000}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
          emissiveMap={earthEmissiveMap}
          emissive={0xffffff}
          emissiveIntensity={hovered ? 20 : 1.5}
        />
      </mesh>
      <ISS />
      <Moon />
    </group>
  )
})

export default Earth
