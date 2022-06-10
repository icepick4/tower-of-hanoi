/* eslint-disable no-unused-vars */
import {
    INPUT,
    WON,
    BTN_PLAY,
    CONTAINER_DISKS,
    TOWERS,
    CANCEL
} from './constants';
let PLAYING = false;
BTN_PLAY.addEventListener('click', play);
CANCEL.addEventListener('click', cancelLastMove);

for (let i = 0; i < TOWERS.length; i++) {
    TOWERS[i].addEventListener('click', clickTower);
    TOWERS[i].addEventListener('mouseover', mouseHover);
    TOWERS[i].addEventListener('mouseout', mouseOut);
}

/**
 * "If the background color of the clicked element is blue, change it to black, otherwise change it to
 * blue."
 * 
 * The first line of the function is a TypeScript annotation. It tells TypeScript that the function
 * will be called with a `this` argument that is an `HTMLElement` and an `ev` argument that is a
 * `MouseEvent`. This is important because TypeScript will check that the function is called with the
 * correct arguments.
 * 
 * The second line of the function gets the background color of the clicked element.
 * 
 * The third line gets the number of the picture that was clicked.
 * 
 * The fourth line checks the background color of the clicked element. If it is blue, the background
 * color is changed to black. Otherwise, the background color is changed to blue.
 * 
 * The fifth line calls the `move` function.
 * @param {HTMLElement}  - HTMLElement - this is the type of the first parameter, which is the element
 * that was clicked.
 * @param {MouseEvent} ev - MouseEvent - this is the event object that is passed to the function.
 */
function clickTower(this: HTMLElement, ev: MouseEvent) {
    // get bg of pic1
    const bg = this.style.backgroundColor;
    const pic = Number((ev.target as HTMLElement).id.substring(9));

    if (bg === 'blue') {
        this.style.backgroundColor = 'black';
    } else {
        this.style.backgroundColor = 'blue';
    }
    move(pic);
}

function mouseHover(this: HTMLElement) {
    const bg = this.style.backgroundColor;
    if (bg !== 'blue' && PLAYING) {
        this.style.backgroundColor = 'red';
    }
}

function mouseOut(this: HTMLElement) {
    const bg = this.style.backgroundColor;
    if (bg !== 'blue') {
        this.style.backgroundColor = 'black';
    }
}

// event listener on resize window
window.addEventListener('resize', function () {
    hanoi.draw();
    for (let i = 0; i < TOWERS.length; i++) {
        TOWERS[i].style.width = (document.body.clientWidth / 50).toString() + 'px';
    }
});

/**
 * If the user has clicked on a column, then move the top disk from that column to the column they just
 * clicked on
 * @param {number} col - The column that was clicked.
 */
function move(col: number) {
    if (hanoi.clicked1 == null) {
        hanoi.setClicked(col);
    } else {
        unselectAll();
        if (hanoi.can_move(hanoi.clicked1, col)) {
            hanoi.move(hanoi.clicked1, col, false);
            hanoi.draw();
        }
        hanoi.clicked1 = null;
    }
}

/**
 * If there are moves to cancel and there are moves to cancel, cancel the last move.
 */
function cancelLastMove() {
    if (hanoi.moves > 0 && hanoi.lastsMoves.length > 0) {
        console.log('cancel');
        hanoi.moves--;
        hanoi.cancelLastMove();
        hanoi.draw();
    }
}

function unselectAll() {
    for (let i = 0; i < TOWERS.length; i++) {
        TOWERS[i].style.backgroundColor = 'black';
    }
}

/**
 * The function play() is called when the user clicks the "Play" button. 
 * 
 * The function play() does the following: 
 * 
 * 1. It sets the display property of the div with id "won" to "block". 
 * 
 * 2. It sets the variable PLAYING to true. 
 * 
 * 3. It clears the div with id "disks". 
 * 
 * 4. It calls the function unselectAll(). 
 * 
 * 5. It sets the innerHTML of the div with id "won" to "Moves : 0". 
 * 
 * 6. It checks if the variable INPUT is not null. 
 * 
 * 7. If the variable INPUT is not null, it gets the value of the input element with id "input" and
 * converts it to a number. 
 * 
 * 8. Then the game is started with the number of disks in the input element.
 */
