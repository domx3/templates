import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  // damping and auto rotation require
  // the controls to be updated each frame

  controls.enableDamping = true;
  controls.enablePan = true; 
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 10;

controls.minDistance = 0.1;
controls.maxDistance = 100;
/* controls.minPolarAngle = -Math.PI; 
controls.maxPolarAngle = Math.PI; 
controls.minAzimuthAngle = -Math.PI; 
controls.maxAzimuthAngle = Math.PI; */ 

  controls.tick = () => controls.update();

  return controls;
}

export { createControls };
