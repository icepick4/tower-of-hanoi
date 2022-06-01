import * as THREE from 'three';

export class Pic {
    geometry: THREE.CylinderGeometry;
    material: THREE.MeshPhongMaterial;
    mesh: THREE.Mesh;
    constructor(geometry: THREE.CylinderGeometry, material: THREE.MeshPhongMaterial, index: number) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.name = "pic";

        if (index == 0) {
            this.mesh.position.set(-15, 5, 0);
        }
        else if (index == 1) {
            this.mesh.position.set(0, 5, 0);
        }
        else if (index == 2) {
            this.mesh.position.set(15, 5, 0);
        }
    }
}