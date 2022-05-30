const input = document.querySelector("input");
const won : HTMLElement = document.getElementById("won") as HTMLElement;
const BTN_PLAY : HTMLElement = document.getElementById("play") as HTMLElement;
const CONTAINER_DISKS : HTMLElement = document.getElementById("disks") as HTMLElement;
const PIC1 : HTMLElement = document.getElementById("pic1") as HTMLElement;
const PIC2 : HTMLElement = document.getElementById("pic2") as HTMLElement;
const PIC3 : HTMLElement = document.getElementById("pic3") as HTMLElement;
BTN_PLAY.addEventListener("click", play);
PIC1.addEventListener("mouseover", function(e){
    var bg = PIC1.style.backgroundColor;
    if(bg != "blue"){
        PIC1.style.backgroundColor = "red";
    }
});
PIC1.addEventListener("mouseout", function(e){
    var bg = PIC1.style.backgroundColor;
    if(bg != "blue"){
        PIC1.style.backgroundColor = "black";
    }
});
PIC2.addEventListener("mouseout", function(e){
    var bg = PIC2.style.backgroundColor;
    if(bg != "blue"){
        PIC2.style.backgroundColor = "black";
    }
});
PIC2.addEventListener("mouseover", function(e){
    var bg = PIC2.style.backgroundColor;
    if(bg != "blue"){
        PIC2.style.backgroundColor = "red";
    }
});
PIC3.addEventListener("mouseout", function(e){
    var bg = PIC3.style.backgroundColor;
    if(bg != "blue"){
        PIC3.style.backgroundColor = "black";
    }
});
PIC3.addEventListener("mouseover", function(e){
    var bg = PIC3.style.backgroundColor;
    if(bg != "blue"){
        PIC3.style.backgroundColor = "red";
    }
});

PIC1.addEventListener("click", function(e){
    //get bg of pic1
    var bg = PIC1.style.backgroundColor;
    if(bg == "blue"){
        PIC1.style.backgroundColor = "black";
    }
    else{
        PIC1.style.backgroundColor = "blue";
    }
    move(0);
});
PIC2.addEventListener("click", function(e){
    var bg = PIC2.style.backgroundColor;
    if(bg == "blue"){
        PIC2.style.backgroundColor = "black";
    }
    else{
        PIC2.style.backgroundColor = "blue";
    }
    move(1);
});
PIC3.addEventListener("click", function(e){
    var bg = PIC3.style.backgroundColor;
    if(bg == "blue"){
        PIC3.style.backgroundColor = "black";
    }
    else{
        PIC3.style.backgroundColor = "blue";
    }
    move(2);
});


var hanoi : Hanoi;

function move(col : number){
    if(hanoi.clicked1 == null){
        hanoi.setClicked(col);
    }
    else{
        unselectAll();
        if(hanoi.can_move(hanoi.clicked1,col)){
            hanoi.move(hanoi.clicked1, col);
            hanoi.draw();
        }
        hanoi.clicked1 = null;
    }
}

function unselectAll(){
    PIC1.style.backgroundColor = "black";
    PIC2.style.backgroundColor = "black";
    PIC3.style.backgroundColor = "black";
}


function play(){
    //clear div with id "disks"
    CONTAINER_DISKS.innerHTML = "";
    unselectAll();
    won.innerHTML = "Moves : 0";
    if(input != null){
        var n : number = Number(input.value); 
        if(n > 0 && n <= 7){
            hanoi = new Hanoi(n);
            hanoi.draw();
        } 
    }
}

class Hanoi{
    n: number;
    clicked1 : number | null ;
    towers : Array<Array<number>>;
    moves : number;
    solved : boolean;
    constructor(n : number){
        this.n = n;
        this.towers = [];
        for(var i = 0; i < 3; i++){
            let disk_array : Array<number> = [];
            this.towers.push(disk_array);
        }
        for(var i = 0; i < this.n; i++){
            this.towers[0].push(this.n - i);

            //i into string
            var str = (this.n-i).toString();
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

    setClicked(i : number){
        this.clicked1 = i;
    }

    can_move(from : number, to : number){
        if(this.towers[from].length == 0){
            return false;
        }
        else if(this.towers[to].length == 0){
            return true;
        }
        else{
            return this.towers[from][this.towers[from].length - 1] < this.towers[to][this.towers[to].length - 1];
        }
    }

    move(from : number, to : number){
        console.log("j'ai boug");
        this.towers[to].push(this.towers[from].pop() as number);
        this.moves++;
        won.innerHTML = "Moves : " + this.moves.toString();
        if(this.towers[2].length == this.n){
            this.solved = true;
            //display #won 
            won.innerHTML = "You won in " + this.moves.toString() + " moves!";
        }
    }

    draw(){
        //draw the disks on the lines
        for(var i = 0; i < this.towers[0].length; i++){
            console.log(this.towers[0].length - i);
            var div : HTMLElement = document.getElementById("disk_" + (this.towers[0][i]).toString() ) as HTMLElement;
            div.style.bottom = (i) * 45 + 30 - 10 + "px";
            div.style.left = screen.width / 6 - div.offsetWidth / 2 + 5 + "px";
        }
        for(var i = 0; i < this.towers[1].length; i++){
            var div : HTMLElement = document.getElementById("disk_" + (this.towers[1][i]).toString() ) as HTMLElement;
            div.style.bottom = (i) * 45 + 30 - 10 + "px";
            div.style.left = screen.width / 2 - div.offsetWidth / 2 - 5 + "px";
        }
        for(var i = 0; i < this.towers[2].length; i++){
            var div : HTMLElement = document.getElementById("disk_" + (this.towers[2][i]).toString() ) as HTMLElement;
            div.style.bottom = (i) * 45 + 30 - 10 + "px";
            div.style.left = screen.width / 6 * 5 - div.offsetWidth / 2 - 7.5 + "px";
        }
    }

    isSolved(){
        return this.solved;
    }
}



