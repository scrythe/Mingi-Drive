export const types = {
  i8: Int8Array,
  u8: Uint8Array,
  i16: Int16Array,
  u16: Uint16Array,
  i32: Int16Array,
  u32: Uint16Array,
};

let currentId = 0;

class ComponentClass {
  static id = 0;
}

class Name extends ComponentClass {
  static value = types.i8;
}

class Position extends ComponentClass {
  static x = types.i8;
  static y = types.i8;
  // static z = "hm";
  // x = 12;
}

function testCompClass(comp: typeof ComponentClass) {
  comp.id = currentId++;
  console.log(comp);
}

testCompClass(Name);
testCompClass(Position);

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type OnlyStaticTypedMapValues<T> =
  NoPrototype<T> extends { [type: string]: Int8ArrayConstructor } ? T : never;

type OnlyTypedMapValues<T extends new () => any> =
  NoId<InstanceType<T>> extends { [type: string]: Int8ArrayConstructor }
    ? T
    : never;

type ComponentValuesMap<T extends new () => any> = OnlyStaticTypedMapValues<T> &
  OnlyTypedMapValues<T>;

type NoPrototype<T> = Omit<T, "prototype">;
type NoId<T> = Omit<T, "id">;

function testss<T extends new () => any>(das: ComponentValuesMap<T>) {
  console.log(das);
}

testss(Position);

type ComponentType = getValueTypes<typeof types>;

type Component = { name: string; type: ComponentType };

type getValueTypes<T> = {
  [K in keyof T]: T[K];
}[keyof T];

export const components: Component[] = [];

export function defineComponent(component: Component) {
  components.push(component);
}
