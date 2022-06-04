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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BTN_PLAY\": () => (/* binding */ BTN_PLAY),\n/* harmony export */   \"DROP_AREA0\": () => (/* binding */ DROP_AREA0),\n/* harmony export */   \"DROP_AREA1\": () => (/* binding */ DROP_AREA1),\n/* harmony export */   \"DROP_AREA2\": () => (/* binding */ DROP_AREA2),\n/* harmony export */   \"DROP_AREAS\": () => (/* binding */ DROP_AREAS),\n/* harmony export */   \"INPUT\": () => (/* binding */ INPUT),\n/* harmony export */   \"TOWER0\": () => (/* binding */ TOWER0),\n/* harmony export */   \"TOWER1\": () => (/* binding */ TOWER1),\n/* harmony export */   \"TOWER2\": () => (/* binding */ TOWER2),\n/* harmony export */   \"TOWERS\": () => (/* binding */ TOWERS),\n/* harmony export */   \"TOWERS_AREAS\": () => (/* binding */ TOWERS_AREAS),\n/* harmony export */   \"TOWER_AREA0\": () => (/* binding */ TOWER_AREA0),\n/* harmony export */   \"TOWER_AREA1\": () => (/* binding */ TOWER_AREA1),\n/* harmony export */   \"TOWER_AREA2\": () => (/* binding */ TOWER_AREA2),\n/* harmony export */   \"WON\": () => (/* binding */ WON)\n/* harmony export */ });\nconst INPUT = document.querySelector(\"input\");\r\nconst WON = document.getElementById(\"won\");\r\nconst BTN_PLAY = document.getElementById(\"play\");\r\nconst TOWER0 = document.getElementById(\"pic0\");\r\nconst TOWER1 = document.getElementById(\"pic1\");\r\nconst TOWER2 = document.getElementById(\"pic2\");\r\nconst TOWERS = [TOWER0, TOWER1, TOWER2];\r\nconst TOWER_AREA0 = document.getElementById(\"pic-area-0\");\r\nconst TOWER_AREA1 = document.getElementById(\"pic-area-1\");\r\nconst TOWER_AREA2 = document.getElementById(\"pic-area-2\");\r\nconst TOWERS_AREAS = [TOWER_AREA0, TOWER_AREA1, TOWER_AREA2];\r\nTOWER_AREA0.style.width = document.body.clientWidth / 50 + \"px\";\r\nTOWER_AREA1.style.width = document.body.clientWidth / 50 + \"px\";\r\nTOWER_AREA2.style.width = document.body.clientWidth / 50 + \"px\";\r\nconst DROP_AREA0 = document.getElementById(\"DROP_AREA0\");\r\nconst DROP_AREA1 = document.getElementById(\"DROP_AREA1\");\r\nconst DROP_AREA2 = document.getElementById(\"DROP_AREA2\");\r\nconst DROP_AREAS = [DROP_AREA0, DROP_AREA1, DROP_AREA2];\r\n\n\n//# sourceURL=webpack://tower-of-hanoi/./2d/drag-and-drop/src/constants.ts?");

/***/ }),

