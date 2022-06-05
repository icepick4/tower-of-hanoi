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

/***/ "./2d/click-to-select/src/constants.ts":
/*!*********************************************!*\
  !*** ./2d/click-to-select/src/constants.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BTN_PLAY\": () => (/* binding */ BTN_PLAY),\n/* harmony export */   \"CONTAINER_DISKS\": () => (/* binding */ CONTAINER_DISKS),\n/* harmony export */   \"INPUT\": () => (/* binding */ INPUT),\n/* harmony export */   \"TOWERS\": () => (/* binding */ TOWERS),\n/* harmony export */   \"WON\": () => (/* binding */ WON)\n/* harmony export */ });\nconst TOWER1 = document.getElementById(\"pic1\");\r\nconst TOWER2 = document.getElementById(\"pic2\");\r\nconst TOWER3 = document.getElementById(\"pic3\");\r\nconst TOWERS = [TOWER1, TOWER2, TOWER3];\r\nconst INPUT = document.querySelector(\"input\");\r\nconst WON = document.getElementById(\"won\");\r\nconst BTN_PLAY = document.getElementById(\"play\");\r\nconst CONTAINER_DISKS = document.getElementById(\"disks\");\r\n\n\n//# sourceURL=webpack://tower-of-hanoi/./2d/click-to-select/src/constants.ts?");

/***/ }),

