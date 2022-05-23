var canvas : HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const input = document.querySelector("input");
var hanoi : Hanoi;
//add event listsner on the canvas to check if we clicked on a disk
canvas.addEventListener("click",function(e){
    //get the mouse position
    var mousePos = getMousePos(canvas,e);
    //get the x and y position of the mouse
    var x = mousePos.x;
    var y = mousePos.y;
    var n : number = 0;
    if(input != null){
        var n : number = Number(input.value);
    }
    //check if we clicked on a disk
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < n ; j++){
            if(x > (i*100) && x < ((i*100)+100) && y > (j*100) && y < ((j*100)+100)){
                if(hanoi.clicked1 == null){
                    hanoi.setClicked(hanoi.towers[i][j].width);
                }
                else{
                    if(hanoi.can_move(hanoi.clicked1, hanoi.towers[i][j].width)){
                        hanoi.move(hanoi.clicked1, hanoi.towers[i][j].width);
                        hanoi.draw();
                        hanoi.clicked1 = null;
                    }
                }
            }
        }
    }
});


const HEIGHT = 100;


function play(){
    if(input != null){
        var n : number = Number(input.value);
        hanoi = new Hanoi(n,canvas);
        hanoi.draw();
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
        let disk_array : Array<Disk> = [];
        for(var i = 0; i < 3; i++){
            this.towers.push(disk_array);
        }
        for(var i = 0; i < this.n; i++){
            //random color for fillStyle
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            this.towers[0].push(new Disk(i + 1, "rgb(" + r + ", " + g + ", " + b + ")"));
        }
        console.log(this.towers.length);
        this.moves = 0;
        this.solved = false;
        this.clicked1 = null;
    }

    setClicked(i : number){
        this.clicked1 = i;
    }

    reset(){
        
    }

    can_move(from : number, to : number){
        if(this.towers[from].length == 0){
            return false;
        }
        if(this.towers[to].length == 0){
            return true;
        }
        return this.towers[from][this.towers[from].length - 1] < this.towers[to][this.towers[to].length - 1];
    }

    move(from : number, to : number){
        this.towers[to].push(this.towers[from].pop() as Disk);
        this.moves++;
        if(this.towers[to].length == this.n){
            this.solved = true;
        }
    }

    draw(){
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
        //draw 3 towers with tiny verticals lines
        ctx.fillStyle = "black";
        ctx.fillRect(this.canvas.width / 2 - 250, 400, 10, this.canvas.height / 2);
        ctx.fillRect(this.canvas.width / 2, 400, 10, this.canvas.height / 2);
        ctx.fillRect(this.canvas.width / 2 + 250, 400, 10, this.canvas.height / 2);
        //draw the disks on the lines
        for(var i = 0; i < this.towers[0].length; i++){
            ctx.fillStyle = this.towers[0][i].color;
            var x = this.canvas.width / 2 - 250 - 30 * this.towers[0][i].width +5;
            var y = this.canvas.height - (this.n - i) * 30;
            ctx.fillRect(x, y, this.towers[0][i].width * 60, 30);
        }
        for(var i = 0; i < this.towers[1].length; i++){
            ctx.fillStyle = this.towers[0][i].color;
            var x = this.canvas.width / 2 - 250 - 30 * (i + 1) +5;
            var y = this.canvas.height - (this.n - i) * 30;
            ctx.fillRect(x, y, this.towers[1][i].width * 60, 30);
        }
        for(var i = 0; i < this.towers[2].length; i++){
            ctx.fillStyle = this.towers[0][i].color;
            var x = this.canvas.width / 2 - 250 - 30 * (i + 1) +5;
            var y = this.canvas.height - (this.n - i) * 30;
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

    clicked(x : number, y : number){
        if(this.x != null && this.y != null){
            if(x > this.x && x < this.x + this.width * 60 && y > this.y && y < this.y + 30){
                return true;
            }
        }
        return false;
    }
}

function getMousePos(canvas: HTMLCanvasElement, e: MouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

