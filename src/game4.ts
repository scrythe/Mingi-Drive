export const types = {
  i8: Int8Array,
  u8: Uint8Array,
  i16: Int16Array,
  u16: Uint16Array,
  i32: Int16Array,
  u32: Uint16Array,
};

type ExtractValues<T> = { [K in keyof T]: T[K] }[keyof T];

// type Mutable<T> = { -readonly [K in keyof T]: T[K] };

type Types = ExtractValues<typeof types>;

type Schema = Types | { [type: string]: Types | Schema };

// type Component<T extends Schema> = { id: number } & T;
//
type Component<T extends Schema> = T extends Types
  ? { id: number; value: T }
  : T extends { [type: string]: infer P }
    ? P extends Types
      ? { [K in keyof T]: { id: number; value: T[K] } }
      : P extends Schema
        ? Component<T[K]>
        : unknown
    : unknown;

// function addComponent<T extends Schema>(comp: T): Component<T> {
//   const newComp = comp as unknown as Component<T>;
//   // newComp.id = 12;
//   return newComp;
// }

// const comp = addComponent({ x: types.i8 });

// type Prettify<T> = { [K in keyof T]: T[K] };

// type CompTemp1 = Int8ArrayConstructor;
// type CompTest1 = Component<CompTemp1>;

// type CompTemp2 = { x: Int8ArrayConstructor };
// type CompTest2 = Component<CompTemp2>;

type CompTemp3 = { x: { y: Int8ArrayConstructor } };
type CompTest3 = Component<CompTemp3>;
