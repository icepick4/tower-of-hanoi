// const input = document.querySelector("input");
// const won: HTMLElement = document.getElementById("won") as HTMLElement;
// const BTN_PLAY: HTMLElement = document.getElementById("play") as HTMLElement;
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

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

//import three as a module
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, scene: THREE.Scene, controls: OrbitControls, mouse: THREE.Vector2, raycaster: THREE.Raycaster;
mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();
let disks = new Map<THREE.Mesh, string>();

init();
render();
function init() {
    scene = new THREE.Scene();
    let disks: Array<THREE.Mesh> = [];
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const pipe1 = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.5, 45), new THREE.MeshBasicMaterial({ color: "black" }));
    const pipe2 = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.5, 45), new THREE.MeshBasicMaterial({ color: "black" }));
    const pipe3 = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.5, 45), new THREE.MeshBasicMaterial({ color: "black" }));
    const pic1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 10, 45), new THREE.MeshPhongMaterial({ color: "gray" }));
    pic1.castShadow = true;
    const pic2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 10, 45), new THREE.MeshPhongMaterial({ color: "gray" }));
    pic2.castShadow = true;
    const pic3 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 10, 45), new THREE.MeshPhongMaterial({ color: "gray" }));
    pic3.castShadow = true;
    pipe1.position.x = -15;
    pipe3.position.x = 15
    pic1.position.set(-15, 5, 0);
    pic3.position.set(15, 5, 0);
    pic2.position.y = 5;


    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minAzimuthAngle = Math.PI / 2;
    controls.maxAzimuthAngle = 3 * Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;

    //floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: "gray", depthWrite: false }));
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    floor.position.set(0, -0.5, 0);

    //lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);

    const dirLight = new THREE.PointLight(0xffffff);
    dirLight.position.set(10, 20, - 50);
    dirLight.castShadow = true;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);


    //adding elements to the scene
    scene.add(dirLight);
    scene.add(hemiLight);
    scene.add(pipe1);
    scene.add(pipe2);
    scene.add(pipe3);
    scene.add(pic1);
    scene.add(pic2);
    scene.add(pic3);
    scene.add(floor);



    //camera settings
    camera.position.set(0, 20, -50);
    controls.update();

    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener("resize", resize, false);
    document.body.appendChild(renderer.domElement);

}


function render() {
    window.requestAnimationFrame(render);

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {
        var mesh = intersects[0].object as THREE.Mesh;
        if (mesh.name == "disk") {
            mesh.material = new THREE.MeshPhongMaterial({ color: "red" });
        }
        for (let [disk, color] of disks) {
            if (disk != mesh) {
                disk.material = new THREE.MeshPhongMaterial({ color: color });
            }
        }
    }
    else {
        for (let [disk, color] of disks) {
            disk.material = new THREE.MeshPhongMaterial({ color: color });
        }
    }
    renderer.render(scene, camera);
}


function resize() {
    camera.aspect = winWidth / winHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event: MouseEvent) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}


function initDisks(n: number) {
    for (let i = 0; i < n; i++) {
        var rgb = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        var disk = new THREE.Mesh(new THREE.CylinderGeometry(n - i + 0.5, n - i + 0.5, 1.5, 45), new THREE.MeshPhongMaterial({
            color: rgb
        }));
        disk.castShadow = true;
        disk.position.set(15, i * 1.5 + 1.5 / 2, 0);
        disk.name = "disk";
        disks.set(disk, rgb);
        disk.receiveShadow = true;
        scene.add(disk);
    }
}

initDisks(3);