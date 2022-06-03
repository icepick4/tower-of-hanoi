import * as THREE from "three";
import { TOWER_GAP } from "../constants";

export class Disk {
    geometry: THREE.CylinderGeometry;
    material: THREE.MeshPhongMaterial;
    mesh: THREE.Mesh;
    color: string;
    col: number;
    index: number;
    selected: boolean;
    height: number;
    constructor(
        geometry: THREE.CylinderGeometry,
        material: THREE.MeshPhongMaterial,
        color: string,
        index: number,
        height: number
    ) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        if (index == 0) {
            this.mesh.position.set(TOWER_GAP, (index + 1) * height, 0);
        }
        this.mesh.position.set(TOWER_GAP, (index + 1) * height - height / 2, 0);
        this.mesh.name = "disk";
        this.color = color;
        this.col = 0;
        this.index = index;
        this.selected = false;
        this.height = height;
    }
}
