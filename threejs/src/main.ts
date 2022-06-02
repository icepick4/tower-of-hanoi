import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Hanoi } from "./classes/hanoi";
import { Pic } from "./classes/pic";
import { Disk } from "./classes/disk";

const input = document.querySelector("input");
export const won: HTMLElement = document.getElementById("won") as HTMLElement;
const BTN_PLAY: HTMLElement = document.getElementById("play") as HTMLElement;
const FACES = 60;
const geometryPic = new THREE.CylinderGeometry(0.45, 0.45, 10, FACES);
const materialPic = new THREE.MeshPhongMaterial({ color: "gray" });
const geometryBase = new THREE.CylinderGeometry(7, 7, 0.5, FACES);
const materialBase = new THREE.MeshPhongMaterial({ color: "black" });
const maxDiskHeight = 2;
const diskGap = 0.125;
export const PIC_GAP = 18;

var hanoi: Hanoi = new Hanoi();
var selectedDisk: Disk | null;
var movingTop: boolean = false;
var movingCol: Pic | null = null;
var canPlace = false;
var xSpeed = 1;

let renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    controls: OrbitControls,
    mouse: THREE.Vector2,
    raycaster: THREE.Raycaster;
mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();
let disks = new Array<Disk>();
let pics = new Array<Pic>();

BTN_PLAY.addEventListener("click", () => {
    //reset the game
    hanoi.reset();
    for (var i = 0; i < disks.length; i++) {
        scene.remove(disks[i].mesh);
    }
    disks = new Array<Disk>();
    won.innerHTML = "Moves : 0";
    if (input != null) {
        var n: number = Number(input.value);
        initDisks(n);
    }
});

init();
render();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    //opti that
    const base1 = new THREE.Mesh(geometryBase, materialBase);
    const base2 = new THREE.Mesh(geometryBase, materialBase);
    const base3 = new THREE.Mesh(geometryBase, materialBase);
    base1.position.x = -PIC_GAP;
    base3.position.x = PIC_GAP;

    for (let i = 0; i < 3; i++) {
        const pic = new Pic(geometryPic, materialPic, i);
        pics.push(pic);
    }

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    //restrict camera movement
    controls.minAzimuthAngle = Math.PI / 2;
    controls.maxAzimuthAngle = (3 * Math.PI) / 2;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;

    //floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(3000, 3000),
        new THREE.MeshPhongMaterial({ color: "gray", depthWrite: false })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floor.position.set(0, -0.5, 0);

    //lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    const dirLight = new THREE.PointLight(0xffffff, 0.8, 0, 2);
    dirLight.position.set(10, 20, -50);
    dirLight.castShadow = true;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    //adding elements to the scene
    scene.add(dirLight);
    scene.add(hemiLight);
    scene.add(base1);
    scene.add(base2);
    scene.add(base3);
    scene.add(floor);
    for (let i = 0; i < 3; i++) {
        scene.add(pics[i].mesh);
    }

    //camera settings
    camera.position.set(0, 15, -30);
    controls.update();

    //add events listeners
    window.addEventListener("pointermove", onMouseMove);
    window.addEventListener("click", onMouseClick, false);
    window.addEventListener(
        "resize",
        () => {
            xSpeed = xSpeed / (window.innerWidth / window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            render();
            console.log(xSpeed);
        },
        false
    );
    document.body.appendChild(renderer.domElement);
}

function render() {
    window.requestAnimationFrame(render);
    raycasting(false);
    if (movingTop && selectedDisk != null) {
        moveTop(selectedDisk);
    }
    if (movingCol != null && selectedDisk != null) {
        moveCol(selectedDisk, movingCol);
    }
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
                disk.mesh.material = new THREE.MeshPhongMaterial({
                    color: disk.color,
                });
            } else {
                var diskAtTop = false;
                diskAtTop =
                    hanoi.towers[disk.col][hanoi.towers[disk.col].length - 1] ==
                    disk;
                if (
                    click &&
                    diskAtTop &&
                    movingCol == null &&
                    selectedDisk == null
                ) {
                    selectedDisk = disk;
                    movingTop = true;
                }
                //check is the disk is on the top of the tower with his index
                if (diskAtTop) {
                    disk.mesh.material = new THREE.MeshPhongMaterial({
                        color: "green",
                    });
                } else {
                    disk.mesh.material = new THREE.MeshPhongMaterial({
                        color: "rgb(65,65,65)",
                    });
                }
            }
        }
        for (let pic of pics) {
            if (pic.mesh != mesh) {
                pic.mesh.material = materialPic;
            } else {
                if (click && selectedDisk != null && movingCol == null) {
                    if (hanoi.canMove(selectedDisk.col, pic.index)) {
                        canPlace = true;
                        movingCol = pic;
                        break;
                    } else {
                        canPlace = false;
                        if (selectedDisk.col == 0) {
                            movingCol = pics[0];
                        } else if (selectedDisk.col == 1) {
                            movingCol = pics[1];
                        } else {
                            movingCol = pics[2];
                        }
                    }
                }
                if (selectedDisk != null) {
                    pic.mesh.material = new THREE.MeshPhongMaterial({
                        color: "rgb(160,160,160)",
                    });
                }
            }
        }
    } else {
        for (let disk of disks) {
            if (disk != selectedDisk) {
                disk.mesh.material = new THREE.MeshPhongMaterial({
                    color: disk.color,
                });
            }
        }
        for (let pic of pics) {
            pic.mesh.material = materialPic;
        }
    }
}

