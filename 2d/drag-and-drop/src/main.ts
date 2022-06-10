/* eslint-disable no-unused-vars */
import {
    BTN_PLAY,
    TOWERS,
    TOWERS_AREAS,
    INPUT,
    WON,
    DROP_AREAS,
    CANCEL
} from './constants';

let startDragCol: number;
let startDragDisk: number;

BTN_PLAY.addEventListener('click', play);
CANCEL.addEventListener('click', cancelLastMove);
// event listener on resize window
window.addEventListener('resize', function () {
    if (hanoi != null) {
        hanoi.draw();
    }
    for (let i = 0; i < TOWERS_AREAS.length; i++) {
        TOWERS_AREAS[i].style.width = (document.body.clientWidth / 50).toString() + 'px';
    }
});

// event on opening devtools
window.addEventListener('click', function () {
    if (hanoi != null) {
        hanoi.draw();
    }
});

/**
 * This function adds event listeners to the first tower's children and the drop areas.
 */
function setEvents() {
    for (let i = 0; i < TOWERS[0].children.length; i++) {
        TOWERS[0].children[i].addEventListener('dragstart', handleDragStart);
        TOWERS[0].children[i].addEventListener('dragend', handleDragEnd);
    }
    for (let i = 0; i < DROP_AREAS.length; i++) {
        DROP_AREAS[i].addEventListener('dragover', allowDrop);
        DROP_AREAS[i].addEventListener('drop', drop);
    }
}

/**
 * "If the user is dragging a disk, and the mouse is over a tower, and the disk is at the top of the
 * tower, and the disk can be moved to the tower, then highlight the tower."
 * 
 * The function is called whenever the mouse moves. 
 * 
 * The first thing it does is check if the user is dragging a disk. If not, it returns. 
 * 
 * The next thing it does is get the tower the mouse is over. If the mouse is not over a tower, it
 * returns. 
 * 
 * The next thing it does is check if the disk is at the top of the tower. If not, it returns. 
 * 
 * The next thing it does is check if the disk can be moved to the tower. If not, it returns. 
 * 
 * If the user is dragging a disk, and the mouse is over a tower, and the disk is
 * @param {DragEvent} ev - DragEvent - the event that is being handled
 */
function allowDrop(ev: DragEvent) {
    ev.preventDefault();
    const diskAtTop =
        hanoi.towers[startDragCol][hanoi.towers[startDragCol].length - 1] ===
        startDragDisk;
    // get the tower we are over
    if (ev.target != null) {
        // get id
        const id: string = (ev.target as HTMLElement).id;
        // id equald last char of id
        const col = Number(id.substring(id.length - 1));
        for (let i = 0; i < TOWERS_AREAS.length; i++) {
            if (TOWERS_AREAS[i].id === 'pic-area-' + col.toString() && hanoi.can_move(startDragCol, i) && diskAtTop) {
                TOWERS_AREAS[i].style.backgroundColor = 'purple';
            } else {
                TOWERS_AREAS[i].style.backgroundColor = 'black';
            }
        }
    }
}

/**
 * The function drop() is called when the user drops a disk on a tower. 
 * 
 * The function first prevents the default action of the browser from happening. 
 * 
 * Then it gets the id of the tower where the disk was dropped. 
 * 
 * Then it calls the move() function to move the disk to the tower. 
 * 
 * Finally, it changes the background color of the towers back to black.
 * @param {DragEvent} ev - DragEvent - the event that is triggered when the user drags the element.
 */
function drop(ev: DragEvent) {
    ev.preventDefault();
    // get the id of the pic where we drop
    if (ev.target != null) {
        const id: string = (ev.target as HTMLElement).id;
        const col = Number(id.substring(id.length - 1));
        move(col);
    }
    for (let i = 0; i < TOWERS_AREAS.length; i++) {
        TOWERS_AREAS[i].style.backgroundColor = 'black';
    }
}

/**
 * "When a disk is clicked, set the opacity to 0.75, set the border to dashed, and set the startDragCol
 * and startDragDisk variables to the column and disk that was clicked."
 * 
 * The first line of the function is a TypeScript annotation. It tells TypeScript that the this
 * parameter is of type HTMLElement. This is necessary because the this parameter is not a parameter of
 * the function, but rather a parameter of the addEventListener function.
 * 
 * The next line sets the opacity of the disk to 0.75. This is done so that the user can see which disk
 * is being dragged.
 * 
 * The next line sets the border of the disk to dashed. This is done so that the user can see which
 * disk is being dragged.
 * 
 * The next line gets the disk number from the id of the disk. The id of the disk is in the form
 * "disk1", "
 * @param {HTMLElement}  - this: HTMLElement - this is the element that is being dragged.
 */
