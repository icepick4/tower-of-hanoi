import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Tower } from './classes/tower';
import { Disk } from './classes/disk';
import {
    MAX_DISK_HEIGHT,
    TOWER_GAP,
    BTN_PLAY,
    DISK_GAP,
    INPUT,
    WON,
    FACES,
    GEOMETRY_TOWER,
    MATERIAL_TOWER,
    HANOI,
    CANCEL
} from './constants';

let selectedDisk: Disk | null;
let movingTop = false;
let movingCol: Tower | null = null;
let canPlace = false;
const xSpeed = 1;

let renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    controls: OrbitControls;

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let disks: Disk[] = [];
const towers: Tower[] = [];

BTN_PLAY.addEventListener('click', () => {
    WON.style.display = 'block';
    // reset the game
    HANOI.reset();
    resetGamePlay();
    if (INPUT != null) {
        const n = Number(INPUT.value);
        if (n > 0 && n <= 7) {
            initDisks(n);
        }
    }
});
CANCEL.addEventListener('click', cancelLastMove);

init();
render();

function render() {
    window.requestAnimationFrame(render);
    raycasting(false);
    if (movingTop && selectedDisk != null) {
        moveTop(selectedDisk);
    } else if (movingCol != null && selectedDisk != null) {
        moveCol(selectedDisk, movingCol);
    }
    renderer.render(scene, camera);
}

function onMouseMove(event: MouseEvent) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick() {
    raycasting(true);
}

function raycasting(click: boolean) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(scene, true);
    if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        for (const disk of disks) {
            if (disk.mesh !== mesh && disk !== selectedDisk) {
                disk.mesh.material = new THREE.MeshPhongMaterial({
                    color: disk.color
                });
            } else {
                let diskAtTop = false;
                diskAtTop =
                    HANOI.towers[disk.col][HANOI.towers[disk.col].length - 1] ===
                    disk;
                // console.log(HANOI.towers[disk.col][HANOI.towers[disk.col].length - 1].col);
                if (
                    click &&
                    diskAtTop &&
                    movingCol == null &&
                    selectedDisk == null
                ) {
                    selectedDisk = disk;
                    movingTop = true;
                }
                // check is the disk is on the top of the tower with his index
                if (diskAtTop) {
                    disk.mesh.material = new THREE.MeshPhongMaterial({
                        color: 'green'
                    });
                } else {
                    disk.mesh.material = new THREE.MeshPhongMaterial({
                        color: 'rgb(65,65,65)'
                    });
                }
                if (disk === selectedDisk) {
                    disk.mesh.material = new THREE.MeshPhongMaterial({
                        color: disk.color
                    });
                }
            }
        }
        for (const tower of towers) {
            if (tower.mesh !== mesh) {
                tower.mesh.material = MATERIAL_TOWER;
            } else {
                if (
                    click &&
                    selectedDisk != null &&
                    movingCol == null &&
                    !movingTop
                ) {
                    if (HANOI.canMove(selectedDisk.col, tower.index)) {
                        canPlace = true;
                        movingCol = tower;
                        break;
                    } else {
                        canPlace = false;
                        if (selectedDisk.col === 0) {
                            movingCol = towers[0];
                        } else if (selectedDisk.col === 1) {
                            movingCol = towers[1];
                        } else {
                            movingCol = towers[2];
                        }
                    }
                }
                if (selectedDisk != null) {
                    tower.mesh.material = new THREE.MeshPhongMaterial({
                        color: 'rgb(160,160,160)'
                    });
                }
            }
        }
    } else {
        for (const disk of disks) {
            if (disk !== selectedDisk) {
                disk.mesh.material = new THREE.MeshPhongMaterial({
                    color: disk.color
                });
            }
        }
        for (const tower of towers) {
            tower.mesh.material = MATERIAL_TOWER;
        }
    }
}

