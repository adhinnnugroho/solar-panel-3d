

import AnimatedStars from "./AnimatedStars"
import Earth from './scenes/earth/Earth'

import { useRef } from "react"
import * as THREE from "three"
import Sun from "./scenes/sun/Sun"


const MainContainer = () => {
    // const directionalLightRef = useRef();
    // const directionalLightRefTwo = useRef();
    return (
        <>
            <color attach="background" args={[0, 0, 0]} />
            <AnimatedStars />
            <ambientLight intensity={0.1} />

            <Sun />
            <Earth displacementScale={0.15} />
        </>
    )
}

export default MainContainer