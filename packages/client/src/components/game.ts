// import Camera from "./camera";
import InputHandler from "./input";
import { Position } from "./interfaces";

class Game {
  private FPS = 60;
  private ctx: CanvasRenderingContext2D;
  // private camera: Camera;
  private width: number;
  private height: number;
  private pos: Position;
  private inputHandler: InputHandler;

  constructor(
    ctx: CanvasRenderingContext2D,
    gameWidth: number,
    gameHeight: number,
  ) {
    const fpsDuration = 1000 / this.FPS;
    setInterval(() => {
      this.update();
    }, fpsDuration);
    this.width = gameWidth;
    this.height = gameHeight;
    this.ctx = ctx;
    this.pos = { x: 0, y: 0 };
    this.inputHandler = new InputHandler();

    // this.camera = new Camera(gameWidth, gameHeight);
  }

  update() {
    this.movePlayer();
    this.draw();
  }

  movePlayer() {
    this.pos.y += this.inputHandler.gamma/10;
    this.pos.x += this.inputHandler.beta;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillRect(this.pos.x, this.pos.y, 20, 20);
  }
}

export default Game;
