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

/***/ "./2d/drag-and-drop/src/constants.ts":
/*!*******************************************!*\
  !*** ./2d/drag-and-drop/src/constants.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BTN_PLAY\": () => (/* binding */ BTN_PLAY),\n/* harmony export */   \"INPUT\": () => (/* binding */ INPUT),\n/* harmony export */   \"PIC1\": () => (/* binding */ PIC1),\n/* harmony export */   \"PIC1_AREA\": () => (/* binding */ PIC1_AREA),\n/* harmony export */   \"PIC2\": () => (/* binding */ PIC2),\n/* harmony export */   \"PIC2_AREA\": () => (/* binding */ PIC2_AREA),\n/* harmony export */   \"PIC3\": () => (/* binding */ PIC3),\n/* harmony export */   \"PIC3_AREA\": () => (/* binding */ PIC3_AREA),\n/* harmony export */   \"TOWER0\": () => (/* binding */ TOWER0),\n/* harmony export */   \"TOWER1\": () => (/* binding */ TOWER1),\n/* harmony export */   \"TOWER2\": () => (/* binding */ TOWER2),\n/* harmony export */   \"WON\": () => (/* binding */ WON)\n/* harmony export */ });\nconst INPUT = document.querySelector(\"input\");\r\nconst WON = document.getElementById(\"won\");\r\nconst BTN_PLAY = document.getElementById(\"play\");\r\nconst PIC1 = document.getElementById(\"pic1\");\r\nconst PIC2 = document.getElementById(\"pic2\");\r\nconst PIC3 = document.getElementById(\"pic3\");\r\nconst PIC1_AREA = document.getElementById(\"pic1Area\");\r\nconst PIC2_AREA = document.getElementById(\"pic2Area\");\r\nconst PIC3_AREA = document.getElementById(\"pic3Area\");\r\nPIC1_AREA.style.width = document.body.clientWidth / 50 + \"px\";\r\nPIC2_AREA.style.width = document.body.clientWidth / 50 + \"px\";\r\nPIC3_AREA.style.width = document.body.clientWidth / 50 + \"px\";\r\nconst TOWER0 = document.getElementById(\"tower0\");\r\nconst TOWER1 = document.getElementById(\"tower1\");\r\nconst TOWER2 = document.getElementById(\"tower2\");\r\n\n\n//# sourceURL=webpack://tower-of-hanoi/./2d/drag-and-drop/src/constants.ts?");

/***/ }),

