import "../css/style.css";

import * as ex from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Map } from "./Level";
import { Data } from './Data';


export class Game extends ex.Engine {
  constructor() {
    super({ displayMode: ex.DisplayMode.FitScreenAndFill, maxFps: 60});
    this.start(ResourceLoader).then(() => this.startGame());
    this.showDebug(true);
    ex.Physics.acc = new ex.vec(0,800);
  }

  startGame() {
    console.log("start the game!");

    let dataClass = new Data()

    const map = new Map(dataClass)
    this.addScene('level1', map)
    this.goToScene('level1')
  }
}

new Game();
