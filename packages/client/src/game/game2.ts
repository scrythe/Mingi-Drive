import {
  createWorld,
  Types,
  defineComponent,
  defineQuery,
  addEntity,
  addComponent,
  pipe,
  IWorld,
} from "bitecs";
import InputHandler from "./orientation";

const world = createWorld();

export const startGame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  const inputHandler = new InputHandler();

  let last = performance.now();
  const delta = 1000 / 60;
  let accumulator = 0;

  const pipeline = pipe(movementSystem(inputHandler));
  addCarEntity(world)

  const loop = (timestamp: number) => {
    const dt = timestamp - last;
    last = timestamp;
    if (dt > 1000) {
      // skip large dt's
      return;
    }
    accumulator += dt;
    //Physics code executed at "constant" rate
    while (accumulator >= delta) {
      pipeline(world)
      accumulator -= delta;
    }
    render(ctx, width, height);
    requestAnimationFrame(loop);
  };
  loop(last);
};

const Car = defineComponent({ x: Types.f32, y: Types.f32, angle: Types.f32 });

const movementQuery = defineQuery([Car]);

const movementSystem = (inputHandler: InputHandler) => {
  return (world: IWorld) => {
    const ents = movementQuery(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      Car.angle[eid] = inputHandler.eulerAngles[0];
      console.log(Car.angle[eid])
    }
    return world;
  };
};

function addCarEntity(world: IWorld) {
  const eid = addEntity(world);
  addComponent(world, Car, eid);
  Car.x[eid] = 50;
  Car.y[eid] = 50;
  Car.angle[eid] = 50;
}

function rotateAndDraw(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  width: number,
  height: number,
) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  const radian = (angle * Math.PI) / 180;
  ctx.rotate(radian);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.restore();
}

function render(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const entityQuery = defineQuery([Car]);
  const ents = entityQuery(world);
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < ents.length; i++) {
    const eid = ents[0];
    ctx.fillStyle = "green";
    rotateAndDraw(ctx, Car.x[eid], Car.y[eid], -Car.angle[eid], 100, 100);
  }
}
