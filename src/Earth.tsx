import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useRef } from "react"

const Bumi = () => {
    const EarthRef = useRef();
    const [bumiTexture, bumiSpecularMap, bumiNormalMap] = useTexture([
        "/assets/bumi.jpg",
        "/assets/bumiSpecular.jpg"
    ])

    useFrame(() => {
        if (EarthRef.current) {
            EarthRef.current.rotation.y += 0.002
        }
    })

    return (
        <mesh ref={EarthRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial map={bumiTexture} displacementScale={0.5}
                specularMap={bumiSpecularMap} normalMap={bumiNormalMap} />
        </mesh>
    )
}
export default Bumi