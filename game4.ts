const components: any[] = [];

let compId = 0;

const Types = {
  i8: Int8Array,
  u8: Uint8Array,
  i16: Int16Array,
  u16: Uint16Array,
  i32: Int16Array,
  u32: Uint16Array,
};

type ExtractValues<T> = T[keyof T];

// type Mutable<T> = { readonly [K in keyof T]: T[K] };

// type Prettify<T> = { [K in keyof T]: T[K] };

type Type = ExtractValues<typeof Types>;

type ObjectType = { [type: string]: Type };

type Component<T extends Schema> = T extends Type
  ? InstanceType<T>
  : { [K in keyof T]: T[K] extends Schema ? Component<T[K]> : never };

type Schema = Type | ObjectType;

function addComponent<T extends Schema>(
  component: T,
  length: number,
): Component<T> {
  if (Object.getPrototypeOf(component).name) {
    // @ts-ignore
    component.id = compId++;
    components.push(component);
    // @ts-ignore
    return component;
  }
  for (const key in component) {
    // @ts-ignore
    component[key] = new component[key](length);
    // @ts-ignore
    component[key].id = compId++;
    components.push(component[key]);
  }
  // @ts-ignore
  return component;
}

addComponent({ x: Types.i8, y: Types.i8 }, 10);
addComponent(Types.i8, 5);

console.log(components);
