"use strict";
const input = document.querySelector("input");
const won = document.getElementById("won");
const BTN_PLAY = document.getElementById("play");
const CONTAINER_DISKS = document.getElementById("disks");
const PIC1 = document.getElementById("pic1");
const PIC2 = document.getElementById("pic2");
const PIC3 = document.getElementById("pic3");
BTN_PLAY.addEventListener("click", play);
PIC1.addEventListener("mouseover", function (e) {
    var bg = PIC1.style.backgroundColor;
    if (bg != "blue") {
        PIC1.style.backgroundColor = "red";
    }
});
PIC1.addEventListener("mouseout", function (e) {
    var bg = PIC1.style.backgroundColor;
    if (bg != "blue") {
        PIC1.style.backgroundColor = "black";
    }
});
PIC2.addEventListener("mouseout", function (e) {
    var bg = PIC2.style.backgroundColor;
    if (bg != "blue") {
        PIC2.style.backgroundColor = "black";
    }
});
PIC2.addEventListener("mouseover", function (e) {
    var bg = PIC2.style.backgroundColor;
    if (bg != "blue") {
        PIC2.style.backgroundColor = "red";
    }
});
PIC3.addEventListener("mouseout", function (e) {
    var bg = PIC3.style.backgroundColor;
    if (bg != "blue") {
        PIC3.style.backgroundColor = "black";
    }
});
PIC3.addEventListener("mouseover", function (e) {
    var bg = PIC3.style.backgroundColor;
    if (bg != "blue") {
        PIC3.style.backgroundColor = "red";
    }
});
PIC1.addEventListener("click", function (e) {
    //get bg of pic1
    var bg = PIC1.style.backgroundColor;
    if (bg == "blue") {
        PIC1.style.backgroundColor = "black";
    }
    else {
        PIC1.style.backgroundColor = "blue";
    }
    move(0);
});
PIC2.addEventListener("click", function (e) {
    var bg = PIC2.style.backgroundColor;
    if (bg == "blue") {
        PIC2.style.backgroundColor = "black";
    }
    else {
        PIC2.style.backgroundColor = "blue";
    }
    move(1);
});
PIC3.addEventListener("click", function (e) {
    var bg = PIC3.style.backgroundColor;
    if (bg == "blue") {
        PIC3.style.backgroundColor = "black";
    }
    else {
        PIC3.style.backgroundColor = "blue";
    }
    move(2);
});
//event listener on resize window
window.addEventListener("resize", function (e) {
    hanoi.draw();
});
var hanoi;
function move(col) {
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
        var n = Number(input.value);
        if (n > 0 && n <= 7) {
            hanoi = new Hanoi(n);
            hanoi.draw();
        }
    }
}
class Hanoi {
    constructor(n) {
        this.n = n;
        this.towers = [];
        for (var i = 0; i < 3; i++) {
            let disk_array = [];
            this.towers.push(disk_array);
        }
        for (var i = 0; i < this.n; i++) {
            this.towers[0].push(this.n - i);
            //i into string
            var str = (this.n - i).toString();
            //create a new div with id disk_i
            var div = document.createElement("div");
            div.id = "disk_" + str;
            //random color for fillStyle
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            div.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
            div.style.width = (this.n - i) * 60 + "px";
            div.style.height = "45px";
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
    setClicked(i) {
        this.clicked1 = i;
    }
    can_move(from, to) {
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
    move(from, to) {
        this.towers[to].push(this.towers[from].pop());
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
        for (var i = 0; i < this.towers[0].length; i++) {
            var div = document.getElementById("disk_" + (this.towers[0][i]).toString());
            div.style.bottom = (i) * 45 + 30 - 10 + "px";
            div.style.left = document.body.clientWidth / 6.060606 - div.offsetWidth / 2 + 15 + "px";
        }
        for (var i = 0; i < this.towers[1].length; i++) {
            var div = document.getElementById("disk_" + (this.towers[1][i]).toString());
            div.style.bottom = (i) * 45 + 30 - 10 + "px";
            div.style.left = document.body.clientWidth / 2 - div.offsetWidth / 2 + 15 + "px";
        }
        for (var i = 0; i < this.towers[2].length; i++) {
            var div = document.getElementById("disk_" + (this.towers[2][i]).toString());
            div.style.bottom = (i) * 45 + 30 - 10 + "px";
            div.style.left = document.body.clientWidth / 1.25 - div.offsetWidth / 2 + 15 + "px";
        }
    }
    isSolved() {
        return this.solved;
    }
}
