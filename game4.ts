const components: Component<Schema>[] = []

let compId = 0

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

type ObjectType = { [type: string]: Type }

type Schema = Type | ObjectType;

type Component<T extends Schema> = T extends Type
  ? { id: number; value: T }
  : { [K in keyof T]: T[K] extends Schema ? Component<T[K]> : unknown };


function addComponent<T extends Schema>(comp: T): Component<T> {
  if (Object.getPrototypeOf(comp).name) {
    const newComp = { id: compId++, value: comp } as Component<T>
    components.push(newComp)
    return newComp
  }
  for (const key in comp) {
    const newBla = { id: compId++, value: comp[key] }
    // @ts-ignore
    comp[key] = newBla
    // @ts-ignore
    components.push(comp[key])
  }
  return comp as Component<T>
}

// function getComponent<T extends Component<Schema>>(comp) {
//
// }

addComponent({ x: Types.i8, y: Types.i8 });
addComponent(Types.i8);

console.log(components)


