var canvas : HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
var canvas2 : HTMLCanvasElement = document.getElementById("canvas2") as HTMLCanvasElement;
const input = document.querySelector("input");
const won : HTMLElement = document.getElementById("won") as HTMLElement;

var hanoi : Hanoi;
//add event listsner on the canvas to check if we clicked on a disk
canvas.addEventListener("click",function(e){
    console.log(JSON.stringify(hanoi.towers));
    //get the mouse position
    var mousePos = getMousePos(canvas,e);
    //get the x and y position of the mouse
    var x = mousePos.x;
    //check if we clicked on a column
    if(x >= 0 && x <= canvas.width/3){+
        move(0);
    }
    else if(x >= canvas.width/3 && x <= 2*canvas.width/3){
        move(1);
    }
    else{
        move(2);        
    }
});

function move(col : number){
    if(hanoi.clicked1 == null){
        hanoi.setClicked(col);
    }
    else{
        if(hanoi.can_move(hanoi.clicked1,col)){
            hanoi.move(hanoi.clicked1, col);
            hanoi.draw(-1);
        }
        hanoi.clicked1 = null;
    }
}

//add hover listener on the canvas
canvas.addEventListener("mousemove",function(e){
    //get the mouse position
    var mousePos = getMousePos(canvas,e);
    //get the x and y position of the mouse
    var x = mousePos.x;
    var y = mousePos.y;
    //check if we hover a column
    if(x >= 0 && x <= canvas.width/3){
        hanoi.draw(-450);
    }
    else if(x >= canvas.width/3 && x <= 2*canvas.width/3){
        hanoi.draw(0);
    }
    else{
        hanoi.draw(450);
    }
});

function play(){
    if(input != null){
        var n : number = Number(input.value); 
        if(n > 0 && n <= 7){
            hanoi = new Hanoi(n,canvas);
            hanoi.draw(-1);
        } 
    }
    won.style.display = "none";
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
            //display #won 
            won.style.display = "block";

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

        for(var i = - 450; i <= 450; i=i+450){
            if(i == hover){
                ctx.fillStyle = "red";
            }
            else{
                ctx.fillStyle = "black";
            }
            ctx.fillRect(this.canvas.width / 2 + i, 250, 10, 600);
        }
        
        //draw the disks on the lines
        for(var i = 0; i < this.towers[0].length; i++){
            ctx.fillStyle = this.towers[0][i].color;
            var x = this.canvas.width / 2 -450 - 30 * this.towers[0][i].width +5;
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
            var x = this.canvas.width / 2 +450 - 30 * this.towers[2][i].width +5;
            var y = this.canvas.height - (i + 1) * 30;
            ctx.fillRect(x, y, this.towers[2][i].width * 60, 30);
        }

        //draw a rectangle under the game
        var ctx2 = canvas2.getContext("2d");
        if(ctx2 == null){
            return;
        }
        ctx2.fillStyle = "black";
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
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

