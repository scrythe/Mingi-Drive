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

const Vector2 = { x: Types.f32, y: Types.f32 };
const Position = defineComponent(Vector2);
const Velocity = defineComponent(Vector2);

const movementQuery = defineQuery([Position, Velocity]);

const movementSystem = (world: IWorld) => {
  const ents = movementQuery(world);
  for (let i = 0; i < ents.length; i++) {
    const eid = ents[i];
    Position.x[eid] += Velocity.x[eid];
    Position.y[eid] += Velocity.y[eid];
  }
  return world;
};

const pipeline = pipe(movementSystem);

const world = createWorld();

const eid = addEntity(world);
addComponent(world, Position, eid);
addComponent(world, Velocity, eid);
Velocity.x[eid] = 1.23;
Velocity.y[eid] = 1.23;

function render(ctx: CanvasRenderingContext2D, width:number, height:number) {
  const entityQuery = defineQuery([Position]);
  const ents = entityQuery(world);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "red";
  for (let i = 0; i < ents.length; i++) {
    const eid = ents[0];
    ctx.fillRect(Position.x[eid], Position.y[eid], 20, 20);
    Position.x;
  }
}

export const startGame = (ctx: CanvasRenderingContext2D, width:number, height:number) => {
  let last = performance.now();
  const delta = 1000 / 60;
  let accumulator = 0;

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
      pipeline(world);
      accumulator -= delta;
    }
    render(ctx, width, height);
    requestAnimationFrame(loop);
  };
  loop(last);
};
