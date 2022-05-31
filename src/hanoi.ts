const won: HTMLElement = document.getElementById("won") as HTMLElement;


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
            div.id = "disk_" + str;

            //random color for fillStyle
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
        }
        this.moves = 0;
        this.solved = false;
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
    }
}