# tower-of-hanoi

<img src="https://forthebadge.com/images/badges/made-with-typescript.svg" height="35"/>
<img src="https://forthebadge.com/images/badges/uses-js.svg" height="35"/>
<img src="https://forthebadge.com/images/badges/open-source.svg" height="35"/>

## Intro to the game

> The Tower of Hanoi (also called The problem of Benares Temple or Tower of Brahma or Lucas' Tower and sometimes pluralized as Towers, or simply pyramid puzzle) is a mathematical game or puzzle consisting of three rods and a number of disks of various diameters, which can slide onto any rod.
> The puzzle begins with the disks stacked on one rod in order of decreasing size, the smallest at the top, thus approximating a conical shape.
> The objective of the puzzle is to move the entire stack to the last rod, obeying the following rules:
>
> -   Only one disk may be moved at a time.
> -   Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.
> -   No disk may be placed on top of a disk that is smaller than it.
>     With 3 disks, the puzzle can be solved in 7 moves. The minimal number of moves required to solve a Tower of Hanoi puzzle is 2^(n − 1), where n is the number of disks.

(« Tower of Hanoi » 2022).

Bibliography : Tower of Hanoi. (12th April, 2022). In ​Wikipedia​. [https://en.wikipedia.org/wiki/Tower_of_Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi)

## Playing

### Two dimensions version

-   Drag & Drop :
    Drag disks then drop them onto towers to play ! </br>
    URL : [Drag&Drop](https://icepick4.github.io/tower-of-hanoi/2d/drag-and-drop/public/)

-   Click To Select :
    Click on a tower to select the disk at the top of it then click on another to play ! </br>
    URL : [ClickToSelect](https://icepick4.github.io/tower-of-hanoi/2d/click-to-select/public/)

### Three dimensions version

Made with [ThreeJS](https://threejs.org/).

Usage : Click on a disk to pick it, then click on a tower to place it.

URL : [ThreeJS](https://icepick4.github.io/tower-of-hanoi/threejs/public/)

## Dev

Clone the projet, then

```bash
npm i
npm run dev
```

Care, if you want to work on a precise project, you have to change paths in [server.js](https://github.com/icepick4/tower-of-hanoi/blob/main/server.js)
and [webpack.config.js](https://github.com/icepick4/tower-of-hanoi/blob/main/webpack.config.js).
