import { Disk } from "./disk";
import { WON } from "../constants";

export class Hanoi {
    n: number;
    towers: Array<Array<Disk>>;
    moves: number;
    solved: boolean;
    constructor() {
        this.towers = [];
        for (var i = 0; i < 3; i++) {
            let disk_array: Array<Disk> = [];
            this.towers.push(disk_array);
        }
        this.moves = 0;
        this.solved = false;
        this.n = 0;
    }

    canMove(from: number, to: number) {
        if (this.towers[from].length == 0) {
            return false;
        }
        else if (this.towers[to].length == 0) {
            return true;
        }
        else {
            return this.towers[from][this.towers[from].length - 1].index > this.towers[to][this.towers[to].length - 1].index;
        }
    }

    move(from: number, to: number) {
        var disk = this.towers[from].pop() as Disk;
        this.towers[to].push(disk);
        this.moves++;
        WON.innerHTML = "Moves : " + this.moves.toString();
        if (this.towers[2].length == this.n) {
            this.solved = true;
            WON.innerHTML = "You won in " + this.moves.toString() + " moves!";
        }
    }

    init(disks: Array<Disk>) {
        this.n = disks.length;
        for (var i = 0; i < disks.length; i++) {
            this.towers[0].push(disks[i]);
        }
    }

    reset() {
        this.towers = [];
        for (var i = 0; i < 3; i++) {
            let disk_array: Array<Disk> = [];
            this.towers.push(disk_array);
        }
        this.moves = 0;
        this.solved = false;
        this.n = 0;
    }
}