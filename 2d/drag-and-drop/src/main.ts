/* eslint-disable no-unused-vars */
import {
    BTN_PLAY,
    TOWERS,
    TOWERS_AREAS,
    INPUT,
    WON,
    DROP_AREAS
} from "./constants";

let startDragCol: number;
let startDragDisk: number;
let hanoi: Hanoi;

BTN_PLAY.addEventListener("click", play);

//event listener on resize window
window.addEventListener("resize", function () {
    if (hanoi != null) {
        hanoi.draw();
    }
    for (let i = 0; i < TOWERS_AREAS.length; i++) {
        TOWERS_AREAS[i].style.width = (document.body.clientWidth / 50).toString() + "px";
    }
});

//event on opening devtools
window.addEventListener("click", function () {
    if (hanoi != null) {
        hanoi.draw();
    }
});

function setEvents() {
    for (let i = 0; i < TOWERS[0].children.length; i++) {
        TOWERS[0].children[i].addEventListener("dragstart", handleDragStart);
        TOWERS[0].children[i].addEventListener("dragend", handleDragEnd);
    }
    for (let i = 0; i < DROP_AREAS.length; i++) {
        DROP_AREAS[i].addEventListener("dragover", allowDrop);
        DROP_AREAS[i].addEventListener("drop", drop);
    }
}

function allowDrop(ev: DragEvent) {
    ev.preventDefault();
    const diskAtTop =
        hanoi.towers[startDragCol][hanoi.towers[startDragCol].length - 1] ==
        startDragDisk;
    //get the tower we are over
    if (ev.target != null) {
        //get id
        const id: string = (ev.target as HTMLElement).id;
        //id equald last char of id
        const col = Number(id.substring(id.length - 1));
        for (let i = 0; i < TOWERS_AREAS.length; i++) {
            if (TOWERS_AREAS[i].id == "pic-area-" + col.toString() && hanoi.can_move(startDragCol, i) && diskAtTop) {
                TOWERS_AREAS[i].style.backgroundColor = "purple";
            } else {
                TOWERS_AREAS[i].style.backgroundColor = "black";
            }
        }
    }
}

function drop(ev: DragEvent) {
    ev.preventDefault();
    //get the id of the pic where we drop
    if (ev.target != null) {
        const id: string = (ev.target as HTMLElement).id;
        const col = Number(id.substring(id.length - 1));
        move(col);
    }
    for (let i = 0; i < TOWERS_AREAS.length; i++) {
        TOWERS_AREAS[i].style.backgroundColor = "black";
    }
}

function handleDragStart(this: HTMLElement) {
    this.style.opacity = "0.75";
    this.style.border = "1px dashed #000";
    const disk = Number(this.id.substring(this.id.length - 1));
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < hanoi.towers[i].length; j++) {
            if (hanoi.towers[i][j] == disk) {
                startDragCol = i;
                startDragDisk = disk;
                break;
            }
        }
    }
}

function handleDragEnd(this: HTMLElement) {
    this.style.opacity = "1";
    this.style.border = "1px solid #000";
}

function move(col: number) {
    const diskAtTop =
        hanoi.towers[startDragCol][hanoi.towers[startDragCol].length - 1] ==
        startDragDisk;
    if (hanoi.can_move(startDragCol, col) && diskAtTop) {
        hanoi.move(startDragCol, col);
        hanoi.draw();
    }
}

function removeDiskFromPic(pic: HTMLElement) {
    const disk: HTMLElement = pic.lastChild as HTMLElement;
    pic.removeChild(disk);
    return disk;
}

function play() {
    //clear divs
    for (let i = 0; i < TOWERS.length; i++) {
        TOWERS[i].innerHTML = "";
    }
    WON.innerHTML = "Moves : 0";
    if (INPUT != null) {
        const n = Number(INPUT.value);
        if (n > 0 && n <= 7) {
            hanoi = new Hanoi(n);
            hanoi.draw();
        }
    }
    setEvents();
}

class Hanoi {
    n: number;
    towers: Array<Array<number>>;
    moves: number;
    solved: boolean;
    constructor(n: number) {
        this.n = n;
        this.towers = [];
        for (let i = 0; i < 3; i++) {
            const disk_array: Array<number> = [];
            this.towers.push(disk_array);
        }
        for (let i = 0; i < this.n; i++) {
            this.towers[0].push(this.n - i);
            //i into string
            const str = (this.n - i).toString();
            //create a new div with id disk_i
            const div = document.createElement("div");
            TOWERS[0].appendChild(initDiv(div, n, i, str));
        }
        this.moves = 0;
        this.solved = false;
    }

    can_move(from: number, to: number) {
        if (this.towers[from].length == 0) {
            return false;
        } else if (this.towers[to].length == 0) {
            return true;
        } else {
            return (
                this.towers[from][this.towers[from].length - 1] <
                this.towers[to][this.towers[to].length - 1]
            );
        }
    }

    move(from: number, to: number) {
        //remove the last child in the pic number from
        const lastChild: HTMLElement = removeDiskFromPic(TOWERS[from]);
        TOWERS[to].appendChild(lastChild);

        this.towers[to].push(this.towers[from].pop() as number);

        this.moves++;
        WON.innerHTML = "Moves : " + this.moves.toString();
        if (this.towers[2].length == this.n) {
            this.solved = true;
            //display #won
            WON.innerHTML = "You won in " + this.moves.toString() + " moves!";
        }
    }

    draw() {
        //draw the disks on the lines
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < this.towers[i].length; j++) {
                const div: HTMLElement = document.getElementById(
                    "disk_" + this.towers[i][j].toString()
                ) as HTMLElement;
                div.style.bottom =
                    ((j * document.body.clientWidth) / 33.333 + 30 - 10).toString() + "px";
                div.style.width =
                    ((document.body.clientWidth * this.towers[i][j]) / 25 +
                        10).toString() +
                    "px";
                div.style.height = (document.body.clientWidth / 33.333).toString() + "px";
                if (i == 0) {
                    div.style.left =
                        (document.body.clientWidth / 6 -
                            div.offsetWidth / 2 +
                            TOWERS_AREAS[0].offsetWidth / 2).toString() +
                        "px";
                }
                else if (i == 1) {
                    div.style.left =
                        (document.body.clientWidth / 2 -
                            div.offsetWidth / 2 +
                            TOWERS_AREAS[1].offsetWidth / 2).toString() +
                        "px";
                }
                else {
                    div.style.left =
                        (document.body.clientWidth / 1.25 -
                            div.offsetWidth / 2 +
                            TOWERS_AREAS[2].offsetWidth / 2).toString() +
                        "px";
                }
            }
        }
    }
}

function initDiv(div: HTMLElement, n: number, i: number, str: string) {
    div.id = "disk_" + str;
    //random color for fillStyle
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    div.style.backgroundColor = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
    div.style.border = "1px solid black";

    div.style.width =
        ((document.body.clientWidth * (n - 1)) / 25 + 10).toString() + "px";
    div.style.height = (document.body.clientWidth / 33.333).toString() + "px";
    div.style.position = "absolute";
    div.draggable = true;
    div.style.cursor = "move";

    div.style.bottom = (i * 45 + 30 - 10).toString() + "px";
    div.style.left = (screen.width / 6 - (n - i) * 30 + 2.5).toString() + "px";
    div.style.zIndex = "2";
    return div;
}
