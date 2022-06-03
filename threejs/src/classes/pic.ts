import * as THREE from 'three';
import { PIC_GAP } from "../constants";

export class Pic {
    geometry: THREE.CylinderGeometry;
    material: THREE.MeshPhongMaterial;
    mesh: THREE.Mesh;
    index: number;
    constructor(geometry: THREE.CylinderGeometry, material: THREE.MeshPhongMaterial, index: number) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.name = "pic";
        this.index = index;
        if (index == 0) {
            this.mesh.position.set(PIC_GAP, 5, 0);
        }
        else if (index == 1) {
            this.mesh.position.set(0, 5, 0);
        }
        else if (index == 2) {
            this.mesh.position.set(-PIC_GAP, 5, 0);
        }
    }
}