function play() {
    WON.style.display = 'block';
    PLAYING = true;
    // clear div with id "disks"
    CONTAINER_DISKS.innerHTML = '';
    unselectAll();
    WON.innerHTML = 'Moves : 0';
    if (INPUT != null) {
        const n = Number(INPUT.value);
        if (n > 0 && n <= 7) {
            hanoi = new Hanoi(n);
            hanoi.draw();
        }
    }
}

/* The Hanoi class is a class that represents a game of Towers of Hanoi. It has a constructor that
takes a number of disks as an argument, and it has a method called draw that draws the disks on the
screen. */
class Hanoi {
    n: number;
    clicked1: number | null;
    towers: Array<Array<number>>;
    moves: number;
    solved: boolean;
    lastsMoves: Array<Array<number>>;
    constructor(n: number) {
        this.n = n;
        this.towers = [];
        for (let i = 0; i < 3; i++) {
            const diskArray: Array<number> = [];
            this.towers.push(diskArray);
        }
        for (let i = 0; i < this.n; i++) {
            this.towers[0].push(this.n - i);

            // i into string
            const str = (this.n - i).toString();
            // create a new div with id disk_i
            const div = document.createElement('div');
            CONTAINER_DISKS.appendChild(initDiv(div, n, i, str));
        }
        this.moves = 0;
        this.solved = false;
        this.clicked1 = null;
        this.lastsMoves = [];
    }

    setClicked(i: number) {
        this.clicked1 = i;
    }

    cancelLastMove() {
        if (this.lastsMoves.length > 0) {
            const lastMove = this.lastsMoves.pop();
            if (lastMove != null) {
                this.move(lastMove[1], lastMove[0], true);
            }
        }
        this.draw();
        CANCEL.classList.remove('over-underline');
        CANCEL.classList.add('grey');
    }

    can_move(from: number, to: number) {
        if (this.towers[from].length === 0) {
            return false;
        } else if (this.towers[to].length === 0) {
            return true;
        } else {
            return this.towers[from][this.towers[from].length - 1] < this.towers[to][this.towers[to].length - 1];
        }
    }

    move(from: number, to: number, revert: boolean) {
        this.towers[to].push(this.towers[from].pop() as number);
        this.moves++;
        WON.innerHTML = 'Moves : ' + this.moves.toString();
        if (this.towers[2].length === this.n) {
            this.solved = true;
            // display #won 
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
        }
    }

    draw() {
        // draw the disks on the lines
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < this.towers[i].length; j++) {
                const div: HTMLElement = document.getElementById(
                    'disk_' + this.towers[i][j].toString()
                ) as HTMLElement;
                div.style.bottom =
                    ((j * document.body.clientWidth) / 33.333 + 30 - 10).toString() + 'px';
                div.style.width =
                    ((document.body.clientWidth * this.towers[i][j]) / 25 +
                        10).toString() +
                    'px';
                div.style.height = (document.body.clientWidth / 33.333).toString() + 'px';
                if (i === 0) {
                    div.style.left =
                        (document.body.clientWidth / 6 -
                            div.offsetWidth / 2 +
                            TOWERS[0].offsetWidth / 2).toString() +
                        'px';
                } else if (i === 1) {
                    div.style.left =
                        (document.body.clientWidth / 2 -
                            div.offsetWidth / 2 +
                            TOWERS[1].offsetWidth / 2).toString() +
                        'px';
                } else {
                    div.style.left =
                        (document.body.clientWidth / 1.25 -
                            div.offsetWidth / 2 +
                            TOWERS[2].offsetWidth / 2).toString() +
                        'px';
                }
            }
        }
    }
}

function initDiv(div: HTMLElement, n: number, i: number, str: string) {
    div.id = 'disk_' + str;
    // random color for fillStyle
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    div.style.backgroundColor = 'rgb(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ')';
    div.style.border = '1px solid black';

    div.style.width =
        ((document.body.clientWidth * (n - 1)) / 25 + 10).toString() + 'px';
    div.style.height = (document.body.clientWidth / 33.333).toString() + 'px';
    div.style.position = 'absolute';

    div.style.bottom = (i * 45 + 30 - 10).toString() + 'px';
    div.style.left = (screen.width / 6 - (n - i) * 30 + 2.5).toString() + 'px';
    div.style.zIndex = '2';
    return div;
}

let hanoi: Hanoi;
