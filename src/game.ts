import "./style.css";
import * as THREE from "three";

type QueryFunction = (query: string) => void;
class Component { }

class Entity {
  components: Map<string, Component>;

  constructor() {
    this.components = new Map();
  }

  addComponent(component: Component) {
    const componentType = component.constructor.name;
    this.components.set(componentType, component);
  }

  getComponent<T extends Component>(componentType: new () => T) {
    return this.components.get(componentType.name) as T | undefined;
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
    this.renderer.setAnimationLoop(() => this.update());
    document.body.appendChild(this.renderer.domElement);
  }

  update() {
    for (const system of this.systems) {
      system("hm");
    }
    for (const entity of this.entities) {
      for (const component of entity.components.values()) {
        console.log(component);
      }
    }
    this.renderer.render(this.scene, this.camera);
  }

  addSystem(system: QueryFunction) {
    this.systems.push(system);
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }
}

class Person { }
class Name { }

function main() {
  const app = new App();
  app.addSystem((hm: string) => console.log(hm));
  const newEntity = new Entity();
  newEntity.addComponent(new Person());
  newEntity.addComponent(new Name());
  app.addEntity(newEntity);
}

main();
