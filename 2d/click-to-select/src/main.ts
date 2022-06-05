const input = document.querySelector("input");
const won: HTMLElement = document.getElementById("won") as HTMLElement;
const BTN_PLAY: HTMLElement = document.getElementById("play") as HTMLElement;
const CONTAINER_DISKS: HTMLElement = document.getElementById("disks") as HTMLElement;

const PIC1: HTMLElement = document.getElementById("pic1") as HTMLElement;
const PIC2: HTMLElement = document.getElementById("pic2") as HTMLElement;
const PIC3: HTMLElement = document.getElementById("pic3") as HTMLElement;

BTN_PLAY.addEventListener("click", play);

PIC1.addEventListener("mouseover", mouseHover);
PIC1.addEventListener("mouseout", mouseOut);

PIC2.addEventListener("mouseover", mouseHover);
PIC2.addEventListener("mouseout", mouseOut);

PIC3.addEventListener("mouseover", mouseHover);
PIC3.addEventListener("mouseout", mouseOut);

PIC1.addEventListener("click", clickPic);
PIC2.addEventListener("click", clickPic);
PIC3.addEventListener("click", clickPic);

function clickPic(this: HTMLElement, ev: MouseEvent) {
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
    PIC1.style.width = (document.body.clientWidth / 50) + "px";
    PIC2.style.width = (document.body.clientWidth / 50) + "px";
    PIC3.style.width = (document.body.clientWidth / 50) + "px";
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
    PIC1.style.backgroundColor = "black";
    PIC2.style.backgroundColor = "black";
    PIC3.style.backgroundColor = "black";
}

function play() {
    //clear div with id "disks"
    CONTAINER_DISKS.innerHTML = "";
    unselectAll();
    won.innerHTML = "Moves : 0";
    if (input != null) {
        const n = Number(input.value);
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
            div.id = "disk_" + str;

            //random color for fillStyle
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            div.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
            div.style.border = "1px solid black";

            div.style.width = (document.body.clientWidth) * (this.n - 1) / 25 + 10 + "px";
            div.style.height = (document.body.clientWidth) / 33.333 + "px";
            div.style.position = "absolute";

            div.style.bottom = (i) * 45 + 30 - 10 + "px";
            div.style.left = screen.width / 6 - (this.n - i) * 30 + 2.5 + "px";
            div.style.zIndex = "1";

            CONTAINER_DISKS.appendChild(div);
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
        won.innerHTML = "Moves : " + this.moves.toString();
        if (this.towers[2].length == this.n) {
            this.solved = true;
            //display #won 
            won.innerHTML = "You won in " + this.moves.toString() + " moves!";
        }
    }

    draw() {
        //draw the disks on the lines
        for (let i = 0; i < this.towers[0].length; i++) {
            const div: HTMLElement = document.getElementById("disk_" + (this.towers[0][i]).toString()) as HTMLElement;
            div.style.bottom = (i) * (document.body.clientWidth) / 33.333 + 30 - 10 + "px";
            div.style.width = (document.body.clientWidth) * (this.towers[0][i]) / 25 + 10 + "px";
            div.style.height = (document.body.clientWidth) / 33.333 + "px";
            div.style.left = document.body.clientWidth / 6 - div.offsetWidth / 2 + PIC1.offsetWidth / 2 + "px";
        }
        for (let i = 0; i < this.towers[1].length; i++) {
            const div: HTMLElement = document.getElementById("disk_" + (this.towers[1][i]).toString()) as HTMLElement;
            div.style.bottom = (i) * (document.body.clientWidth) / 33.333 + 30 - 10 + "px";
            div.style.width = (document.body.clientWidth) * (this.towers[1][i]) / 25 + 10 + "px";
            div.style.height = (document.body.clientWidth) / 33.333 + "px";
            div.style.left = document.body.clientWidth / 2 - div.offsetWidth / 2 + PIC1.offsetWidth / 2 + "px";
        }
        for (let i = 0; i < this.towers[2].length; i++) {
            const div: HTMLElement = document.getElementById("disk_" + (this.towers[2][i]).toString()) as HTMLElement;
            div.style.bottom = (i) * (document.body.clientWidth) / 33.333 + 30 - 10 + "px";
            div.style.width = (document.body.clientWidth) * (this.towers[2][i]) / 25 + 10 + "px";
            div.style.height = (document.body.clientWidth) / 33.333 + "px";
            div.style.left = document.body.clientWidth / 1.25 - div.offsetWidth / 2 + PIC1.offsetWidth / 2 + "px";
        }
    }
}



