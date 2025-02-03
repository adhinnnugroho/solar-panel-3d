import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function CameraPositionLogging({ event }: { event: string }) {
    const { camera } = useThree();
    const cameraRef = useRef<THREE.Camera | null>(null);

    useEffect(() => {
        const logCameraPosition = () => {
            if (!cameraRef.current) return;

            const { x, y, z } = cameraRef.current.position;
            console.log(`Camera position: x: ${x.toFixed(2)}, y: ${y.toFixed(2)}, z: ${z.toFixed(2)}`);
        };

        cameraRef.current = camera; // Tidak menggunakan optional chaining
        window.addEventListener(event, logCameraPosition);

        return () => {
            window.removeEventListener(event, logCameraPosition);
        };
    }, [event, camera]);

    return null;
}

export default CameraPositionLogging;
