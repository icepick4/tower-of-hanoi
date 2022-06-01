const won: HTMLElement = document.getElementById("won") as HTMLElement;
import { Disk } from "./disk";
export class Hanoi {
    n: number;
    towers: Array<Array<Disk>>;
    moves: number;
    solved: boolean;
    constructor(n: number, disks: Array<Disk>) {
        this.n = n;
        this.towers = [];
        for (var i = 0; i < 3; i++) {
            let disk_array: Array<Disk> = [];
            this.towers.push(disk_array);
        }
        this.towers[0] = disks;
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

        this.towers[to].push(this.towers[from].pop() as Disk);

        this.moves++;
        won.innerHTML = "Moves : " + this.moves.toString();
        if (this.towers[2].length == this.n) {
            this.solved = true;
            //display #won 
            won.innerHTML = "You won in " + this.moves.toString() + " moves!";
        }
    }
}