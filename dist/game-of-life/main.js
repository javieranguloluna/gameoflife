(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Javier\Desktop\code-projects\game-of-life\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "H1jD":
/*!****************************************!*\
  !*** ./src/app/hash/hash.component.ts ***!
  \****************************************/
/*! exports provided: HashComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HashComponent", function() { return HashComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");


function HashComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HashComponent_div_0_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const y_r5 = ctx.index; const x_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.toogleCell(x_r2 + "-" + y_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const y_r5 = ctx.index;
    const x_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", x_r2 + "-" + y_r5);
} }
function HashComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HashComponent_div_0_div_1_Template, 1, 1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.dimArray);
} }
class HashComponent {
    constructor() { }
    ngOnInit() {
        this.init();
    }
    init() {
        this.cicleTime = 0;
        this.ciclos = 0;
        this.dim = 200;
        this.action = 'Play';
        this.resetEvents();
        this.initGrid();
        this.dimArray = [];
        for (let n = 0; n < this.dim; n++) {
            this.dimArray[n] = null;
        }
        if (this.cicle) {
            clearInterval(this.cicle);
        }
        this.cicle = null;
    }
    ngAfterViewChecked() {
        this.renderFullGrid();
    }
    resetEvents() {
        this.events = {
            muertes: 0,
            nacimientos: 0,
            aunMuertas: 0,
            aunVivas: 0
        };
    }
    initGrid() {
        this.grid = [];
        this.gridKeys = [];
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                const key = x + '-' + y;
                this.gridKeys.push(key);
                this.grid[key] = Boolean(Math.random() < 0.5);
            }
        }
    }
    resetGrid() {
        this.initGrid();
        this.renderFullGrid();
    }
    renderFullGrid() {
        this.gridKeys.forEach(k => {
            if (this.grid[k]) {
                document.getElementById(k).classList.add('alive');
            }
            else {
                document.getElementById(k).classList.remove('alive');
            }
        });
    }
    resetAll() {
        this.cicleTime = 0;
        this.ciclos = 0;
        this.action = 'Play';
        this.resetEvents();
        this.resetGrid();
        for (let n = 0; n < this.dim; n++) {
            this.dimArray[n] = null;
        }
        if (this.cicle) {
            clearInterval(this.cicle);
        }
        this.cicle = null;
    }
    checkStatus({ x, y }) {
        const aliveNeighbours = this.getNeighbours({ x, y });
        if (this.grid[`${x}-${y}`]) {
            // esta viva
            if (aliveNeighbours === 2 || aliveNeighbours === 3) {
                // sigue viva
                this.events.aunVivas++;
                return true;
            }
            else {
                // muere
                this.events.muertes++;
                return false;
            }
        }
        else {
            // esta muerta
            if (aliveNeighbours === 3) {
                // nace
                this.events.nacimientos++;
                return true;
            }
            else {
                // sigue muerta
                this.events.aunMuertas++;
                return false;
            }
        }
    }
    isLimit({ x, y }) {
        const limit = {
            x: 0,
            y: 0
        };
        switch (x) {
            case 0:
                limit.x = -1;
                break;
            case this.dim - 1:
                limit.x = 1;
                break;
            default:
                limit.x = 0;
                break;
        }
        switch (y) {
            case 0:
                limit.y = -1;
                break;
            case this.dim - 1:
                limit.y = 1;
                break;
            default:
                limit.y = 0;
                break;
        }
        return limit;
    }
    getNeighbours(cell) {
        const limit = this.isLimit(cell);
        let aliveNeighbours = 0;
        let xStart = cell.x - 1;
        let xEnd = cell.x + 1;
        let yStart = cell.y - 1;
        let yEnd = cell.y + 1;
        if (limit.x < 0) {
            xStart++;
        }
        else if (limit.x > 0) {
            xEnd--;
        }
        if (limit.y < 0) {
            yStart++;
        }
        else if (limit.y > 0) {
            yEnd--;
        }
        for (let xi = xStart; xi <= xEnd; xi++) {
            for (let yi = yStart; yi <= yEnd; yi++) {
                if (this.grid[`${xi}-${yi}`]) {
                    aliveNeighbours++;
                }
            }
        }
        if (this.grid[`${cell.x}-${cell.y}`]) {
            aliveNeighbours--;
        }
        return aliveNeighbours;
    }
    render(nextGrid) {
        this.gridKeys.forEach(k => {
            if (this.grid[k] !== nextGrid[k]) {
                this.grid[k] = nextGrid[k];
                document.getElementById(k).classList.toggle('alive');
            }
        });
    }
    elapsedTime() {
        if (this.startTime) {
            this.elapsed = ((Date.now() - this.startTime) / 1000);
        }
        this.startTime = Date.now();
    }
    nextCicle() {
        this.elapsedTime();
        const nextGrid = [];
        this.resetEvents();
        this.gridKeys.forEach(k => {
            nextGrid[k] = this.checkStatus(this.decodeKey(k));
        });
        this.render(nextGrid);
        // this.grid = nextGrid;
        this.ciclos++;
    }
    playStop() {
        if (this.cicle) {
            clearInterval(this.cicle);
            this.cicle = null;
            this.action = 'Play';
        }
        else {
            this.cicle = setInterval(() => {
                this.nextCicle();
            }, this.cicleTime);
            this.action = 'Stop';
        }
    }
    toogleCell(key) {
        this.grid[key] = !this.grid[key];
    }
    decodeKey(key) {
        return {
            x: Number(key.split('-')[0]),
            y: Number(key.split('-')[1])
        };
    }
}
HashComponent.ɵfac = function HashComponent_Factory(t) { return new (t || HashComponent)(); };
HashComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HashComponent, selectors: [["app-hash"]], decls: 18, vars: 8, consts: [["class", "col", 4, "ngFor", "ngForOf"], [1, "info"], [1, "btn", 3, "click"], [1, "col"], ["class", "cell", 3, "id", "click", 4, "ngFor", "ngForOf"], [1, "cell", 3, "id", "click"]], template: function HashComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, HashComponent_div_0_Template, 2, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HashComponent_Template_button_click_14_listener() { return ctx.playStop(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HashComponent_Template_button_click_16_listener() { return ctx.resetAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dimArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("N\u00BA de ciclos: ", ctx.ciclos, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Tiempo de ciclo (s): ", ctx.elapsed, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Nacimientos: ", ctx.events.nacimientos, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Muertes: ", ctx.events.muertes, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Siguen vivas: ", ctx.events.aunVivas, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Siguen muertas: ", ctx.events.aunMuertas, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.action);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"]], styles: [".cell[_ngcontent-%COMP%] {\r\n    height: 5px;\r\n    width: 5px;\r\n    margin: 0 0 0 0;\r\n    padding: 0 0 0 0;\r\n    background-color: grey;\r\n}\r\n\r\n.col[_ngcontent-%COMP%] {\r\n    height: 5px;\r\n    display: inline-table;\r\n    margin: 0 0 0 0;\r\n    padding: 0 0 0 0;\r\n}\r\n\r\n.alive[_ngcontent-%COMP%] {\r\n    background-color: black;\r\n}\r\n\r\n.btn[_ngcontent-%COMP%] {\r\n    float: right;\r\n}\r\n\r\n.info[_ngcontent-%COMP%] {\r\n    float: right;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhc2guY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxVQUFVO0lBQ1YsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksWUFBWTtBQUNoQiIsImZpbGUiOiJoYXNoLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2VsbCB7XHJcbiAgICBoZWlnaHQ6IDVweDtcclxuICAgIHdpZHRoOiA1cHg7XHJcbiAgICBtYXJnaW46IDAgMCAwIDA7XHJcbiAgICBwYWRkaW5nOiAwIDAgMCAwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxufVxyXG5cclxuLmNvbCB7XHJcbiAgICBoZWlnaHQ6IDVweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS10YWJsZTtcclxuICAgIG1hcmdpbjogMCAwIDAgMDtcclxuICAgIHBhZGRpbmc6IDAgMCAwIDA7XHJcbn1cclxuXHJcbi5hbGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmJ0biB7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuXHJcbi5pbmZvIHtcclxuICAgIGZsb2F0OiByaWdodDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "J4Xa":
/*!**********************************************!*\
  !*** ./src/app/array2d/array2d.component.ts ***!
  \**********************************************/
/*! exports provided: Array2dComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Array2dComponent", function() { return Array2dComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");


function Array2dComponent_ng_container_0_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function Array2dComponent_ng_container_0_ng_container_2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 7);
} }
function Array2dComponent_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, Array2dComponent_ng_container_0_ng_container_2_ng_container_1_Template, 2, 0, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, Array2dComponent_ng_container_0_ng_container_2_ng_template_2_Template, 1, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const cell_r3 = ctx.$implicit;
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", cell_r3)("ngIfElse", _r5);
} }
function Array2dComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, Array2dComponent_ng_container_0_ng_container_2_Template, 4, 2, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const col_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", col_r1);
} }
class Array2dComponent {
    constructor() {
    }
    ngOnInit() {
        this.resetAll();
    }
    resetEvents() {
        this.events = {
            muertes: 0,
            nacimientos: 0,
            aunMuertas: 0,
            aunVivas: 0
        };
    }
    resetGrid() {
        this.grid = [];
        for (let x = 0; x < this.dim; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.dim; y++) {
                this.grid[x][y] = Boolean(Math.random() < 0.5);
            }
        }
    }
    resetAll() {
        this.cicleTime = 0;
        this.ciclos = 0;
        this.dim = 200;
        this.action = 'Play';
        this.resetEvents();
        this.resetGrid();
        if (this.cicle) {
            clearInterval(this.cicle);
        }
        this.cicle = null;
    }
    checkStatus({ x, y }) {
        const aliveNeighbours = this.getNeighbours({ x, y });
        if (this.grid[x][y]) {
            // esta viva
            if (aliveNeighbours > 1 && aliveNeighbours < 4) {
                // sigue viva
                this.events.aunVivas++;
                return true;
            }
            else {
                // muere
                this.events.muertes++;
                return false;
            }
        }
        else {
            // esta muerta
            if (aliveNeighbours === 3) {
                // nace
                this.events.nacimientos++;
                return true;
            }
            else {
                // sigue muerta
                this.events.aunMuertas++;
                return false;
            }
        }
    }
    isLimit({ x, y }) {
        const limit = {
            x: 0,
            y: 0
        };
        switch (x) {
            case 0:
                limit.x = -1;
                break;
            case this.dim - 1:
                limit.x = 1;
                break;
            default:
                limit.x = 0;
                break;
        }
        switch (y) {
            case 0:
                limit.y = -1;
                break;
            case this.dim - 1:
                limit.y = 1;
                break;
            default:
                limit.y = 0;
                break;
        }
        return limit;
    }
    getNeighbours(cell) {
        const limit = this.isLimit(cell);
        let aliveNeighbours = 0;
        let xStart = cell.x - 1;
        let xEnd = cell.x + 1;
        let yStart = cell.y - 1;
        let yEnd = cell.y + 1;
        if (limit.x < 0) {
            xStart++;
        }
        else if (limit.x > 0) {
            xEnd--;
        }
        if (limit.y < 0) {
            yStart++;
        }
        else if (limit.y > 0) {
            yEnd--;
        }
        for (let xi = xStart; xi <= xEnd; xi++) {
            for (let yi = yStart; yi <= yEnd; yi++) {
                if (this.grid[xi][yi]) {
                    aliveNeighbours++;
                }
            }
        }
        return aliveNeighbours;
    }
    elapsedTime() {
        if (this.startTime) {
            console.log((Date.now() - this.startTime) / 1000);
        }
        this.startTime = Date.now();
    }
    nextCicle() {
        this.elapsedTime();
        const nextGrid = [];
        this.resetEvents();
        for (let x = 0; x < this.dim; x++) {
            nextGrid[x] = [];
            for (let y = 0; y < this.dim; y++) {
                nextGrid[x][y] = this.checkStatus({ x, y });
            }
        }
        this.grid = nextGrid;
        this.ciclos++;
    }
    playStop() {
        if (this.cicle) {
            clearInterval(this.cicle);
            this.cicle = null;
            this.action = 'Play';
        }
        else {
            this.cicle = setInterval(() => {
                this.nextCicle();
            }, this.cicleTime);
            this.action = 'Stop';
        }
    }
}
Array2dComponent.ɵfac = function Array2dComponent_Factory(t) { return new (t || Array2dComponent)(); };
Array2dComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Array2dComponent, selectors: [["app-array2d"]], decls: 16, vars: 7, consts: [[4, "ngFor", "ngForOf"], [1, "info"], [1, "btn", 3, "click"], [1, "col"], [4, "ngIf", "ngIfElse"], ["elseTemplate", ""], [1, "cell", "alive"], [1, "cell", "dead"]], template: function Array2dComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, Array2dComponent_ng_container_0_Template, 3, 1, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function Array2dComponent_Template_button_click_12_listener() { return ctx.playStop(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function Array2dComponent_Template_button_click_14_listener() { return ctx.resetAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.grid);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("N\u00BA de ciclos: ", ctx.ciclos, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Nacimientos: ", ctx.events.nacimientos, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Muertes: ", ctx.events.muertes, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Siguen vivas: ", ctx.events.aunVivas, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Siguen muertas: ", ctx.events.aunMuertas, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.action);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"]], styles: [".cell[_ngcontent-%COMP%] {\r\n    height: 3px;\r\n    width: 3px;\r\n    margin: 0 0 0 0;\r\n    padding: 0 0 0 0;\r\n    border: 1px solid blue;\r\n}\r\n\r\n.col[_ngcontent-%COMP%] {\r\n    height: 3px;\r\n    background-color: cadetblue;\r\n    border: 1px solid blue;\r\n    display: inline-table;\r\n    margin: 0 0 0 0;\r\n    padding: 0 0 0 0;\r\n}\r\n\r\n.alive[_ngcontent-%COMP%] {\r\n    background-color: green;\r\n}\r\n\r\n.dead[_ngcontent-%COMP%] {\r\n    background-color: blue;\r\n}\r\n\r\n.btn[_ngcontent-%COMP%] {\r\n    float: right;\r\n}\r\n\r\n.info[_ngcontent-%COMP%] {\r\n    float: right;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFycmF5MmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxVQUFVO0lBQ1YsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsMkJBQTJCO0lBQzNCLHNCQUFzQjtJQUN0QixxQkFBcUI7SUFDckIsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCIiwiZmlsZSI6ImFycmF5MmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jZWxsIHtcclxuICAgIGhlaWdodDogM3B4O1xyXG4gICAgd2lkdGg6IDNweDtcclxuICAgIG1hcmdpbjogMCAwIDAgMDtcclxuICAgIHBhZGRpbmc6IDAgMCAwIDA7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibHVlO1xyXG59XHJcblxyXG4uY29sIHtcclxuICAgIGhlaWdodDogM3B4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY2FkZXRibHVlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmx1ZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS10YWJsZTtcclxuICAgIG1hcmdpbjogMCAwIDAgMDtcclxuICAgIHBhZGRpbmc6IDAgMCAwIDA7XHJcbn1cclxuXHJcbi5hbGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcclxufVxyXG5cclxuLmRlYWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcclxufVxyXG5cclxuLmJ0biB7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuXHJcbi5pbmZvIHtcclxuICAgIGZsb2F0OiByaWdodDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game/game.component */ "jBAD");