function moveTop(disk: Disk) {
    if (disk.mesh.position.y < TOWER_GAP) {
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

function moveCol(disk: Disk, tower: Tower) {
    let lenCol = HANOI.towers[tower.index].length;
    if (canPlace) {
        lenCol++;
    }

    const distanceY = lenCol * disk.height - disk.height / 2;
    // console.log({ distanceY });
    // console.log({ lenCol });
    if (tower.index === 0) {
        if (
            disk.mesh.position.x < TOWER_GAP &&
            disk.mesh.position.x + xSpeed < TOWER_GAP
        ) {
            disk.mesh.position.x += xSpeed;
        } else {
            disk.mesh.position.x = TOWER_GAP;
            if (
                disk.mesh.position.y > distanceY &&
                disk.mesh.position.y - xSpeed > distanceY
            ) {
                disk.mesh.position.y -= xSpeed;
            } else {
                disk.mesh.position.y = distanceY;
                movingCol = null;
                if (selectedDisk != null && canPlace) {
                    HANOI.move(selectedDisk.col, tower.index, false);
                    disk.col = tower.index;
                }
                selectedDisk = null;
            }
        }
    } else if (tower.index === 1) {
        if (
            disk.mesh.position.y > distanceY &&
            disk.mesh.position.y - xSpeed > distanceY
        ) {
            disk.mesh.position.y -= xSpeed;
        } else {
            disk.mesh.position.y = distanceY;
            movingCol = null;
            if (selectedDisk != null && canPlace) {
                HANOI.move(selectedDisk.col, tower.index, false);
                disk.col = tower.index;
            }

            selectedDisk = null;
        }
    } else {
        if (
            disk.mesh.position.x > -TOWER_GAP &&
            disk.mesh.position.x - xSpeed > -TOWER_GAP
        ) {
            disk.mesh.position.x -= xSpeed;
        } else {
            disk.mesh.position.x = -TOWER_GAP;
            if (
                disk.mesh.position.y > distanceY &&
                disk.mesh.position.y - xSpeed > distanceY
            ) {
                disk.mesh.position.y -= xSpeed;
            } else {
                disk.mesh.position.y = distanceY;
                movingCol = null;
                if (selectedDisk != null && canPlace) {
                    HANOI.move(selectedDisk.col, tower.index, false);
                    disk.col = tower.index;
                }
                selectedDisk = null;
            }
        }
    }
}

function cancelLastMove() {
    if (HANOI.moves > 0 && HANOI.lastsMoves.length > 0) {
        HANOI.moves--;
        const cols = HANOI.lastsMoves[HANOI.lastsMoves.length - 1];
        if (cols != null) {
            for (const disk of disks) {
                if (disk.col === cols[1]) {
                    if (selectedDisk == null) {
                        selectedDisk = disk;
                        disk.col = cols[0];
                    } else if (disk.index > selectedDisk.index) {
                        selectedDisk = disk;
                        disk.col = cols[0];
                    }
                }
            }
            movingTop = true;
            canPlace = false;
            movingCol = towers[cols[0]];
        }
        HANOI.cancelLastMove();
    }
}

function initDisks(n: number) {
    for (let i = 0; i < n; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const rgb = 'rgb(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
        const radius = n - i + 0.5;
        const disk = new Disk(
            new THREE.CylinderGeometry(
                radius,
                radius,
                MAX_DISK_HEIGHT - DISK_GAP * n,
                FACES
            ),
            new THREE.MeshPhongMaterial({
                color: rgb
            }),
            rgb,
            i,
            MAX_DISK_HEIGHT - DISK_GAP * n
        );
        disks.push(disk);
        scene.add(disk.mesh);
    }
    HANOI.init(disks);
}

function resetGamePlay() {
    for (const disk of disks) {
        scene.remove(disk.mesh);
    }
    disks = [];
    HANOI.reset();
    selectedDisk = null;
    movingCol = null;
    movingTop = false;
    canPlace = false;
    WON.innerHTML = 'Moves : 0';
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // init a rectangle
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(55, 0.5, 17.5),
        new THREE.MeshBasicMaterial({ color: 'black' })
    );
    base.position.set(0, -0.5, 0);
    base.castShadow = true;

    // init
    for (let i = 0; i < 3; i++) {
        const TOWER = new Tower(GEOMETRY_TOWER, MATERIAL_TOWER, i);
        towers.push(TOWER);
    }

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    // restrict camera movement
    controls.minAzimuthAngle = Math.PI / 2;
    controls.maxAzimuthAngle = (3 * Math.PI) / 2;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    // restrict camera zoom
    controls.minDistance = 20;
    controls.maxDistance = 75;

    // // floor
    // const floor = new THREE.Mesh(
    //     new THREE.PlaneGeometry(3000, 3000),
    //     new THREE.MeshPhongMaterial({ color: 'gray', depthWrite: false })
    // );
    // floor.rotation.x = -Math.PI / 2;
    // floor.receiveShadow = true;
    // floor.position.set(0, -0.5, 0);
    const floorMat = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005
    });

    const textureLoader = new THREE.TextureLoader();

    textureLoader.load('/images/hardwood2_diffuse.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        map.encoding = THREE.sRGBEncoding;
        floorMat.map = map;
        floorMat.needsUpdate = true;
    });
    textureLoader.load('/images/hardwood2_bump.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.bumpMap = map;
        floorMat.needsUpdate = true;
    });
    textureLoader.load('/images/hardwood2_roughness.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
    });

    const floorGeometry = new THREE.PlaneGeometry(2000, 2000);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = -Math.PI / 2.0;
    floorMesh.receiveShadow = true;
    floorMesh.position.set(0, -0.5, 0);
    scene.add(floorMesh);

    // lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    const dirLight = new THREE.PointLight(0xffffff, 2, 400);
    dirLight.position.set(10, 30, -100);
    dirLight.castShadow = true;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // adding elements to the scene
    scene.add(dirLight);
    scene.add(hemiLight);
    scene.add(base);
    for (let i = 0; i < 3; i++) {
        scene.add(towers[i].mesh);
    }

    // camera settings
    camera.position.set(0, 15, -30);
    controls.update();

    // add events listeners
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('click', onMouseClick, false);
    window.addEventListener(
        'resize',
        () => {
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
