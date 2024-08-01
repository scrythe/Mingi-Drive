// type Entity = {
//   id: number;
//   componentType: string;
// };

const components: Component<Type>[] = [];
// const entity: Entity[] = [];

let archeId = 0;
const archeTypes: ArcheType[] = [];

type ArcheType = { archeId: number; componentIds: number[] };

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

// type InstanceTypes = InstanceType<Type> & { id: number };

// type InstanceTypess<T extends Type> = T extends new () => infer R
//   ? R & { id: number }
//   : any;

type ObjectType = { [type: string]: Type };

type Component<T extends Schema> = T extends Type
  ? InstanceType<T>
  : { [K in keyof T]: T[K] extends Schema ? Component<T[K]> : never };

type Schema = Type | ObjectType;

function addComponent<T extends Schema>(
  component: T,
  length: number,
): Component<T> {
  if (component.length) {
    // @ts-ignore
    component.id = compId++;
    // @ts-ignore
    components.push(component);
    // @ts-ignore
    return component;
  }
  for (const key in component) {
    // @ts-ignore
    component[key] = new component[key](length);
    // @ts-ignore
    component[key].id = compId++;
    // @ts-ignore
    components.push(component[key]);
  }
  // @ts-ignore
  return component;
}

const pos = addComponent({ x: Types.i8, y: Types.i8 }, 10);
// const strength = addComponent(Types.i8, 5);

function createArcheType(components: Component<Schema>[]) {
  const componentIds: number[] = [];
  // @ts-ignore
  for (const componentKey in components) {
    const component = components[componentKey];
    console.log(components);
    // @ts-ignore
    const id = component.id as number | undefined;
    // console.log(component);
    if (!id) {
      // @ts-ignore
      const result = createArcheType(component);
      // console.log(result);
    }
    componentIds.push(id);
  }
  const archeType = { archeId: archeId++, componentIds };
  archeTypes.push(archeType);
  return archeType;
}

const archeType = createArcheType([pos]);
// console.log(archeType.componentIds);

// function addEntity() {}

// console.log(components);
