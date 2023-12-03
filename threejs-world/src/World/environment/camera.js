import { PerspectiveCamera } from 'three';

function createCamera() {
  
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(0, 5, 15);

  return camera;
}

export { createCamera };