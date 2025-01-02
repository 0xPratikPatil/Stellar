'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRef } from 'react'
import * as THREE from 'three'

// Extend the default JSX namespace to include the custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      cylinderGeometry: any;
      coneGeometry: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      gridHelper: any;
    }
  }
}

function Rocket() {
  const rocketRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.5
      rocketRef.current.rotation.z = Math.cos(clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <group ref={rocketRef}>
      {/* Rocket Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="hsl(var(--primary))" />
      </mesh>
      
      {/* Nose Cone */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="hsl(var(--primary))" />
      </mesh>
      
      {/* Fins */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[0, -1.5, 0]}
          rotation={[0, (i * Math.PI) / 2, 0]}
        >
          <boxGeometry args={[0.1, 1, 1]} />
          <meshStandardMaterial color="hsl(var(--primary))" />
        </mesh>
      ))}
    </group>
  )
}

export default function RocketOrientation() {
  return (
    <Card className="bg-background border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-primary/60">
          Rocket Orientation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] bg-black/50">
          <Canvas>
            <PerspectiveCamera makeDefault position={[5, 5, 5]} />
            <OrbitControls enableDamping />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Rocket />
            <gridHelper args={[20, 20, "#34D399", "#1F2937"]} />
          </Canvas>
        </div>
      </CardContent>
    </Card>
  )
}

