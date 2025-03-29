import { Object3D, Group, Mesh, CylinderGeometry, ConeGeometry, BoxGeometry, MeshStandardMaterial, AmbientLight, PointLight, GridHelper } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any
      mesh: any
      cylinderGeometry: any
      coneGeometry: any
      boxGeometry: any
      meshStandardMaterial: any
      ambientLight: any
      pointLight: any
      gridHelper: any
    }
  }
}

export {} 