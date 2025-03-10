import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Disk } from './classes/disk';
import { Tower } from './classes/tower';
import {
    BTN_PLAY,
    CANCEL,
    DISK_GAP,
    FACES,
    GEOMETRY_TOWER,
    HANOI,
    IMAGE_PATH,
    INPUT,
    MATERIAL_TOWER,
    MAX_DISK_HEIGHT,
    RESET_CAM,
    TOWER_GAP,
    WON
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
        if (n > 0 && n <= 12) {
            initDisks(n);
        }
    }
});

RESET_CAM.addEventListener('click', () => {
    camera.position.set(0, 15, -30);
    camera.lookAt(0, 0, 0);
});

CANCEL.addEventListener('click', cancelLastMove);

initScene();
render();

/**
 * If the game isn't solved, check for mouse clicks. If the mouse is clicked, check if the user already
 * took one, is yes move it to the column chose, if not move the disk on top.
 */
function render() {
    window.requestAnimationFrame(render);
    if (!HANOI.solved) {
        raycasting(false);
    }
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
    if (!HANOI.solved) {
        raycasting(true);
    }
}

/**
 * It checks if the user clicked on a disk or a tower, and if so, it changes the color of the disk or
 * tower to indicate that it's been selected. If there is no click, there is a feed back on the color
 * @param {boolean} click - boolean - true if the mouse is clicked, false otherwise
 */
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
                    HANOI.towers[disk.col][
                        HANOI.towers[disk.col].length - 1
                    ] === disk;
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

/**
 * If the disk is not at the top of the tower, move it up. If it is at the top of the tower, move it to
 * the center.
 * @param {Disk} disk - Disk - the disk that is being moved
 */
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

/**
 * "If the disk is not in the correct position, move it towards the correct position."
 * The function is called every frame, and it checks if the disk is in the correct position. If it is
 * not, it moves the disk towards the correct position.
 * @param {Disk} disk - Disk - the disk that is being moved
 * @param {Tower} tower - Tower - the tower that the disk is being moved to
 */
function moveCol(disk: Disk, tower: Tower) {
    let lenCol = HANOI.towers[tower.index].length;
    if (canPlace) {
        lenCol++;
    }

    const distanceY = lenCol * disk.height - disk.height / 2;
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
                if (selectedDisk != null && canPlace && !HANOI.solved) {
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

/**
 * If there are moves to cancel, then cancel the last move by moving the top disk of the destination
 * tower back to the source tower.
 */
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

/**
 * `initDisks` creates a set of disks with random colors and adds them to the scene.
 *
 * The function takes a single argument, `n`, which is the number of disks to create.
 *
 * The disk's radius is calculated by subtracting the current iteration number from `n` and adding
 * `0.5`.
 *
 * The disk's height is calculated by subtracting `DISK_GAP * n` from `MAX_DISK_HEIGHT`.
 *
 * @param {number} n - number of disks
 */
function initDisks(n: number) {
    for (let i = 0; i < n; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const rgb =
            'rgb(' +
            r.toString() +
            ',' +
            g.toString() +
            ',' +
            b.toString() +
            ')';
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

/**
 * It removes all the disks from the scene, resets the game, and resets the UI.
 */
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

function initScene() {
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

    // init towers
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

    const floorMat = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005
    });

    // load textures for the floor
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
        __dirname + IMAGE_PATH + 'hardwood2_diffuse.jpg',
        function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(10, 24);
            map.encoding = THREE.sRGBEncoding;
            floorMat.map = map;
            floorMat.needsUpdate = true;
        }
    );
    textureLoader.load(
        __dirname + IMAGE_PATH + 'hardwood2_bump.jpg',
        function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(10, 24);
            floorMat.bumpMap = map;
            floorMat.needsUpdate = true;
        }
    );
    textureLoader.load(
        __dirname + IMAGE_PATH + 'hardwood2_roughness.jpg',
        function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(10, 24);
            floorMat.roughnessMap = map;
            floorMat.needsUpdate = true;
        }
    );

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
        },
        false
    );
    document.body.appendChild(renderer.domElement);
}
