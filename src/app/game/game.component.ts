import { AfterViewChecked, Component, OnInit } from '@angular/core';



interface Position  { x: number; y: number; }
interface Direction  { x: -1 | 0 | 1; y: -1 | 0 | 1; }

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewChecked {

  public cicleTime: number;
  public gridKeys: Array<string>;
  public grid: Array<boolean>;
  public action: string;
  public events: {muertes: number, nacimientos: number, aunMuertas: number, aunVivas: number};
  public elapsed: number;
  public ciclos: number;
  public dimArray: Array<null>;
  public dim: number;

  private lifeMode: boolean;

  private character: {pos: Position, prevPos: Position, dir: Direction };
  private characterState: boolean;
  private keysPressed: Array<boolean>;

  private cicle: any;

  private startTime: number;

  constructor() { }

  ngOnInit(): void {
    this.init();
    this.listenMoves();
  }

  init(): void {
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
        if (this.isCharPosition(key)) {
          this.grid[key] = this.characterState;
        } else {
          this.grid[key] = Boolean(Math.random() < 0.5);
        }
      }
    }
  }
  resetGrid(): void {
    this.initGrid();
    this.renderFullGrid();
  }
  renderFullGrid(): void {
    this.gridKeys.forEach(k => {
      if (this.isCharPosition(k)) {
        if (this.characterState) {
          document.getElementById(k).classList.add('alive-character');
        } else {
          document.getElementById(k).classList.add('dead-character');
        }
      }
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
    if (this.isCharPosition(`${x}-${y}`)) {
      return this.characterState;
    }
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
      if (this.isCharPosition(k)) {
        if (this.characterState) {
          document.getElementById(k).classList.add('alive-character');
        } else {
          document.getElementById(k).classList.add('dead-character');
        }
      }
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
  isCharPosition(key: string): boolean {
    return this.character.pos.x === this.decodeKey(key).x && this.character.pos.y === this.decodeKey(key).y;
  }
  listenMoves(): void {
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
  moveCharacter(): void {
    const move = this.canMove(this.getMoveDirection(), this.isLimit(this.character.pos));
    if (move.x !== 0 || move.y !== 0) {
      this.character.prevPos = {
        ... this.character.pos
      };
      this.character.pos.x += move.x;
      this.character.pos.y += move.y;
      
    }
  }
  canMove(dir: Direction, limit: Position): Direction {
    const can: Direction = {
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
  getMoveDirection(): Direction {
    const dir: Direction = {
      x: 0,
      y: 0
    };
    if (this.keysPressed['w']) { dir.y--; }
    if (this.keysPressed['s']) { dir.y++; }
    if (this.keysPressed['a']) { dir.x--; }
    if (this.keysPressed['d']) { dir.x++; }
    return dir;
  }
  redrawChar(): void {
    document.getElementById(`${this.character.prevPos.x}-${this.character.prevPos.y}`).classList.remove('alive-character');
    document.getElementById(`${this.character.prevPos.x}-${this.character.prevPos.y}`).classList.remove('dead-character');
  }
}
