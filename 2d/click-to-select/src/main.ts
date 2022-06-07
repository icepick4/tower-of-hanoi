/* eslint-disable no-unused-vars */
import {
    INPUT,
    WON,
    BTN_PLAY,
    CONTAINER_DISKS,
    TOWERS
} from "./constants";

BTN_PLAY.addEventListener("click", play);

for (let i = 0; i < TOWERS.length; i++) {
    TOWERS[i].addEventListener("click", clickTower);
    TOWERS[i].addEventListener("mouseover", mouseHover);
    TOWERS[i].addEventListener("mouseout", mouseOut);
}

function clickTower(this: HTMLElement, ev: MouseEvent) {
    //get bg of pic1
    const bg = this.style.backgroundColor;
    const pic = Number((ev.target as HTMLElement).id.substring(3)) - 1;

    if (bg == "blue") {
        this.style.backgroundColor = "black";
    }
    else {
        this.style.backgroundColor = "blue";
    }
    move(pic);
}

function mouseHover(this: HTMLElement) {
    const bg = this.style.backgroundColor;
    if (bg != "blue") {
        this.style.backgroundColor = "red";
    }
}

function mouseOut(this: HTMLElement) {
    const bg = this.style.backgroundColor;
    if (bg != "blue") {
        this.style.backgroundColor = "black";
    }
}

//event listener on resize window
window.addEventListener("resize", function () {
    hanoi.draw();
    for (let i = 0; i < TOWERS.length; i++) {
        TOWERS[i].style.width = (document.body.clientWidth / 50) + "px";
    }
});

let hanoi: Hanoi;

function move(col: number) {
    if (hanoi.clicked1 == null) {
        hanoi.setClicked(col);
    }
    else {
        unselectAll();
        if (hanoi.can_move(hanoi.clicked1, col)) {
            hanoi.move(hanoi.clicked1, col);
            hanoi.draw();
        }
        hanoi.clicked1 = null;
    }
}

function unselectAll() {
    for (let i = 0; i < TOWERS.length; i++) {
        TOWERS[i].style.backgroundColor = "black";
    }
}

function play() {
    //clear div with id "disks"
    CONTAINER_DISKS.innerHTML = "";
    unselectAll();
    WON.innerHTML = "Moves : 0";
    if (INPUT != null) {
        const n = Number(INPUT.value);
        if (n > 0 && n <= 7) {
            hanoi = new Hanoi(n);
            hanoi.draw();
        }
    }
}

class Hanoi {
    n: number;
    clicked1: number | null;
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
            CONTAINER_DISKS.appendChild(initDiv(div, n, i, str));
        }
        this.moves = 0;
        this.solved = false;
        this.clicked1 = null;
    }

    setClicked(i: number) {
        this.clicked1 = i;
    }

    can_move(from: number, to: number) {
        if (this.towers[from].length == 0) {
            return false;
        }
        else if (this.towers[to].length == 0) {
            return true;
        }
        else {
            return this.towers[from][this.towers[from].length - 1] < this.towers[to][this.towers[to].length - 1];
        }
    }

    move(from: number, to: number) {
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
                    (j * document.body.clientWidth) / 33.333 + 30 - 10 + "px";
                div.style.width =
                    (document.body.clientWidth * this.towers[i][j]) / 25 +
                    10 +
                    "px";
                div.style.height = document.body.clientWidth / 33.333 + "px";
                if (i == 0) {
                    div.style.left =
                        document.body.clientWidth / 6 -
                        div.offsetWidth / 2 +
                        TOWERS[0].offsetWidth / 2 +
                        "px";
                }
                else if (i == 1) {
                    div.style.left =
                        document.body.clientWidth / 2 -
                        div.offsetWidth / 2 +
                        TOWERS[1].offsetWidth / 2 +
                        "px";
                }
                else {
                    div.style.left =
                        document.body.clientWidth / 1.25 -
                        div.offsetWidth / 2 +
                        TOWERS[2].offsetWidth / 2 +
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
    div.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    div.style.border = "1px solid black";

    div.style.width =
        (document.body.clientWidth * (n - 1)) / 25 + 10 + "px";
    div.style.height = document.body.clientWidth / 33.333 + "px";
    div.style.position = "absolute";

    div.style.bottom = i * 45 + 30 - 10 + "px";
    div.style.left = screen.width / 6 - (n - i) * 30 + 2.5 + "px";
    div.style.zIndex = "2";
    return div;
}




