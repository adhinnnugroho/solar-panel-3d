
import { useHelper } from "@react-three/drei"
import AnimatedStars from "./AnimatedStars"
import Bumi from "./Earth"
import { useRef } from "react"
import * as THREE from "three"


const MainContainer = () => {
    const directionalLightRef = useRef();
    const directionalLightRefTwo = useRef();

    // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "red");
    // useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, "red");
    return (
        <>
            <color attach="background" args={[0, 0, 0]} />
            <AnimatedStars />
            {/* <directionalLight ref={directionalLightRef} position={[0, 0, 10]} intensity={4}
                color={"white"} />
            <directionalLight ref={directionalLightRefTwo} position={[0, 0, -10]} /> */}
            <ambientLight />
            <Bumi />
        </>
    )
}

export default MainContainer