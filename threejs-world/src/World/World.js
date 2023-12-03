import { createCamera } from './environment/camera.js';
import { createCube } from './objects/cube.js';
import { createMonkey } from './objects/monkey.js';
import { createLights } from './environment/lights.js';
import { createScene } from './environment/scene.js';

import { createControls } from './systems/controls.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { LoaderGLTF} from './systems/Loader.js';
import { Vector2, WebGLRenderer } from 'three';
import { setClickObjects } from './systems/ClickManager.js';
import { createPlane } from './objects/plane.js';


let camera;
let controls;
let renderer;
let canvas;
let scene;
let loop;
let loader;
let raycaster;

// uniforms for shader
let uniforms = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: { type: "v2", value: new Vector2() },
  u_mouse: { type: "v2", value: new Vector2() }
};

class World {
  constructor(container) {
    
    // dom canvas
    canvas = document.querySelector('#threejs-canvas');
    
    // renderer
    renderer = new WebGLRenderer({canvas, antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;

    // scene environment
    scene = createScene();
    camera = createCamera();
    const light = createLights();
    scene.add(light);
    //scene.add(light.target)

    // window resize
    const resizer = new Resizer(container, camera, renderer, uniforms);
    
    // animation loop
    loop = new Loop(camera, scene, renderer);

    // orbit controls
    controls = createControls(camera, renderer.domElement);
    loop.updatables.push(controls);

    // gltf loader
    loader = new LoaderGLTF();
    
    // click objects manager
    raycaster = setClickObjects(scene, camera, canvas);

    // primitive objects 
    const cube = createCube(uniforms);
    loop.updatables.push(cube);
    scene.add(cube);

    const plane = createPlane();
    loop.updatables.push(plane);
    scene.add(plane);
    
    
  }

  async init() {

    // imported objects
    const monkey = await createMonkey(loader);

    scene.add(monkey);
    controls.target.copy(monkey.position);     
    loop.updatables.push(monkey);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
