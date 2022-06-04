import {
    BTN_PLAY,
    PIC1,
    PIC2,
    PIC3,
    PIC1_AREA,
    PIC2_AREA,
    PIC3_AREA,
    INPUT,
    WON,
    TOWER0,
    TOWER1,
    TOWER2
} from "./constants";

var startDragCol: number;
var startDragDisk: number;
var hanoi: Hanoi;

BTN_PLAY.addEventListener("click", play);

//event listener on resize window
window.addEventListener("resize", function (e) {
    if (hanoi != null) {
        hanoi.draw();
    }
    PIC1_AREA.style.width = document.body.clientWidth / 50 + "px";
    PIC2_AREA.style.width = document.body.clientWidth / 50 + "px";
    PIC3_AREA.style.width = document.body.clientWidth / 50 + "px";
});

//event on opening devtools
window.addEventListener("click", function (e) {
    if (hanoi != null) {
        hanoi.draw();
    }
});

function setEvents() {
    for (var i = 0; i < PIC1.children.length; i++) {
        PIC1.children[i].addEventListener("dragstart", handleDragStart);
        PIC1.children[i].addEventListener("dragend", handleDragEnd);
    }
    TOWER0.addEventListener("dragover", allowDrop);
    TOWER1.addEventListener("dragover", allowDrop);
    TOWER2.addEventListener("dragover", allowDrop);
    TOWER0.addEventListener("drop", drop);
    TOWER1.addEventListener("drop", drop);
    TOWER2.addEventListener("drop", drop);
}

function allowDrop(ev: DragEvent) {
    ev.preventDefault();
}

function drop(ev: DragEvent) {
    ev.preventDefault();
    //get the id of the pic where we drop
    if (ev.target != null) {
        var id: string = (ev.target as HTMLElement).id;
        var col: number = Number(id.substring(5, 6));
        move(col);
    }
}

function handleDragStart(this: HTMLElement) {
    this.style.opacity = "0.75";
    this.style.border = "1px dashed #000";
    var disk: number = Number(this.id.substring(5, 6));
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < hanoi.towers[i].length; j++) {
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
    var diskAtTop =
        hanoi.towers[startDragCol][hanoi.towers[startDragCol].length - 1] ==
        startDragDisk;
    if (hanoi.can_move(startDragCol, col) && diskAtTop) {
        hanoi.move(startDragCol, col);
        hanoi.draw();
    }
}

function removeDiskFromPic(pic: HTMLElement) {
    var disk: HTMLElement = pic.lastChild as HTMLElement;
    pic.removeChild(disk);
    return disk;
}

function play() {
    //clear divs
    PIC1.innerHTML = "";
    PIC2.innerHTML = "";
    PIC3.innerHTML = "";
    WON.innerHTML = "Moves : 0";
    if (INPUT != null) {
        var n: number = Number(INPUT.value);
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
        for (var i = 0; i < 3; i++) {
            let disk_array: Array<number> = [];
            this.towers.push(disk_array);
        }
        for (var i = 0; i < this.n; i++) {
            this.towers[0].push(this.n - i);
            //i into string
            var str = (this.n - i).toString();
            //create a new div with id disk_i
            var div = document.createElement("div");
            PIC1.appendChild(initDiv(div, n, i, str));
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
        var lastChild: HTMLElement;
        if (from == 0) {
            lastChild = removeDiskFromPic(PIC1);
        } else if (from == 1) {
            lastChild = removeDiskFromPic(PIC2);
        } else {
            lastChild = removeDiskFromPic(PIC3);
        }
        if (to == 0) {
            PIC1.appendChild(lastChild);
        } else if (to == 1) {
            PIC2.appendChild(lastChild);
        } else {
            PIC3.appendChild(lastChild);
        }

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
        for (var i = 0; i < this.towers[0].length; i++) {
            var div: HTMLElement = document.getElementById(
                "disk_" + this.towers[0][i].toString()
            ) as HTMLElement;
            div.style.bottom =
                (i * document.body.clientWidth) / 33.333 + 30 - 10 + "px";
            div.style.width =
                (document.body.clientWidth * this.towers[0][i]) / 25 +
                10 +
                "px";
            div.style.height = document.body.clientWidth / 33.333 + "px";
            div.style.left =
                document.body.clientWidth / 6 -
                div.offsetWidth / 2 +
                PIC1_AREA.offsetWidth / 2 +
                "px";
        }
        for (var i = 0; i < this.towers[1].length; i++) {
            var div: HTMLElement = document.getElementById(
                "disk_" + this.towers[1][i].toString()
            ) as HTMLElement;
            div.style.bottom =
                (i * document.body.clientWidth) / 33.333 + 30 - 10 + "px";
            div.style.width =
                (document.body.clientWidth * this.towers[1][i]) / 25 +
                10 +
                "px";
            div.style.height = document.body.clientWidth / 33.333 + "px";
            div.style.left =
                document.body.clientWidth / 2 -
                div.offsetWidth / 2 +
                PIC1_AREA.offsetWidth / 2 +
                "px";
        }
        for (var i = 0; i < this.towers[2].length; i++) {
            var div: HTMLElement = document.getElementById(
                "disk_" + this.towers[2][i].toString()
            ) as HTMLElement;
            div.style.bottom =
                (i * document.body.clientWidth) / 33.333 + 30 - 10 + "px";
            div.style.width =
                (document.body.clientWidth * this.towers[2][i]) / 25 +
                10 +
                "px";
            div.style.height = document.body.clientWidth / 33.333 + "px";
            div.style.left =
                document.body.clientWidth / 1.25 -
                div.offsetWidth / 2 +
                PIC1_AREA.offsetWidth / 2 +
                "px";
        }
    }
}

function initDiv(div: HTMLElement, n: number, i: number, str: string) {
    div.id = "disk_" + str;
    //random color for fillStyle
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    div.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    div.style.border = "1px solid black";

    div.style.width =
        (document.body.clientWidth * (n - 1)) / 25 + 10 + "px";
    div.style.height = document.body.clientWidth / 33.333 + "px";
    div.style.position = "absolute";
    div.draggable = true;
    div.style.cursor = "move";

    div.style.bottom = i * 45 + 30 - 10 + "px";
    div.style.left = screen.width / 6 - (n - i) * 30 + 2.5 + "px";
    div.style.zIndex = "2";
    return div
}
