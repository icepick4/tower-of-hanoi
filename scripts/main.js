var canvas = document.getElementById("canvas");



function play(){
    //take the value of the input
    var n = document.querySelector("input").value;
    const hanoi = new Hanoi(n,canvas);
    console.log("oui");
    hanoi.draw();
}


class Hanoi{
    constructor(n, canvas){
        this.n = n;
        this.towers = [[],[],[]];
        this.towers[0] = [3,2,1];
        this.towers[1] = [];
        this.towers[2] = [];
        this.moves = 0;
        this.solved = false;
        this.canvas = canvas;
    }

    reset(){
        this.towers = [[],[],[]];
        this.towers[0] = [...Array(this.n).keys()].reverse();
        this.towers[1] = [];
        this.towers[2] = [];
        this.moves = 0;
        this.solved = false;
    }

    can_move(from, to){
        if(this.towers[from].length == 0){
            return false;
        }
        if(this.towers[to].length == 0){
            return true;
        }
        return this.towers[from][this.towers[from].length - 1] < this.towers[to][this.towers[to].length - 1];
    }

    move(from, to){
        this.towers[to].push(this.towers[from].pop());
        this.moves++;
        if(this.towers[to].length == this.n){
            this.solved = true;
        }
    }

    draw(){
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Moves: " + this.moves, 20, 50);
        ctx.fillText("Solved: " + this.solved, 20, 100);
        ctx.fillText("N: " + this.n, 20, 150);
        ctx.fillText("Towers:", 20, 200);
        ctx.fillText("1: " + this.towers[0].join(", "), 20, 250);
        ctx.fillText("2: " + this.towers[1].join(", "), 20, 300);
        ctx.fillText("3: " + this.towers[2].join(", "), 20, 350);
        //draw 3 towers with tiny verticals lines
        ctx.fillStyle = "black";
        ctx.fillRect(this.canvas.width / 2 - 150, 200, 10, this.canvas.height - 200);
        ctx.fillRect(this.canvas.width / 2, 200, 10, this.canvas.height - 200);
        ctx.fillRect(this.canvas.width / 2 + 150, 200, 10, this.canvas.height - 200);
        //draw the disks on the lines
        for(var i = 0; i < this.towers[0].length; i++){
            ctx.fillStyle = "red";
            ctx.fillRect(this.canvas.width / 2 - 150, this.canvas.height - this.towers[0][i] * 20, this.towers[0][i] * 20,10 );
        }
        for(var i = 0; i < this.towers[1].length; i++){
            ctx.fillStyle = "green";
            ctx.fillRect(this.canvas.width / 2, this.canvas.height - this.towers[1][i] * 20,this.towers[1][i] * 20, 10 );
        }
        for(var i = 0; i < this.towers[2].length; i++){
            ctx.fillStyle = "blue";
            ctx.fillRect(this.canvas.width / 2 + 150, this.canvas.height - this.towers[2][i] * 20, this.towers[2][i] * 20,10 );
        }


    }

    solved(){
        return this.solved;
    }
}