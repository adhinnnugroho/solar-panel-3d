import { useTexture } from "@react-three/drei"

const Bumi = () => {
    const [bumiTexture] = useTexture(["/assets/bumi.jpg"])
    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={bumiTexture} />
        </mesh>
    )
}
export default Bumi