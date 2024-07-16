import "./style.css";
import * as THREE from "three";

type QueryFunction = (
  query: string,
  ...componentTypes: (typeof Component)[]
) => void;

class Component { }

type ComponentConstructor = new () => Component;

// type Acessors = object | object[];

// type QueryIterator<A extends Acessors> = A extends any[]
//   ? {
//     [I in keyof A]: A[I];
//   }
//   : A;

type InstanceList<T extends (abstract new (...args: any) => any)[]> = {
  [I in keyof T]: InstanceType<T[I]>;
};

// type hmtest = [typeof Person, typeof Name];
//
// type test2 = InstaceList<hmtest>

// type IteratorItem<T> = I extends Mut<infer X> ? X : Readonly<I>;

// type Iteratored = Iterator<[Person, Name]>

class Entity {
  components: Map<string, Component>;

  constructor() {
    this.components = new Map();
  }

  addComponent(component: Component) {
    const componentType = component.constructor.name;
    this.components.set(componentType, component);
  }

  getComponent<T extends typeof Component>(componentType: T) {
    return this.components.get(componentType.name) as
      | InstanceType<T>
      | undefined;
  }
}

class App {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  systems: QueryFunction[];
  entities: Entity[];

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer();
    this.systems = [];
    this.entities = [];

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setAnimationLoop(() => this.update());
    document.body.appendChild(this.renderer.domElement);
  }

  update() {
    // for (const system of this.systems) {
    //   system("hm");
    // }
    // for (const entity of this.entities) {
    //   for (const component of entity.components.values()) {
    //     console.log(component);
    //   }
    // }
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  addSystem(system: QueryFunction) {
    this.systems.push(system);
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  addObject(cube: THREE.Mesh) {
    this.scene.add(cube);
  }

  query<T extends ComponentConstructor[]>(componentTypes: T) {
    const queryArr: InstanceList<T>[] = [];
    for (const entity of this.entities) {
      const componentArr: InstanceList<T> = [] as InstanceList<T>;
      for (const componentType of componentTypes) {
        const component = entity.getComponent(componentType);
        if (!component) continue;
        componentArr.push(component);
      }
      queryArr.push(componentArr);
    }
    return queryArr;
  }
}

class Person {
  test = "hm";
}

class Name {
  hmm = "wow";
}

function main() {
  const app = new App();
  app.addSystem(() => {
    const list = app.query([Person, Name]);
    console.log(list);
  });
  (() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    app.addObject(cube);
  })();
  const newEntity = new Entity();
  newEntity.addComponent(new Person());
  newEntity.addComponent(new Name());
  app.addEntity(newEntity);
  // gameLoop(app.update, app.render);
}

// function gameLoop(integrate: Function, render: Function) {
//   let prevTime = performance.now();
//   const fps = 60;
//   const dt = 1000 / fps;
//   let accumulater = 0;
//   const update = (currentTime: number) => {
//     const frameTime = currentTime - prevTime;
//     prevTime = currentTime;
//     accumulater += frameTime;
//     while (accumulater >= dt) {
//       integrate();
//       accumulater -= dt;
//     }
//     render();
//     requestAnimationFrame(update);
//   };
//   requestAnimationFrame(update);
// }

main();
