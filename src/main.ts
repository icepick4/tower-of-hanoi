const input = document.querySelector("input");
const won: HTMLElement = document.getElementById("won") as HTMLElement;
const BTN_PLAY: HTMLElement = document.getElementById("play") as HTMLElement;
BTN_PLAY.addEventListener("click", () => {
    won.innerHTML = "Moves : 0";
    if (input != null) {
        var n: number = Number(input.value);
        initDisks(n);
        if (n > 0 && n <= 7) {
            hanoi = new Hanoi(n);
            hanoi.draw();
        }
    }
});

var hanoi: Hanoi;

//import three as a module
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { floorPowerOfTwo } from 'three/src/math/MathUtils';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const pipe1 = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.5, 45), new THREE.MeshLambertMaterial({ color: "black" }));
const pipe2 = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.5, 45), new THREE.MeshLambertMaterial({ color: "black" }));
const pipe3 = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.5, 45), new THREE.MeshLambertMaterial({ color: "black" }));
const pic1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 10, 45), new THREE.MeshStandardMaterial({ color: "gray" }));
pic1.castShadow = true;
const pic2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 10, 45), new THREE.MeshStandardMaterial({ color: "gray" }));
pic2.castShadow = true;
const pic3 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 10, 45), new THREE.MeshStandardMaterial({ color: "gray" }));
pic3.castShadow = true;
pipe1.position.x = -15;
pipe3.position.x = 15
pic1.position.set(-15, 5, 0);
pic3.position.set(15, 5, 0);
pic2.position.y = 5;


var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

const controls = new OrbitControls(camera, renderer.domElement);
controls.minAzimuthAngle = Math.PI / 2;
controls.maxAzimuthAngle = 3 * Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2 - 0.1;

// lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

const dirLight = new THREE.PointLight("rgb(230,230,230)");
dirLight.position.set(20, 10, -50);
dirLight.castShadow = true;
scene.add(dirLight);


// ground

const floor = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshStandardMaterial({ color: "rgb(150,150,150)", depthWrite: false }));
floor.rotation.x = - Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

//adding elements to the scene
scene.add(pipe1);
scene.add(pipe2);
scene.add(pipe3);
scene.add(pic1);
scene.add(pic2);
scene.add(pic3);



//camera settings
camera.position.set(0, 20, -50);
controls.update();


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);
animate();


function initDisks(n: number) {
    for (let i = 0; i < n; i++) {
        var rgb = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        var disk = new THREE.Mesh(new THREE.CylinderGeometry(n - i + 0.5, n - i + 0.5, 1.5, 45), new THREE.MeshStandardMaterial({ color: rgb }));
        disk.position.set(15, i * 1.5 + 1.5 / 2, 0);
        disk.receiveShadow = true;
        disk.castShadow = true;
        scene.add(disk);
    }
}

initDisks(3);