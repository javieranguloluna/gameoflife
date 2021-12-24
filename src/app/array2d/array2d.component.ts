import { Component, OnInit } from '@angular/core';

interface Position  { x: number; y: number; }

@Component({
  selector: 'app-array2d',
  templateUrl: './array2d.component.html',
  styleUrls: ['./array2d.component.css']
})
export class Array2dComponent implements OnInit {

  public cicleTime: number;
  public grid: boolean[][];
  public action: string;
  public events: {muertes: number, nacimientos: number, aunMuertas: number, aunVivas: number};
  public ciclos: number;
  private dim: number;
  private cicle: any;

  private startTime: number;

  constructor() {

  }

  ngOnInit(): void {
    this.resetAll();
  }

  resetEvents(): void {
    this.events = {
      muertes: 0,
      nacimientos: 0,
      aunMuertas: 0,
      aunVivas: 0
    };
  }

  resetGrid(): void {
    this.grid = [];
    for (let x = 0; x < this.dim; x++) {
      this.grid[x] = [];
      for (let y = 0; y < this.dim; y++) {
        this.grid[x][y] = Boolean(Math.random() < 0.5);
      }
    }
  }

  resetAll(): void {
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

  checkStatus({x, y}: Position): boolean {
    const aliveNeighbours = this.getNeighbours({x, y});

    if (this.grid[x][y]) {
      // esta viva
      if (aliveNeighbours > 1 && aliveNeighbours < 4) {
        // sigue viva
        this.events.aunVivas++;
        return true;
      } else {
        // muere
        this.events.muertes++;
        return false;
      }
    } else {
      // esta muerta
      if (aliveNeighbours === 3) {
        // nace
        this.events.nacimientos++;
        return true;
      } else {
        // sigue muerta
        this.events.aunMuertas++;
        return false;
      }
    }
  }

  isLimit({x, y}: Position): Position {
    const limit = {
      x: 0,
      y: 0
    };
    switch (x) {
      case 0: limit.x = -1; break;
      case this.dim - 1: limit.x = 1; break;
      default: limit.x = 0; break;
    }
    switch (y) {
      case 0: limit.y = -1; break;
      case this.dim - 1: limit.y = 1; break;
      default: limit.y = 0; break;
    }
    return limit;
  }

  getNeighbours(cell: Position): number {
    const limit = this.isLimit(cell);
    let aliveNeighbours = 0;
    let xStart = cell.x - 1;
    let xEnd = cell.x + 1;
    let yStart = cell.y - 1;
    let yEnd = cell.y + 1;

    if (limit.x < 0) {
      xStart++;
    } else if (limit.x > 0) {
      xEnd--;
    }
    if (limit.y < 0) {
      yStart++;
    } else if (limit.y > 0) {
      yEnd--;
    }

    for (let xi = xStart; xi <= xEnd; xi ++) {
      for (let yi = yStart; yi <= yEnd; yi ++) {
        if (this.grid[xi][yi]) {
          aliveNeighbours++;
        }
      }
    }

    return aliveNeighbours;
  }

  elapsedTime(): void {
    if (this.startTime) {
      console.log((Date.now() - this.startTime) / 1000);
    }
    this.startTime = Date.now();
  }

  nextCicle(): void {
    this.elapsedTime();
    const nextGrid = [];
    this.resetEvents();
    for (let x = 0; x < this.dim; x++) {
      nextGrid[x] = [];
      for (let y = 0; y < this.dim; y++) {
        nextGrid[x][y] = this.checkStatus({x, y});
      }
    }
    this.grid = nextGrid;
    this.ciclos++;
  }

  playStop(): void {
    if (this.cicle) {
      clearInterval(this.cicle);
      this.cicle = null;
      this.action = 'Play';
    } else {
      this.cicle = setInterval(() => {
        this.nextCicle();
      }, this.cicleTime);
      this.action = 'Stop';
    }
  }
}