/***/ "./2d/click-to-select/src/main.ts":
/*!****************************************!*\
  !*** ./2d/click-to-select/src/main.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./2d/click-to-select/src/constants.ts\");\n\r\n_constants__WEBPACK_IMPORTED_MODULE_0__.BTN_PLAY.addEventListener(\"click\", play);\r\nfor (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS.length; i++) {\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[i].addEventListener(\"click\", clickTower);\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[i].addEventListener(\"mouseover\", mouseHover);\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[i].addEventListener(\"mouseout\", mouseOut);\r\n}\r\nfunction clickTower(ev) {\r\n    //get bg of pic1\r\n    const bg = this.style.backgroundColor;\r\n    const pic = Number(ev.target.id.substring(3)) - 1;\r\n    if (bg == \"blue\") {\r\n        this.style.backgroundColor = \"black\";\r\n    }\r\n    else {\r\n        this.style.backgroundColor = \"blue\";\r\n    }\r\n    move(pic);\r\n}\r\nfunction mouseHover() {\r\n    const bg = this.style.backgroundColor;\r\n    if (bg != \"blue\") {\r\n        this.style.backgroundColor = \"red\";\r\n    }\r\n}\r\nfunction mouseOut() {\r\n    const bg = this.style.backgroundColor;\r\n    if (bg != \"blue\") {\r\n        this.style.backgroundColor = \"black\";\r\n    }\r\n}\r\n//event listener on resize window\r\nwindow.addEventListener(\"resize\", function () {\r\n    hanoi.draw();\r\n    for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS.length; i++) {\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[i].style.width = (document.body.clientWidth / 50) + \"px\";\r\n    }\r\n});\r\nlet hanoi;\r\nfunction move(col) {\r\n    if (hanoi.clicked1 == null) {\r\n        hanoi.setClicked(col);\r\n    }\r\n    else {\r\n        unselectAll();\r\n        if (hanoi.can_move(hanoi.clicked1, col)) {\r\n            hanoi.move(hanoi.clicked1, col);\r\n            hanoi.draw();\r\n        }\r\n        hanoi.clicked1 = null;\r\n    }\r\n}\r\nfunction unselectAll() {\r\n    for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS.length; i++) {\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[i].style.backgroundColor = \"black\";\r\n    }\r\n}\r\nfunction play() {\r\n    //clear div with id \"disks\"\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_DISKS.innerHTML = \"\";\r\n    unselectAll();\r\n    _constants__WEBPACK_IMPORTED_MODULE_0__.WON.innerHTML = \"Moves : 0\";\r\n    if (_constants__WEBPACK_IMPORTED_MODULE_0__.INPUT != null) {\r\n        const n = Number(_constants__WEBPACK_IMPORTED_MODULE_0__.INPUT.value);\r\n        if (n > 0 && n <= 7) {\r\n            hanoi = new Hanoi(n);\r\n            hanoi.draw();\r\n        }\r\n    }\r\n}\r\nclass Hanoi {\r\n    n;\r\n    clicked1;\r\n    towers;\r\n    moves;\r\n    solved;\r\n    constructor(n) {\r\n        this.n = n;\r\n        this.towers = [];\r\n        for (let i = 0; i < 3; i++) {\r\n            const disk_array = [];\r\n            this.towers.push(disk_array);\r\n        }\r\n        for (let i = 0; i < this.n; i++) {\r\n            this.towers[0].push(this.n - i);\r\n            //i into string\r\n            const str = (this.n - i).toString();\r\n            //create a new div with id disk_i\r\n            const div = document.createElement(\"div\");\r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_DISKS.appendChild(initDiv(div, n, i, str));\r\n        }\r\n        this.moves = 0;\r\n        this.solved = false;\r\n        this.clicked1 = null;\r\n    }\r\n    setClicked(i) {\r\n        this.clicked1 = i;\r\n    }\r\n    can_move(from, to) {\r\n        if (this.towers[from].length == 0) {\r\n            return false;\r\n        }\r\n        else if (this.towers[to].length == 0) {\r\n            return true;\r\n        }\r\n        else {\r\n            return this.towers[from][this.towers[from].length - 1] < this.towers[to][this.towers[to].length - 1];\r\n        }\r\n    }\r\n    move(from, to) {\r\n        this.towers[to].push(this.towers[from].pop());\r\n        this.moves++;\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.WON.innerHTML = \"Moves : \" + this.moves.toString();\r\n        if (this.towers[2].length == this.n) {\r\n            this.solved = true;\r\n            //display #won \r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.WON.innerHTML = \"You won in \" + this.moves.toString() + \" moves!\";\r\n        }\r\n    }\r\n    draw() {\r\n        //draw the disks on the lines\r\n        for (let i = 0; i < 3; i++) {\r\n            for (let j = 0; j < this.towers[i].length; j++) {\r\n                const div = document.getElementById(\"disk_\" + this.towers[i][j].toString());\r\n                div.style.bottom =\r\n                    (j * document.body.clientWidth) / 33.333 + 30 - 10 + \"px\";\r\n                div.style.width =\r\n                    (document.body.clientWidth * this.towers[i][j]) / 25 +\r\n                        10 +\r\n                        \"px\";\r\n                div.style.height = document.body.clientWidth / 33.333 + \"px\";\r\n                if (i == 0) {\r\n                    div.style.left =\r\n                        document.body.clientWidth / 6 -\r\n                            div.offsetWidth / 2 +\r\n                            _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[0].offsetWidth / 2 +\r\n                            \"px\";\r\n                }\r\n                else if (i == 1) {\r\n                    div.style.left =\r\n                        document.body.clientWidth / 2 -\r\n                            div.offsetWidth / 2 +\r\n                            _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[1].offsetWidth / 2 +\r\n                            \"px\";\r\n                }\r\n                else {\r\n                    div.style.left =\r\n                        document.body.clientWidth / 1.25 -\r\n                            div.offsetWidth / 2 +\r\n                            _constants__WEBPACK_IMPORTED_MODULE_0__.TOWERS[2].offsetWidth / 2 +\r\n                            \"px\";\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\nfunction initDiv(div, n, i, str) {\r\n    div.id = \"disk_\" + str;\r\n    //random color for fillStyle\r\n    const r = Math.floor(Math.random() * 255);\r\n    const g = Math.floor(Math.random() * 255);\r\n    const b = Math.floor(Math.random() * 255);\r\n    div.style.backgroundColor = \"rgb(\" + r + \", \" + g + \", \" + b + \")\";\r\n    div.style.border = \"1px solid black\";\r\n    div.style.width =\r\n        (document.body.clientWidth * (n - 1)) / 25 + 10 + \"px\";\r\n    div.style.height = document.body.clientWidth / 33.333 + \"px\";\r\n    div.style.position = \"absolute\";\r\n    div.style.bottom = i * 45 + 30 - 10 + \"px\";\r\n    div.style.left = screen.width / 6 - (n - i) * 30 + 2.5 + \"px\";\r\n    div.style.zIndex = \"2\";\r\n    return div;\r\n}\r\n\n\n//# sourceURL=webpack://tower-of-hanoi/./2d/click-to-select/src/main.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./2d/click-to-select/src/main.ts");
/******/ 	
/******/ })()
;