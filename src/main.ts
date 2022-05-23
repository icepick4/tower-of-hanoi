var canvas : HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const input = document.querySelector("input");
var hanoi : Hanoi;
//add event listsner on the canvas to check if we clicked on a disk
canvas.addEventListener("click",function(e){
    console.log(JSON.stringify(hanoi.towers));
    //get the mouse position
    var mousePos = getMousePos(canvas,e);
    //get the x and y position of the mouse
    var x = mousePos.x;
    var y = mousePos.y;
    var n : number = 0;
    if(input != null){
        var n : number = Number(input.value);
    }
    //check if we clicked on a column
    if(x >= 0 && x <= canvas.width/3){+
        console.log("je clique sur la première colonne");
        if(hanoi.clicked1 == null){
            hanoi.setClicked(0);
        }
        else{
            if(hanoi.can_move(hanoi.clicked1,0)){
                hanoi.move(hanoi.clicked1, 0);
                hanoi.draw(-1);
            }
            hanoi.clicked1 = null;
        }
    }
    else if(x >= canvas.width/3 && x <= 2*canvas.width/3){
        console.log("je clique sur la deuxième colonne");
        if(hanoi.clicked1 == null){
            hanoi.setClicked(1);
        }
        else{
            if(hanoi.can_move(hanoi.clicked1,1)){
                hanoi.move(hanoi.clicked1, 1);
                hanoi.draw(-1);
            }
            hanoi.clicked1 = null;
        }
    }
    else{
        console.log("je clique sur la troisième colonne");
        if(hanoi.clicked1 == null){
            hanoi.setClicked(2);
        }
        else{
            if(hanoi.can_move(hanoi.clicked1,2)){
                hanoi.move(hanoi.clicked1, 2);
                hanoi.draw(-1);
            }
            hanoi.clicked1 = null;
        }
    }
});

//add hover listener on the canvas
canvas.addEventListener("mousemove",function(e){
    //get the mouse position
    var mousePos = getMousePos(canvas,e);
    //get the x and y position of the mouse
    var x = mousePos.x;
    var y = mousePos.y;
    //check if we hover a column
    if(x >= 0 && x <= canvas.width/3){
        hanoi.draw(0);
    }
    else if(x >= canvas.width/3 && x <= 2*canvas.width/3){
        hanoi.draw(1);
    }
    else{
        hanoi.draw(2);
    }

});


const HEIGHT = 100;


function play(){
    if(input != null){
        var n : number = Number(input.value);
        hanoi = new Hanoi(n,canvas);
        hanoi.draw(-1);
    }
}

class Hanoi{
    n: number;
    canvas: HTMLCanvasElement;
    clicked1 : number | null ;
    towers : Array<Array<Disk>>;
    moves : number;
    solved : boolean;
    constructor(n : number, canvas : HTMLCanvasElement){
        this.n = n;
        //init towers depending on n
        this.canvas = canvas;
        this.towers = [];
        for(var i = 0; i < 3; i++){
            let disk_array : Array<Disk> = [];
            this.towers.push(disk_array);
        }
        for(var i = 0; i < this.n; i++){
            //random color for fillStyle
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            this.towers[0].push(new Disk(this.n - i, "rgb(" + r + ", " + g + ", " + b + ")"));
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
            return this.towers[from][this.towers[from].length - 1].width < this.towers[to][this.towers[to].length - 1].width;
        }
    }

    move(from : number, to : number){
        console.log("j'ai boug");
        this.towers[to].push(this.towers[from].pop() as Disk);
        this.moves++;
        if(this.towers[2].length == this.n){
            this.solved = true;
        }
    }

    draw(hover : number){
        var ctx = this.canvas.getContext("2d");
        if(ctx == null){
            return;
        }
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Moves: " + this.moves, 20, 50);
        ctx.fillText("Solved: " + this.solved, 20, 100);
        ctx.fillText("N: " + this.n, 20, 150);
        //hover is the column we are hovering
        if(hover == 0){
            ctx.fillStyle = "red";
            ctx.fillRect(this.canvas.width / 2 - 350, 400, 10, this.canvas.height / 2);
            ctx.fillStyle = "black";
            ctx.fillRect(this.canvas.width / 2, 400, 10, this.canvas.height / 2);
            ctx.fillRect(this.canvas.width / 2 + 350, 400, 10, this.canvas.height / 2);
        }
        else if(hover == 1){
            ctx.fillRect(this.canvas.width / 2 - 350, 400, 10, this.canvas.height / 2);
            ctx.fillStyle = "red";
            ctx.fillRect(this.canvas.width / 2, 400, 10, this.canvas.height / 2);
            ctx.fillStyle = "black";
            ctx.fillRect(this.canvas.width / 2 + 350, 400, 10, this.canvas.height / 2);
        }
        else if(hover == 2){
            ctx.fillRect(this.canvas.width / 2 - 350, 400, 10, this.canvas.height / 2);
            ctx.fillRect(this.canvas.width / 2, 400, 10, this.canvas.height / 2);
            ctx.fillStyle = "red";
            ctx.fillRect(this.canvas.width / 2 + 350, 400, 10, this.canvas.height / 2);
        }
        else{
            ctx.fillRect(this.canvas.width / 2 - 350, 400, 10, this.canvas.height / 2);
            ctx.fillRect(this.canvas.width / 2, 400, 10, this.canvas.height / 2);
            ctx.fillRect(this.canvas.width / 2 + 350, 400, 10, this.canvas.height / 2);
        }
        
        //draw the disks on the lines
        for(var i = 0; i < this.towers[0].length; i++){
            ctx.fillStyle = this.towers[0][i].color;
            var x = this.canvas.width / 2 - 350 - 30 * this.towers[0][i].width +5;
            var y = this.canvas.height - (i + 1) * 30;
            ctx.fillRect(x, y, this.towers[0][i].width * 60, 30);
        }
        for(var i = 0; i < this.towers[1].length; i++){
            ctx.fillStyle = this.towers[1][i].color;
            var x = this.canvas.width / 2  - 30 * this.towers[1][i].width +5;
            var y = this.canvas.height - (i + 1) * 30;
            ctx.fillRect(x, y, this.towers[1][i].width * 60, 30);
        }
        for(var i = 0; i < this.towers[2].length; i++){
            ctx.fillStyle = this.towers[2][i].color;
            var x = this.canvas.width / 2 + 350 - 30 * this.towers[2][i].width +5;
            var y = this.canvas.height - (i + 1) * 30;
            ctx.fillRect(x, y, this.towers[2][i].width * 60, 30);
        }
    }

    isSolved(){
        return this.solved;
    }
}

class Disk{
    width : number;
    color : string;
    x : number | null;
    y : number | null;
    constructor(width : number, color : string){
        this.width = width;
        this.color = color;
        this.x = null;
        this.y = null;
    }

    setX(x : number){
        this.x = x;
    }

    setY(y : number){
        this.y = y;
    }
}

function getMousePos(canvas: HTMLCanvasElement, e: MouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

