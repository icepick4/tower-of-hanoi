import * as THREE from 'three';

export class Disk {
    geometry: THREE.CylinderGeometry;
    material: THREE.MeshPhongMaterial;
    mesh: THREE.Mesh;
    color: string;
    col: number;
    index: number;
    selected: boolean;
    constructor(geometry: THREE.CylinderGeometry, material: THREE.MeshPhongMaterial, color: string, index: number) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.position.set(15, (index+1) * 1.5 - (1.5/2), 0);
        this.mesh.name = "disk";
        this.color = color;
        this.col = 0;
        this.index = index;
        this.selected = false;
    }
}