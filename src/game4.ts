// export const Types = {
//   i8: "i8",
//   u8: "u8",
//   i16: "i16",
//   u16: "u16",
//   i32: "i32",
//   u32: "u32",
// } as const;

export const Types = {
  i8: Int8Array,
  u8: Uint8Array,
  i16: Int16Array,
  u16: Uint16Array,
  i32: Int16Array,
  u32: Uint16Array,
};

type ExtractValues<T> = { [K in keyof T]: T[K] }[keyof T];

// type Mutable<T> = { -readonly [K in keyof T]: T[K] };

// type Prettify<T> = { [K in keyof T]: T[K] };

type Type = ExtractValues<typeof Types>;

// type TypeMap = {
//   i8: Int8Array; // Constructor?
//   u8: Uint8Array;
//   i16: Int16Array;
//   u16: Uint16Array;
//   i32: Int16Array;
//   u32: Uint16Array;
// };

type Schema = Type | { [type: string]: Type };

type Component<T extends Schema> = T extends Type
  ? { id: number; value: T }
  : { [K in keyof T]: T[K] extends Schema ? Component<T[K]> : unknown };

function isTypedArray(comp: Schema): comp is Type {
  return Object.getPrototypeOf(comp).name == "TypedArray";
}

function addComponent<T extends Schema>(comp: T): Component<T> {
  const newComp = comp as unknown as Component<T>;
  if (isTypedArray(comp)) {
    console.log(comp);
  }
  // if (comp.name) comp is Types {
  // console.log(comp.name);
  // if (comp in Types) { }

  // const newComp={
  //
  // }
  // newComp.id = 12;
  return newComp;
}

const comp = addComponent({ x: Types.i8 });

console.log(comp);
