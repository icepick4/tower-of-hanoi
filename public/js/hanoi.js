/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hanoi.ts":
/*!**********************!*\
  !*** ./src/hanoi.ts ***!
  \**********************/
/***/ (() => {

eval("\r\nconst won = document.getElementById(\"won\");\r\nclass Hanoi {\r\n    n;\r\n    towers;\r\n    moves;\r\n    solved;\r\n    constructor(n) {\r\n        this.n = n;\r\n        this.towers = [];\r\n        for (var i = 0; i < 3; i++) {\r\n            let disk_array = [];\r\n            this.towers.push(disk_array);\r\n        }\r\n        for (var i = 0; i < this.n; i++) {\r\n            this.towers[0].push(this.n - i);\r\n            //i into string\r\n            var str = (this.n - i).toString();\r\n            //create a new div with id disk_i\r\n            var div = document.createElement(\"div\");\r\n            div.id = \"disk_\" + str;\r\n            //random color for fillStyle\r\n            var r = Math.floor(Math.random() * 255);\r\n            var g = Math.floor(Math.random() * 255);\r\n            var b = Math.floor(Math.random() * 255);\r\n        }\r\n        this.moves = 0;\r\n        this.solved = false;\r\n    }\r\n    can_move(from, to) {\r\n        if (this.towers[from].length == 0) {\r\n            return false;\r\n        }\r\n        else if (this.towers[to].length == 0) {\r\n            return true;\r\n        }\r\n        else {\r\n            return this.towers[from][this.towers[from].length - 1] < this.towers[to][this.towers[to].length - 1];\r\n        }\r\n    }\r\n    move(from, to) {\r\n        this.towers[to].push(this.towers[from].pop());\r\n        this.moves++;\r\n        won.innerHTML = \"Moves : \" + this.moves.toString();\r\n        if (this.towers[2].length == this.n) {\r\n            this.solved = true;\r\n            //display #won \r\n            won.innerHTML = \"You won in \" + this.moves.toString() + \" moves!\";\r\n        }\r\n    }\r\n    draw() {\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://tower-of-hanoi/./src/hanoi.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/hanoi.ts"]();
/******/ 	
/******/ })()
;