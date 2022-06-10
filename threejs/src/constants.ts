import * as THREE from 'three';
import { Hanoi } from './classes/hanoi';

export const INPUT = document.querySelector('input');
export const WON: HTMLElement = document.getElementById('won') as HTMLElement;
export const BTN_PLAY: HTMLElement = document.getElementById(
    'play'
) as HTMLElement;
export const CANCEL = document.getElementById('cancel') as HTMLElement;

export const FACES = 60;
export const GEOMETRY_TOWER = new THREE.CylinderGeometry(0.45, 0.45, 10, FACES);
export const MATERIAL_TOWER = new THREE.MeshPhongMaterial({ color: 'gray' });
export const MAX_DISK_HEIGHT = 2;
export const DISK_GAP = 0.125;
export const TOWER_GAP = 18;
export const HANOI = new Hanoi();
export const IMAGE_PATH = 'tower-of-hanoi/threejs/public/images/';