function handleDragStart(this: HTMLElement) {
    this.style.opacity = '0.75';
    this.style.border = '1px dashed #000';
    const disk = Number(this.id.substring(this.id.length - 1));
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < hanoi.towers[i].length; j++) {
            if (hanoi.towers[i][j] === disk) {
                startDragCol = i;
                startDragDisk = disk;
                break;
            }
        }
    }
}

/**
 * The function `handleDragEnd` takes a parameter `this` of type `HTMLElement` and returns nothing
 * @param {HTMLElement}  - The element that is being dragged.
 */
function handleDragEnd(this: HTMLElement) {
    this.style.opacity = '1';
    this.style.border = '1px solid #000';
}

/**
 * If the user is dragging a disk and the disk is at the top of the tower, then move the disk to the
 * new tower
 * @param {number} col - The column to move the disk to.
 */
function move(col: number) {
    const diskAtTop =
        hanoi.towers[startDragCol][hanoi.towers[startDragCol].length - 1] ===
        startDragDisk;
    if (hanoi.can_move(startDragCol, col) && diskAtTop) {
        hanoi.move(startDragCol, col, false);
        hanoi.draw();
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

/**
 * `removeDiskFromPic` removes the last child of the given `pic` and returns it
 * @param {HTMLElement} pic - The picture element that the disk is being removed from.
 * @returns The disk that was removed from the pic.
 */
function removeDiskFromPic(pic: HTMLElement) {
    const disk: HTMLElement = pic.lastChild as HTMLElement;
    pic.removeChild(disk);
    return disk;
}

/**
 * It creates a new Hanoi object, and then calls the draw function on it.
 */
function play() {
    WON.style.display = 'block';
    // clear divs
    for (let i = 0; i < TOWERS.length; i++) {
        TOWERS[i].innerHTML = '';
    }
    WON.innerHTML = 'Moves : 0';
    if (INPUT != null) {
        const n = Number(INPUT.value);
        if (n > 0 && n <= 7) {
            hanoi = new Hanoi(n);
            hanoi.draw();
        }
    }
    setEvents();
}

/* The Hanoi class is a class that represents a Hanoi game. It has a constructor that takes a number of
disks as a parameter and creates a Hanoi game with that number of disks. It also has a method called
move that takes two numbers as parameters and moves the top disk from the first tower to the second
tower. It also has a method called draw that draws the disks on the screen. */
class Hanoi {
    n: number;
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
            TOWERS[0].appendChild(initDiv(div, n, i, str));
        }
        this.moves = 0;
        this.solved = false;
        this.lastsMoves = [];
    }

    can_move(from: number, to: number) {
        if (this.towers[from].length === 0) {
            return false;
        } else if (this.towers[to].length === 0) {
            return true;
        } else {
            return (
                this.towers[from][this.towers[from].length - 1] <
                this.towers[to][this.towers[to].length - 1]
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
        this.draw();
        CANCEL.classList.remove('over-underline');
        CANCEL.classList.add('grey');
    }

    move(from: number, to: number, revert: boolean) {
        // remove the last child in the pic number from
        const lastChild: HTMLElement = removeDiskFromPic(TOWERS[from]);
        TOWERS[to].appendChild(lastChild);

        this.towers[to].push(this.towers[from].pop() as number);

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
            this.moves++;
        }
        WON.innerHTML = 'Moves : ' + this.moves.toString();
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
                            TOWERS_AREAS[0].offsetWidth / 2).toString() +
                        'px';
                } else if (i === 1) {
                    div.style.left =
                        (document.body.clientWidth / 2 -
                            div.offsetWidth / 2 +
                            TOWERS_AREAS[1].offsetWidth / 2).toString() +
                        'px';
                } else {
                    div.style.left =
                        (document.body.clientWidth / 1.25 -
                            div.offsetWidth / 2 +
                            TOWERS_AREAS[2].offsetWidth / 2).toString() +
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
    div.draggable = true;
    div.style.cursor = 'move';

    div.style.bottom = (i * 45 + 30 - 10).toString() + 'px';
    div.style.left = (screen.width / 6 - (n - i) * 30 + 2.5).toString() + 'px';
    div.style.zIndex = '2';
    return div;
}

let hanoi: Hanoi;
