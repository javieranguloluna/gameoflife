import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';

interface Position  { x: number; y: number; }

@Component({
  selector: 'app-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.css']
})
export class HashComponent implements OnInit, AfterViewChecked {

  public cicleTime: number;
  public gridKeys: Array<string>;
  public grid: Array<boolean>;
  public action: string;
  public events: {muertes: number, nacimientos: number, aunMuertas: number, aunVivas: number};
  public elapsed: number;
  public ciclos: number;
  public dimArray: Array<null>;
  public dim: number;
  private cicle: any;

  private startTime: number;

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
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

  ngAfterViewChecked(): void {
    this.renderFullGrid();
  }

  resetEvents(): void {
    this.events = {
      muertes: 0,
      nacimientos: 0,
      aunMuertas: 0,
      aunVivas: 0
    };
  }
  initGrid(): void {
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
  resetGrid(): void {
    this.initGrid();
    this.renderFullGrid();
  }
  renderFullGrid(): void {
    this.gridKeys.forEach(k => {
      if (this.grid[k]) {
        document.getElementById(k).classList.add('alive');
      } else {
        document.getElementById(k).classList.remove('alive');
      }
    });
  }
  resetAll(): void {
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

  checkStatus({x, y}: Position): boolean {
    const aliveNeighbours = this.getNeighbours({x, y});

    if (this.grid[`${x}-${y}`]) {
      // esta viva
      if (aliveNeighbours === 2 || aliveNeighbours === 3) {
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

  render(nextGrid: any): void {
    this.gridKeys.forEach(k => {
      if (this.grid[k] !== nextGrid[k]) {
        this.grid[k] = nextGrid[k];
        document.getElementById(k).classList.toggle('alive');
      }
    });
  }

  elapsedTime(): void {
    if (this.startTime) {
      this.elapsed = ((Date.now() - this.startTime) / 1000);
    }
    this.startTime = Date.now();
  }

  nextCicle(): void {
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

  toogleCell(key: string): void {
    this.grid[key] = !this.grid[key];
  }

  decodeKey(key: string): Position {
    return {
      x: Number(key.split('-')[0]),
      y: Number(key.split('-')[1])
    };
  }
}
