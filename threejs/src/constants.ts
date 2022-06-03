import * as THREE from "three";

export const INPUT = document.querySelector("input");
export const WON: HTMLElement = document.getElementById("won") as HTMLElement;
export const BTN_PLAY: HTMLElement = document.getElementById("play") as HTMLElement;
export const FACES = 60;
export const GEOMETRY_PIC = new THREE.CylinderGeometry(0.45, 0.45, 10, FACES);
export const MATERIAL_PIC = new THREE.MeshPhongMaterial({ color: "gray" });
export const MAX_DISK_HEIGHT = 2;
export const DISK_GAP = 0.125;
export const PIC_GAP = 18;