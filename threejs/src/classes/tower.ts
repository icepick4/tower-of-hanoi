import * as THREE from 'three';
import { TOWER_GAP } from '../constants';

/* The Tower class is a class that creates a tower object with a geometry, material, and mesh, and has
a position that depends on the index. */
export class Tower {
    geometry: THREE.CylinderGeometry;
    material: THREE.MeshPhongMaterial;
    mesh: THREE.Mesh;
    index: number;
    constructor(
        geometry: THREE.CylinderGeometry,
        material: THREE.MeshPhongMaterial,
        index: number
    ) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.name = 'tower';
        this.index = index;
        if (index === 0) {
            this.mesh.position.set(TOWER_GAP, 5, 0);
        } else if (index === 1) {
            this.mesh.position.set(0, 5, 0);
        } else if (index === 2) {
            this.mesh.position.set(-TOWER_GAP, 5, 0);
        }
    }
}
