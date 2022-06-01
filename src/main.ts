//import three as a module
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Hanoi } from "./classes/hanoi";
import { Pic } from "./classes/pic";
import { Disk } from "./classes/disk";

// const input = document.querySelector("input");
// const won: HTMLElement = document.getElementById("won") as HTMLElement;
// const BTN_PLAY: HTMLElement = document.getElementById("play") as HTMLElement;
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const geometryPic = new THREE.CylinderGeometry(0.45, 0.45, 10, 45);
const materialPic = new THREE.MeshPhongMaterial({ color: "gray" });
const geometryBase = new THREE.CylinderGeometry(7, 7, 0.5, 45);
const materialBase = new THREE.MeshPhongMaterial({ color: "black" });
// BTN_PLAY.addEventListener("click", () => {
//     won.innerHTML = "Moves : 0";
//     if (input != null) {
//         var n: number = Number(input.value);
//         initDisks(n);
//         if (n > 0 && n <= 7) {
//             hanoi = new Hanoi(n);
//             hanoi.draw();
//         }
//     }
// });

var hanoi: Hanoi;
var selectedDisk: Disk;

let renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, scene: THREE.Scene, controls: OrbitControls, mouse: THREE.Vector2, raycaster: THREE.Raycaster;
mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();
let disks = new Array<Disk>();
let pics = new Array<Pic>();

init();
render();
function init() {
    scene = new THREE.Scene();
    let disks: Array<THREE.Mesh> = [];
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const base1 = new THREE.Mesh(geometryBase, materialBase);
    const base2 = new THREE.Mesh(geometryBase, materialBase);
    const base3 = new THREE.Mesh(geometryBase, materialBase);
    base1.position.x = -15;
    base3.position.x = 15

    const pic1 = new Pic(geometryPic, materialPic, 0);
    const pic2 = new Pic(geometryPic, materialPic, 1);
    const pic3 = new Pic(geometryPic, materialPic, 2);
    pics.push(pic1, pic2, pic3);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minAzimuthAngle = Math.PI / 2;
    controls.maxAzimuthAngle = 3 * Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;

    //floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshPhongMaterial({ color: "gray", depthWrite: false }));
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    floor.position.set(0, -0.5, 0);

    //lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);

    const dirLight = new THREE.PointLight(0xffffff, 0.8, 0, 2);
    dirLight.position.set(10, 20, - 50);
    dirLight.castShadow = true;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);


    //adding elements to the scene
    scene.add(dirLight);
    scene.add(hemiLight);
    scene.add(base1);
    scene.add(base2);
    scene.add(base3);
    scene.add(pic1.mesh);
    scene.add(pic2.mesh);
    scene.add(pic3.mesh);
    scene.add(floor);



    //camera settings
    camera.position.set(0, 20, -50);
    controls.update();

    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('click', onMouseClick, false);
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
    document.body.appendChild(renderer.domElement);
}


function render() {
    window.requestAnimationFrame(render);
    raycasting(false);
    renderer.render(scene, camera);
}

function onMouseMove(event: MouseEvent) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event: MouseEvent) {
    raycasting(true);
}

function raycasting(click: boolean) {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {
        var mesh = intersects[0].object as THREE.Mesh;

        for (let disk of disks) {
            if (disk.mesh != mesh && disk != selectedDisk) {
                disk.mesh.material = new THREE.MeshPhongMaterial({ color: disk.color });
            }
            else {
                if (click) {
                    selectedDisk = disk;
                }
                //check is the disk is on the top of the tower with his index
                if (hanoi.towers[disk.col][hanoi.towers[disk.col].length - 1] == disk) {
                    disk.mesh.material = new THREE.MeshPhongMaterial({ color: "green" });
                }
                else {
                    disk.mesh.material = new THREE.MeshPhongMaterial({ color: "rgb(65,65,65)" });
                }
            }
        }
        for (let pic of pics) {
            if (pic.mesh != mesh) {
                pic.mesh.material = materialPic;
            }
            else {
                pic.mesh.material = new THREE.MeshPhongMaterial({ color: "rgb(160,160,160)" });
            }
        }
    }
    else {
        for (let disk of disks) {
            if (disk != selectedDisk) {
                disk.mesh.material = new THREE.MeshPhongMaterial({ color: disk.color });
            }
        }
        for (let pic of pics) {
            pic.mesh.material = materialPic;
        }

    }
}


function initDisks(n: number) {
    for (let i = 0; i < n; i++) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        var rgb = "rgb(" + r + "," + g + "," + b + ")";
        var disk = new Disk(
            new THREE.CylinderGeometry(n - i + 0.5, n - i + 0.5, 1.5, 45),
            new THREE.MeshPhongMaterial({
                color: rgb
            }),
            rgb,
            i
        );
        disks.push(disk);
        scene.add(disk.mesh);
    }
    hanoi = new Hanoi(n, disks);
}

initDisks(3);