function moveTop(disk: Disk) {
    if (disk.mesh.position.y < PIC_GAP - 5) {
        disk.mesh.position.y += xSpeed;
    } else {
        if (disk.mesh.position.x > 0 && disk.mesh.position.x - xSpeed > 0) {
            disk.mesh.position.x -= xSpeed;
        } else if (
            disk.mesh.position.x < 0 &&
            disk.mesh.position.x + xSpeed < 0
        ) {
            disk.mesh.position.x += xSpeed;
        } else {
            disk.mesh.position.x = 0;
            movingTop = false;
        }
    }
}

function moveCol(disk: Disk, pic: Pic) {
    var lenCol = hanoi.towers[pic.index].length;
    var distanceY: number;
    if (canPlace) {
        lenCol++;
    }
    distanceY = lenCol * disk.height - disk.height / 2;
    if (pic.index == 0) {
        if (
            disk.mesh.position.x < PIC_GAP &&
            disk.mesh.position.x + xSpeed < PIC_GAP
        ) {
            disk.mesh.position.x += xSpeed;
        } else {
            disk.mesh.position.x = PIC_GAP;
            if (
                disk.mesh.position.y > distanceY &&
                disk.mesh.position.y - xSpeed > distanceY
            ) {
                disk.mesh.position.y -= xSpeed;
            } else {
                disk.mesh.position.y = distanceY;
                movingCol = null;
                if (selectedDisk != null && canPlace) {
                    hanoi.move(selectedDisk.col, pic.index);
                    disk.col = pic.index;
                }
                selectedDisk = null;
            }
        }
    } else if (pic.index == 1) {
        if (
            disk.mesh.position.y > distanceY &&
            disk.mesh.position.y - xSpeed > distanceY
        ) {
            disk.mesh.position.y -= xSpeed;
        } else {
            disk.mesh.position.y = distanceY;
            movingCol = null;
            if (selectedDisk != null && canPlace) {
                hanoi.move(selectedDisk.col, pic.index);
                disk.col = pic.index;
            }

            selectedDisk = null;
        }
    } else {
        if (
            disk.mesh.position.x > -PIC_GAP &&
            disk.mesh.position.x - xSpeed > -PIC_GAP
        ) {
            disk.mesh.position.x -= xSpeed;
        } else {
            disk.mesh.position.x = -PIC_GAP;
            if (
                disk.mesh.position.y > distanceY &&
                disk.mesh.position.y - xSpeed > distanceY
            ) {
                disk.mesh.position.y -= xSpeed;
            } else {
                disk.mesh.position.y = distanceY;
                movingCol = null;
                if (selectedDisk != null && canPlace) {
                    hanoi.move(selectedDisk.col, pic.index);
                    disk.col = pic.index;
                }
                selectedDisk = null;
            }
        }
    }
}

function initDisks(n: number) {
    for (let i = 0; i < n; i++) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        var rgb = "rgb(" + r + "," + g + "," + b + ")";
        var radius = n - i + 0.5;
        var disk = new Disk(
            new THREE.CylinderGeometry(
                radius,
                radius,
                maxDiskHeight - diskGap * n,
                FACES
            ),
            new THREE.MeshPhongMaterial({
                color: rgb,
            }),
            rgb,
            i,
            maxDiskHeight - diskGap * n
        );
        disks.push(disk);
        scene.add(disk.mesh);
    }
    if (n > 0 && n <= 7) {
        hanoi.init(disks);
    }
}
