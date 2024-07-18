export const types = {
  i8: "hm",
  u8: Uint8Array,
  i16: Int16Array,
  u16: Uint16Array,
  i32: Int16Array,
  u32: Uint16Array,
};

class Component {
  static id = 0;
}

@component
class Position extends Component {
  static x = types.i8;
  static y = types.i8;
  z = types.i8;
}

function component(constructor: typeof Position) {
  constructor.id = 12;
  return constructor;
}

function test(component: typeof Component) {
  console.log(component.id);
}

test(Position);

// const type =Position.prototype.y
