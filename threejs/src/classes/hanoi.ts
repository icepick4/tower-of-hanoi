import { Disk } from './disk';
import { CANCEL, WON } from '../constants';

/* It's a class that represents a game of Hanoi, with a few methods to move disks, check if a move is
valid, and reset the game. */
export class Hanoi {
    n: number;
    towers: Array<Array<Disk>>;
    moves: number;
    solved: boolean;
    lastsMoves: Array<Array<number>>;
    constructor() {
        this.towers = [];
        for (let i = 0; i < 3; i++) {
            const diskArray: Array<Disk> = [];
            this.towers.push(diskArray);
        }
        this.moves = 0;
        this.solved = false;
        this.n = 0;
        this.lastsMoves = [];
    }

    canMove(from: number, to: number) {
        if (this.towers[from].length === 0) {
            return false;
        } else if (this.towers[to].length === 0) {
            return true;
        } else {
            return (
                this.towers[from][this.towers[from].length - 1].index >
                this.towers[to][this.towers[to].length - 1].index
            );
        }
    }

    cancelLastMove() {
        if (this.lastsMoves.length > 0) {
            const lastMove = this.lastsMoves.pop();
            if (lastMove != null) {
                this.move(lastMove[1], lastMove[0], true);
            }
        }
        CANCEL.classList.remove('over-underline');
        CANCEL.classList.add('grey');
    }

    move(from: number, to: number, revert: boolean) {
        const disk = this.towers[from].pop() as Disk;
        this.towers[to].push(disk);
        if (this.towers[2].length === this.n) {
            this.solved = true;
            WON.innerHTML = 'You won in ' + this.moves.toString() + ' moves!';
        }
        if (!revert) {
            this.lastsMoves.push([from, to]);
            if (this.lastsMoves.length > 1) {
                this.lastsMoves.shift();
            }
            if (this.lastsMoves.length > 0) {
                CANCEL.classList.add('over-underline');
                CANCEL.classList.remove('grey');
            }
            this.moves++;
        }
        WON.innerHTML = 'Moves : ' + this.moves.toString();
    }

    init(disks: Array<Disk>) {
        this.n = disks.length;
        for (let i = 0; i < disks.length; i++) {
            this.towers[0].push(disks[i]);
        }
    }

    reset() {
        this.towers = [];
        for (let i = 0; i < 3; i++) {
            const diskArray: Array<Disk> = [];
            this.towers.push(diskArray);
        }
        this.moves = 0;
        this.solved = false;
        this.n = 0;
        this.lastsMoves = [];
    }
}