/***/ "./2d/drag-and-drop/src/main.ts":
/*!**************************************!*\
  !*** ./2d/drag-and-drop/src/main.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./2d/drag-and-drop/src/constants.ts\");\n\r\nvar startDragCol;\r\nvar startDragDisk;\r\nvar hanoi;\r\n_constants__WEBPACK_IMPORTED_MODULE_0__.BTN_PLAY.addEventListener(\"click\", play);\r\n//event listener on resize window\r\nwindow.addEventListener(\"resize\", function (e) {\r\n    if (hanoi != null) {\r\n        hanoi.draw();\r\n    }\r\n    for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS.length; i++) {\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS[i].style.width = document.body.clientWidth / 50 + \"px\";\r\n    }\r\n});\r\n//event on opening devtools\r\nwindow.addEventListener(\"click\", function (e) {\r\n    if (hanoi != null) {\r\n        hanoi.draw();\r\n    }\r\n});\r\nfunction setEvents() {\r\n    for (var i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[0].children.length; i++) {\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[0].children[i].addEventListener(\"dragstart\", handleDragStart);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[0].children[i].addEventListener(\"dragend\", handleDragEnd);\r\n    }\r\n    for (var i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.DROP_AREAS.length; i++) {\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.DROP_AREAS[i].addEventListener(\"dragover\", allowDrop);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.DROP_AREAS[i].addEventListener(\"drop\", drop);\r\n    }\r\n}\r\nfunction allowDrop(ev) {\r\n    ev.preventDefault();\r\n    var diskAtTop = hanoi.towers[startDragCol][hanoi.towers[startDragCol].length - 1] ==\r\n        startDragDisk;\r\n    //get the tower we are over\r\n    if (ev.target != null) {\r\n        //get id\r\n        var id = ev.target.id;\r\n        //id equald last char of id\r\n        var col = Number(id.substring(id.length - 1));\r\n        for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS.length; i++) {\r\n            if (_constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS[i].id == \"pic-area-\" + col && hanoi.can_move(startDragCol, i) && diskAtTop) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS[i].style.backgroundColor = \"purple\";\r\n            }\r\n            else {\r\n                _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS[i].style.backgroundColor = \"black\";\r\n            }\r\n        }\r\n    }\r\n}\r\nfunction drop(ev) {\r\n    ev.preventDefault();\r\n    //get the id of the pic where we drop\r\n    if (ev.target != null) {\r\n        var id = ev.target.id;\r\n        var col = Number(id.substring(id.length - 1));\r\n        move(col);\r\n    }\r\n    for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS.length; i++) {\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS[i].style.backgroundColor = \"black\";\r\n    }\r\n}\r\nfunction handleDragStart() {\r\n    this.style.opacity = \"0.75\";\r\n    this.style.border = \"1px dashed #000\";\r\n    var disk = Number(this.id.substring(this.id.length - 1));\r\n    for (var i = 0; i < 3; i++) {\r\n        for (var j = 0; j < hanoi.towers[i].length; j++) {\r\n            if (hanoi.towers[i][j] == disk) {\r\n                startDragCol = i;\r\n                startDragDisk = disk;\r\n                break;\r\n            }\r\n        }\r\n    }\r\n}\r\nfunction handleDragEnd() {\r\n    this.style.opacity = \"1\";\r\n    this.style.border = \"1px solid #000\";\r\n}\r\nfunction move(col) {\r\n    var diskAtTop = hanoi.towers[startDragCol][hanoi.towers[startDragCol].length - 1] ==\r\n        startDragDisk;\r\n    if (hanoi.can_move(startDragCol, col) && diskAtTop) {\r\n        hanoi.move(startDragCol, col);\r\n        hanoi.draw();\r\n    }\r\n}\r\nfunction removeDiskFromPic(pic) {\r\n    var disk = pic.lastChild;\r\n    pic.removeChild(disk);\r\n    return disk;\r\n}\r\nfunction play() {\r\n    //clear divs\r\n    for (var i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS.length; i++) {\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[i].innerHTML = \"\";\r\n    }\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.WON.innerHTML = \"Moves : 0\";\r\n    if (_constants__WEBPACK_IMPORTED_MODULE_0__.INPUT != null) {\r\n        var n = Number(_constants__WEBPACK_IMPORTED_MODULE_0__.INPUT.value);\r\n        if (n > 0 && n <= 7) {\r\n            hanoi = new Hanoi(n);\r\n            hanoi.draw();\r\n        }\r\n    }\r\n    setEvents();\r\n}\r\nclass Hanoi {\r\n    n;\r\n    towers;\r\n    moves;\r\n    solved;\r\n    constructor(n) {\r\n        this.n = n;\r\n        this.towers = [];\r\n        for (var i = 0; i < 3; i++) {\r\n            let disk_array = [];\r\n            this.towers.push(disk_array);\r\n        }\r\n        for (var i = 0; i < this.n; i++) {\r\n            this.towers[0].push(this.n - i);\r\n            //i into string\r\n            var str = (this.n - i).toString();\r\n            //create a new div with id disk_i\r\n            var div = document.createElement(\"div\");\r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[0].appendChild(initDiv(div, n, i, str));\r\n        }\r\n        this.moves = 0;\r\n        this.solved = false;\r\n    }\r\n    can_move(from, to) {\r\n        if (this.towers[from].length == 0) {\r\n            return false;\r\n        }\r\n        else if (this.towers[to].length == 0) {\r\n            return true;\r\n        }\r\n        else {\r\n            return (this.towers[from][this.towers[from].length - 1] <\r\n                this.towers[to][this.towers[to].length - 1]);\r\n        }\r\n    }\r\n    move(from, to) {\r\n        //remove the last child in the pic number from\r\n        var lastChild = removeDiskFromPic(_constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[from]);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[to].appendChild(lastChild);\r\n        this.towers[to].push(this.towers[from].pop());\r\n        this.moves++;\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.WON.innerHTML = \"Moves : \" + this.moves.toString();\r\n        if (this.towers[2].length == this.n) {\r\n            this.solved = true;\r\n            //display #won\r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.WON.innerHTML = \"You won in \" + this.moves.toString() + \" moves!\";\r\n        }\r\n    }\r\n    draw() {\r\n        //draw the disks on the lines\r\n        for (var i = 0; i < 3; i++) {\r\n            for (var j = 0; j < this.towers[i].length; j++) {\r\n                var div = document.getElementById(\"disk_\" + this.towers[i][j].toString());\r\n                div.style.bottom =\r\n                    (j * document.body.clientWidth) / 33.333 + 30 - 10 + \"px\";\r\n                div.style.width =\r\n                    (document.body.clientWidth * this.towers[i][j]) / 25 +\r\n                        10 +\r\n                        \"px\";\r\n                div.style.height = document.body.clientWidth / 33.333 + \"px\";\r\n                if (i == 0) {\r\n                    div.style.left =\r\n                        document.body.clientWidth / 6 -\r\n                            div.offsetWidth / 2 +\r\n                            _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS[0].offsetWidth / 2 +\r\n                            \"px\";\r\n                }\r\n                else if (i == 1) {\r\n                    div.style.left =\r\n                        document.body.clientWidth / 2 -\r\n                            div.offsetWidth / 2 +\r\n                            _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS[1].offsetWidth / 2 +\r\n                            \"px\";\r\n                }\r\n                else {\r\n                    div.style.left =\r\n                        document.body.clientWidth / 1.25 -\r\n                            div.offsetWidth / 2 +\r\n                            _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS_AREAS[2].offsetWidth / 2 +\r\n                            \"px\";\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\nfunction initDiv(div, n, i, str) {\r\n    div.id = \"disk_\" + str;\r\n    //random color for fillStyle\r\n    var r = Math.floor(Math.random() * 255);\r\n    var g = Math.floor(Math.random() * 255);\r\n    var b = Math.floor(Math.random() * 255);\r\n    div.style.backgroundColor = \"rgb(\" + r + \", \" + g + \", \" + b + \")\";\r\n    div.style.border = \"1px solid black\";\r\n    div.style.width =\r\n        (document.body.clientWidth * (n - 1)) / 25 + 10 + \"px\";\r\n    div.style.height = document.body.clientWidth / 33.333 + \"px\";\r\n    div.style.position = \"absolute\";\r\n    div.draggable = true;\r\n    div.style.cursor = \"move\";\r\n    div.style.bottom = i * 45 + 30 - 10 + \"px\";\r\n    div.style.left = screen.width / 6 - (n - i) * 30 + 2.5 + \"px\";\r\n    div.style.zIndex = \"2\";\r\n    return div;\r\n}\r\n\n\n//# sourceURL=webpack://tower-of-hanoi/./2d/drag-and-drop/src/main.ts?");

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