/***/ "./2d/drag-and-drop/src/main.ts":
/*!**************************************!*\
  !*** ./2d/drag-and-drop/src/main.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./2d/drag-and-drop/src/constants.ts\");\n\r\nvar startDragCol;\r\nvar startDragDisk;\r\nvar hanoi;\r\n_constants__WEBPACK_IMPORTED_MODULE_0__.BTN_PLAY.addEventListener(\"click\", play);\r\n//event listener on resize window\r\nwindow.addEventListener(\"resize\", function (e) {\r\n    if (hanoi != null) {\r\n        hanoi.draw();\r\n    }\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1_AREA.style.width = document.body.clientWidth / 50 + \"px\";\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.PIC2_AREA.style.width = document.body.clientWidth / 50 + \"px\";\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.PIC3_AREA.style.width = document.body.clientWidth / 50 + \"px\";\r\n});\r\n//event on opening devtools\r\nwindow.addEventListener(\"click\", function (e) {\r\n    if (hanoi != null) {\r\n        hanoi.draw();\r\n    }\r\n});\r\nfunction setEvents() {\r\n    for (var i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1.children.length; i++) {\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1.children[i].addEventListener(\"dragstart\", handleDragStart);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1.children[i].addEventListener(\"dragend\", handleDragEnd);\r\n    }\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.TOWER0.addEventListener(\"dragover\", allowDrop);\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.TOWER1.addEventListener(\"dragover\", allowDrop);\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.TOWER2.addEventListener(\"dragover\", allowDrop);\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.TOWER0.addEventListener(\"drop\", drop);\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.TOWER1.addEventListener(\"drop\", drop);\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.TOWER2.addEventListener(\"drop\", drop);\r\n}\r\nfunction allowDrop(ev) {\r\n    ev.preventDefault();\r\n}\r\nfunction drop(ev) {\r\n    ev.preventDefault();\r\n    //get the id of the pic where we drop\r\n    if (ev.target != null) {\r\n        var id = ev.target.id;\r\n        var col = Number(id.substring(5, 6));\r\n        move(col);\r\n    }\r\n}\r\nfunction handleDragStart() {\r\n    this.style.opacity = \"0.75\";\r\n    this.style.border = \"1px dashed #000\";\r\n    var disk = Number(this.id.substring(5, 6));\r\n    for (var i = 0; i < 3; i++) {\r\n        for (var j = 0; j < hanoi.towers[i].length; j++) {\r\n            if (hanoi.towers[i][j] == disk) {\r\n                startDragCol = i;\r\n                startDragDisk = disk;\r\n                break;\r\n            }\r\n        }\r\n    }\r\n}\r\nfunction handleDragEnd() {\r\n    this.style.opacity = \"1\";\r\n    this.style.border = \"1px solid #000\";\r\n}\r\nfunction move(col) {\r\n    var diskAtTop = hanoi.towers[startDragCol][hanoi.towers[startDragCol].length - 1] ==\r\n        startDragDisk;\r\n    if (hanoi.can_move(startDragCol, col) && diskAtTop) {\r\n        hanoi.move(startDragCol, col);\r\n        hanoi.draw();\r\n    }\r\n}\r\nfunction removeDiskFromPic(pic) {\r\n    var disk = pic.lastChild;\r\n    pic.removeChild(disk);\r\n    return disk;\r\n}\r\nfunction play() {\r\n    //clear divs\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1.innerHTML = \"\";\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.PIC2.innerHTML = \"\";\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.PIC3.innerHTML = \"\";\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.WON.innerHTML = \"Moves : 0\";\r\n    if (_constants__WEBPACK_IMPORTED_MODULE_0__.INPUT != null) {\r\n        var n = Number(_constants__WEBPACK_IMPORTED_MODULE_0__.INPUT.value);\r\n        if (n > 0 && n <= 7) {\r\n            hanoi = new Hanoi(n);\r\n            hanoi.draw();\r\n        }\r\n    }\r\n    setEvents();\r\n}\r\nclass Hanoi {\r\n    n;\r\n    towers;\r\n    moves;\r\n    solved;\r\n    constructor(n) {\r\n        this.n = n;\r\n        this.towers = [];\r\n        for (var i = 0; i < 3; i++) {\r\n            let disk_array = [];\r\n            this.towers.push(disk_array);\r\n        }\r\n        for (var i = 0; i < this.n; i++) {\r\n            this.towers[0].push(this.n - i);\r\n            //i into string\r\n            var str = (this.n - i).toString();\r\n            //create a new div with id disk_i\r\n            var div = document.createElement(\"div\");\r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1.appendChild(initDiv(div, n, i, str));\r\n        }\r\n        this.moves = 0;\r\n        this.solved = false;\r\n    }\r\n    can_move(from, to) {\r\n        if (this.towers[from].length == 0) {\r\n            return false;\r\n        }\r\n        else if (this.towers[to].length == 0) {\r\n            return true;\r\n        }\r\n        else {\r\n            return (this.towers[from][this.towers[from].length - 1] <\r\n                this.towers[to][this.towers[to].length - 1]);\r\n        }\r\n    }\r\n    move(from, to) {\r\n        //remove the last child in the pic number from\r\n        var lastChild;\r\n        if (from == 0) {\r\n            lastChild = removeDiskFromPic(_constants__WEBPACK_IMPORTED_MODULE_0__.PIC1);\r\n        }\r\n        else if (from == 1) {\r\n            lastChild = removeDiskFromPic(_constants__WEBPACK_IMPORTED_MODULE_0__.PIC2);\r\n        }\r\n        else {\r\n            lastChild = removeDiskFromPic(_constants__WEBPACK_IMPORTED_MODULE_0__.PIC3);\r\n        }\r\n        if (to == 0) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1.appendChild(lastChild);\r\n        }\r\n        else if (to == 1) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.PIC2.appendChild(lastChild);\r\n        }\r\n        else {\r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.PIC3.appendChild(lastChild);\r\n        }\r\n        this.towers[to].push(this.towers[from].pop());\r\n        this.moves++;\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.WON.innerHTML = \"Moves : \" + this.moves.toString();\r\n        if (this.towers[2].length == this.n) {\r\n            this.solved = true;\r\n            //display #won\r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.WON.innerHTML = \"You won in \" + this.moves.toString() + \" moves!\";\r\n        }\r\n    }\r\n    draw() {\r\n        //draw the disks on the lines\r\n        for (var i = 0; i < this.towers[0].length; i++) {\r\n            var div = document.getElementById(\"disk_\" + this.towers[0][i].toString());\r\n            div.style.bottom =\r\n                (i * document.body.clientWidth) / 33.333 + 30 - 10 + \"px\";\r\n            div.style.width =\r\n                (document.body.clientWidth * this.towers[0][i]) / 25 +\r\n                    10 +\r\n                    \"px\";\r\n            div.style.height = document.body.clientWidth / 33.333 + \"px\";\r\n            div.style.left =\r\n                document.body.clientWidth / 6 -\r\n                    div.offsetWidth / 2 +\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1_AREA.offsetWidth / 2 +\r\n                    \"px\";\r\n        }\r\n        for (var i = 0; i < this.towers[1].length; i++) {\r\n            var div = document.getElementById(\"disk_\" + this.towers[1][i].toString());\r\n            div.style.bottom =\r\n                (i * document.body.clientWidth) / 33.333 + 30 - 10 + \"px\";\r\n            div.style.width =\r\n                (document.body.clientWidth * this.towers[1][i]) / 25 +\r\n                    10 +\r\n                    \"px\";\r\n            div.style.height = document.body.clientWidth / 33.333 + \"px\";\r\n            div.style.left =\r\n                document.body.clientWidth / 2 -\r\n                    div.offsetWidth / 2 +\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1_AREA.offsetWidth / 2 +\r\n                    \"px\";\r\n        }\r\n        for (var i = 0; i < this.towers[2].length; i++) {\r\n            var div = document.getElementById(\"disk_\" + this.towers[2][i].toString());\r\n            div.style.bottom =\r\n                (i * document.body.clientWidth) / 33.333 + 30 - 10 + \"px\";\r\n            div.style.width =\r\n                (document.body.clientWidth * this.towers[2][i]) / 25 +\r\n                    10 +\r\n                    \"px\";\r\n            div.style.height = document.body.clientWidth / 33.333 + \"px\";\r\n            div.style.left =\r\n                document.body.clientWidth / 1.25 -\r\n                    div.offsetWidth / 2 +\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.PIC1_AREA.offsetWidth / 2 +\r\n                    \"px\";\r\n        }\r\n    }\r\n}\r\nfunction initDiv(div, n, i, str) {\r\n    div.id = \"disk_\" + str;\r\n    //random color for fillStyle\r\n    var r = Math.floor(Math.random() * 255);\r\n    var g = Math.floor(Math.random() * 255);\r\n    var b = Math.floor(Math.random() * 255);\r\n    div.style.backgroundColor = \"rgb(\" + r + \", \" + g + \", \" + b + \")\";\r\n    div.style.border = \"1px solid black\";\r\n    div.style.width =\r\n        (document.body.clientWidth * (n - 1)) / 25 + 10 + \"px\";\r\n    div.style.height = document.body.clientWidth / 33.333 + \"px\";\r\n    div.style.position = \"absolute\";\r\n    div.draggable = true;\r\n    div.style.cursor = \"move\";\r\n    div.style.bottom = i * 45 + 30 - 10 + \"px\";\r\n    div.style.left = screen.width / 6 - (n - i) * 30 + 2.5 + \"px\";\r\n    div.style.zIndex = \"2\";\r\n    return div;\r\n}\r\n\n\n//# sourceURL=webpack://tower-of-hanoi/./2d/drag-and-drop/src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./2d/drag-and-drop/src/main.ts");
/******/ 	
/******/ })()
;