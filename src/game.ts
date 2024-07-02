import "./style.css";
import * as THREE from "three";

type QueryFunction = (query: string) => void;

class App {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  systems: QueryFunction[];

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
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(() => this.update());
    document.body.appendChild(this.renderer.domElement);
  }

  update() {
    for (const system of this.systems) {
      system("hm");
    }
    this.renderer.render(this.scene, this.camera);
  }

  addSystem(system: QueryFunction) {
    this.systems.push(system);
  }
}

function main() {
  const app = new App();
  app.addSystem((hm: string) => console.log(hm));
}

main();
