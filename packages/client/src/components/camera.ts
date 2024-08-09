import { Position, Screen, CameraInterface } from "./interfaces";

class Camera implements CameraInterface {
  private _pos: Position;
  private screen: Screen;

  constructor(gameWidth: number, gameHeight: number) {
    this._pos = {
      x: 0,
      y: 0,
    };
    this.screen = {
      width: gameWidth,
      height: gameHeight,
    };
  }

  watch(target: Position) {
    this._pos.x = target.x - this.screen.width / 2;
    this._pos.y = target.y - this.screen.height / 2;
  }

  get pos() {
    return this._pos;
  }
}

export default Camera;