class AppComponent {
    constructor() {
        this.title = 'game-of-life';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-game");
    } }, directives: [_game_game_component__WEBPACK_IMPORTED_MODULE_1__["GameComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _array2d_array2d_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array2d/array2d.component */ "J4Xa");
/* harmony import */ var _hash_hash_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hash/hash.component */ "H1jD");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game/game.component */ "jBAD");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"],
        _array2d_array2d_component__WEBPACK_IMPORTED_MODULE_2__["Array2dComponent"],
        _hash_hash_component__WEBPACK_IMPORTED_MODULE_3__["HashComponent"],
        _game_game_component__WEBPACK_IMPORTED_MODULE_4__["GameComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();


/***/ }),

/***/ "jBAD":
/*!****************************************!*\
  !*** ./src/app/game/game.component.ts ***!
  \****************************************/
/*! exports provided: GameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return GameComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");


function GameComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameComponent_div_0_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const y_r5 = ctx.index; const x_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.toogleCell(x_r2 + "-" + y_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const y_r5 = ctx.index;
    const x_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", x_r2 + "-" + y_r5);
} }
function GameComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GameComponent_div_0_div_1_Template, 1, 1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.dimArray);
} }
class GameComponent {
    constructor() { }
    ngOnInit() {
        this.init();
        this.listenMoves();
    }
    init() {
        this.cicleTime = 50;
        this.ciclos = 0;
        this.dim = 50;
        this.characterState = false;
        this.character = {
            pos: {
                x: this.dim / 2,
                y: this.dim / 2,
            },
            prevPos: {
                x: this.dim / 2,
                y: this.dim / 2,
            },
            dir: {
                x: null,
                y: null
            }
        };
        this.keysPressed = [];
        this.action = 'Play';
        this.resetEvents();
        this.initGrid();
        this.dimArray = [];
        for (let n = 0; n < this.dim; n++) {
            this.dimArray[n] = null;
        }
        if (this.cicle) {
            clearInterval(this.cicle);
        }
        this.cicle = null;
    }
    ngAfterViewChecked() {
        this.renderFullGrid();
    }
    resetEvents() {
        this.events = {
            muertes: 0,
            nacimientos: 0,
            aunMuertas: 0,
            aunVivas: 0
        };
    }
    initGrid() {
        this.grid = [];
        this.gridKeys = [];
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                const key = x + '-' + y;
                this.gridKeys.push(key);
                if (this.isCharPosition(key)) {
                    this.grid[key] = this.characterState;
                }
                else {
                    this.grid[key] = Boolean(Math.random() < 0.5);
                }
            }
        }
    }
    resetGrid() {
        this.initGrid();
        this.renderFullGrid();
    }
    renderFullGrid() {
        this.gridKeys.forEach(k => {
            if (this.isCharPosition(k)) {
                if (this.characterState) {
                    document.getElementById(k).classList.add('alive-character');
                }
                else {
                    document.getElementById(k).classList.add('dead-character');
                }
            }
            if (this.grid[k]) {
                document.getElementById(k).classList.add('alive');
            }
            else {
                document.getElementById(k).classList.remove('alive');
            }
        });
    }
    resetAll() {
        this.cicleTime = 0;
        this.ciclos = 0;
        this.action = 'Play';
        this.resetEvents();
        this.resetGrid();
        for (let n = 0; n < this.dim; n++) {
            this.dimArray[n] = null;
        }
        if (this.cicle) {
            clearInterval(this.cicle);
        }
        this.cicle = null;
    }
    checkStatus({ x, y }) {
        if (this.isCharPosition(`${x}-${y}`)) {
            return this.characterState;
        }
        const aliveNeighbours = this.getNeighbours({ x, y });
        if (this.grid[`${x}-${y}`]) {
            // esta viva
            if (aliveNeighbours === 2 || aliveNeighbours === 3) {
                // sigue viva
                this.events.aunVivas++;
                return true;
            }
            else {
                // muere
                this.events.muertes++;
                return false;
            }
        }
        else {
            // esta muerta
            if (aliveNeighbours === 3) {
                // nace
                this.events.nacimientos++;
                return true;
            }
            else {
                // sigue muerta
                this.events.aunMuertas++;
                return false;
            }
        }
    }
    isLimit({ x, y }) {
        const limit = {
            x: 0,
            y: 0
        };
        switch (x) {
            case 0:
                limit.x = -1;
                break;
            case this.dim - 1:
                limit.x = 1;
                break;
            default:
                limit.x = 0;
                break;
        }
        switch (y) {
            case 0:
                limit.y = -1;
                break;
            case this.dim - 1:
                limit.y = 1;
                break;
            default:
                limit.y = 0;
                break;
        }
        return limit;
    }
    getNeighbours(cell) {
        const limit = this.isLimit(cell);
        let aliveNeighbours = 0;
        let xStart = cell.x - 1;
        let xEnd = cell.x + 1;
        let yStart = cell.y - 1;
        let yEnd = cell.y + 1;
        if (limit.x < 0) {
            xStart++;
        }
        else if (limit.x > 0) {
            xEnd--;
        }
        if (limit.y < 0) {
            yStart++;
        }
        else if (limit.y > 0) {
            yEnd--;
        }
        for (let xi = xStart; xi <= xEnd; xi++) {
            for (let yi = yStart; yi <= yEnd; yi++) {
                if (this.grid[`${xi}-${yi}`]) {
                    aliveNeighbours++;
                }
            }
        }
        if (this.grid[`${cell.x}-${cell.y}`]) {
            aliveNeighbours--;
        }
        return aliveNeighbours;
    }
    render(nextGrid) {
        this.gridKeys.forEach(k => {
            if (this.isCharPosition(k)) {
                if (this.characterState) {
                    document.getElementById(k).classList.add('alive-character');
                }
                else {
                    document.getElementById(k).classList.add('dead-character');
                }
            }
            if (this.grid[k] !== nextGrid[k]) {
                this.grid[k] = nextGrid[k];
                document.getElementById(k).classList.toggle('alive');
            }
        });
    }
    elapsedTime() {
        if (this.startTime) {
            this.elapsed = ((Date.now() - this.startTime) / 1000);
        }
        this.startTime = Date.now();
    }
    nextCicle() {
        this.elapsedTime();
        const nextGrid = [];
        this.characterState = !this.characterState;
        this.moveCharacter();
        this.resetEvents();
        this.gridKeys.forEach(k => {
            nextGrid[k] = this.checkStatus(this.decodeKey(k));
        });
        this.redrawChar();
        this.render(nextGrid);
        this.ciclos++;
    }
    playStop() {
        if (this.cicle) {
            clearInterval(this.cicle);
            this.cicle = null;
            this.action = 'Play';
        }
        else {
            this.cicle = setInterval(() => {
                this.nextCicle();
            }, this.cicleTime);
            this.action = 'Stop';
        }
    }
    toogleCell(key) {
        this.grid[key] = !this.grid[key];
    }
    decodeKey(key) {
        return {
            x: Number(key.split('-')[0]),
            y: Number(key.split('-')[1])
        };
    }
    isCharPosition(key) {
        return this.character.pos.x === this.decodeKey(key).x && this.character.pos.y === this.decodeKey(key).y;
    }
    listenMoves() {
        document.addEventListener('keypress', (e) => {
            this.keysPressed[e.key] = true;
            const keys = ['w', 's', 'a', 'd'];
            keys.forEach(k => {
                if (k !== e.key) {
                    delete this.keysPressed[k];
                }
            });
            /*
            switch (e.key) {
              case 'w': if (this.keysPressed['s']) {delete this.keysPressed['s']; } break;
              case 's': if (this.keysPressed['w']) {delete this.keysPressed['w']; } break;
              case 'a': if (this.keysPressed['d']) {delete this.keysPressed['d']; } break;
              case 'd': if (this.keysPressed['a']) {delete this.keysPressed['a']; } break;
              default: break;
            }
            */
            // this.moveCharacter();
        });
        /*
        document.addEventListener('keyup', (e) => {
          delete this.keysPressed[e.key];
        });
        */
    }
    moveCharacter() {
        const move = this.canMove(this.getMoveDirection(), this.isLimit(this.character.pos));
        if (move.x !== 0 || move.y !== 0) {
            this.character.prevPos = Object.assign({}, this.character.pos);
            this.character.pos.x += move.x;
            this.character.pos.y += move.y;
        }
    }
    canMove(dir, limit) {
        const can = {
            x: 0,
            y: 0
        };
        if (dir.x !== limit.x) {
            can.x = dir.x;
        }
        if (dir.y !== limit.y) {
            can.y = dir.y;
        }
        return can;
    }
    getMoveDirection() {
        const dir = {
            x: 0,
            y: 0
        };
        if (this.keysPressed['w']) {
            dir.y--;
        }
        if (this.keysPressed['s']) {
            dir.y++;
        }
        if (this.keysPressed['a']) {
            dir.x--;
        }
        if (this.keysPressed['d']) {
            dir.x++;
        }
        return dir;
    }
    redrawChar() {
        document.getElementById(`${this.character.prevPos.x}-${this.character.prevPos.y}`).classList.remove('alive-character');
        document.getElementById(`${this.character.prevPos.x}-${this.character.prevPos.y}`).classList.remove('dead-character');
    }
}
GameComponent.ɵfac = function GameComponent_Factory(t) { return new (t || GameComponent)(); };
GameComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameComponent, selectors: [["app-game"]], decls: 18, vars: 8, consts: [["class", "col", 4, "ngFor", "ngForOf"], [1, "info"], [1, "btn", 3, "click"], [1, "col"], ["class", "cell", 3, "id", "click", 4, "ngFor", "ngForOf"], [1, "cell", 3, "id", "click"]], template: function GameComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, GameComponent_div_0_Template, 2, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameComponent_Template_button_click_14_listener() { return ctx.playStop(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameComponent_Template_button_click_16_listener() { return ctx.resetAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dimArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("N\u00BA de ciclos: ", ctx.ciclos, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Tiempo de ciclo (s): ", ctx.elapsed, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Nacimientos: ", ctx.events.nacimientos, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Muertes: ", ctx.events.muertes, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Siguen vivas: ", ctx.events.aunVivas, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Siguen muertas: ", ctx.events.aunMuertas, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.action);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"]], styles: [".cell[_ngcontent-%COMP%] {\r\n    height: 20px;\r\n    width: 20px;\r\n    margin: 0 0 0 0;\r\n    padding: 0 0 0 0;\r\n    border-radius: 50%;\r\n}\r\n\r\n.col[_ngcontent-%COMP%] {\r\n    height: 20px;\r\n    display: inline-table;\r\n    margin: 0 0 0 0;\r\n    padding: 0 0 0 0;\r\n    background-color: cadetblue;\r\n}\r\n\r\n.alive[_ngcontent-%COMP%] {\r\n    background-color: black;\r\n}\r\n\r\n.btn[_ngcontent-%COMP%] {\r\n    float: right;\r\n}\r\n\r\n.info[_ngcontent-%COMP%] {\r\n    float: right;\r\n}\r\n\r\n.alive-character[_ngcontent-%COMP%] {\r\n    background-color: green;\r\n}\r\n\r\n.dead-character[_ngcontent-%COMP%] {\r\n    background-color: red;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekIiLCJmaWxlIjoiZ2FtZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNlbGwge1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICBtYXJnaW46IDAgMCAwIDA7XHJcbiAgICBwYWRkaW5nOiAwIDAgMCAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcblxyXG4uY29sIHtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS10YWJsZTtcclxuICAgIG1hcmdpbjogMCAwIDAgMDtcclxuICAgIHBhZGRpbmc6IDAgMCAwIDA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjYWRldGJsdWU7XHJcbn1cclxuXHJcbi5hbGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmJ0biB7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuXHJcbi5pbmZvIHtcclxuICAgIGZsb2F0OiByaWdodDtcclxufVxyXG5cclxuLmFsaXZlLWNoYXJhY3RlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcclxufVxyXG5cclxuLmRlYWQtY2hhcmFjdGVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcclxufSJdfQ== */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map