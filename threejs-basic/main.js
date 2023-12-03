import * as THREE from 'three';
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'dat.gui';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';


// variables
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// scene
const scene = new THREE.Scene();

// renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true, });
renderer.shadowMap.enabled = true;

const clock = new THREE.Clock();

// camera
const camera = new THREE.PerspectiveCamera(45, 
  sizes.width/sizes.height, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 5;
scene.add(camera);

// GUI
const gui = new GUI();
gui.close();


// orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = false;
controls.enablePan = false; 
controls.enableZoom = true;
/* 
controls.autoRotate = true;
controls.autoRotateSpeed = 10;
controls.minDistance = 5;
controls.maxDistance = 35;
controls.minPolarAngle = Math.PI / 10; 
controls.maxPolarAngle = Math.PI / 2; 
controls.minAzimuthAngle = Math.PI + 0.05; 
controls.maxAzimuthAngle = Math.PI * 2 - 0.05;  
*/


// ambient light
const light = new THREE.DirectionalLight("#ffffff");
light.position.set(0, 10, 5);
light.castShadow = true;
light.intensity = 5;
scene.add(light)


// gltf loader
const url = 'monkey_draco.glb';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
const loader = new GLTFLoader(setLoadManager());
loader.setDRACOLoader(dracoLoader);

let monkey = new THREE.Object3D();
loader.load(url, (gltf) => {
  monkey = gltf.scene.children[0];
  monkey.position.x = 4;
  monkey.castShadow = true;
  scene.add(monkey);
}, undefined, (error) => {
  console.log(error)
});


//objects

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({color: 0xfff});
const cube = new THREE.Mesh(geometry, material);
cube.name = 'cube'
cube.castShadow = true;
scene.add(cube)

const geo = new THREE.PlaneGeometry(100,100);
//const mat = new THREE.MeshStandardMaterial({color: 0xff4400, metalness: 0.0, roughness: 0.6, name: 'orange', side: THREE.DoubleSide});
const mat = new THREE.MeshPhongMaterial({color: 0xfff, side: THREE.DoubleSide});
const plane = new THREE.Mesh(geo, mat);
plane.name = 'plane';
plane.rotation.set(Math.PI/2,0,0);
plane.position.set(3,-3,0);
plane.receiveShadow = true;
scene.add(plane);

// raycaster
const raycaster = new THREE.Raycaster();

function onPointerDown(event) {
  const mouse = new THREE.Vector2();
  mouse.x = ( event.clientX / canvas.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / canvas.clientHeight ) * 2 + 1;    
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  mouse.x = ( x / canvas.clientWidth ) *  2 - 1;
  mouse.y = ( y / canvas.clientHeight) * - 2 + 1
  raycaster.setFromCamera(mouse, camera);
  // Find all intersecting objects
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  if(intersects.length > 0) { 
    //console.log(intersects[0].object) 
    if (intersects[0].object.name === 'Suzanne') {
      console.log('monkey clicked')
    } 
  }
}

// mouse events
renderer.domElement.addEventListener('pointerdown', onPointerDown, false);

// RENDER
let delta;
function render(time) {
  time *= 0.001;
  delta = clock.getDelta();
  
  if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
  }

  cube.rotation.y += delta * THREE.MathUtils.degToRad(15);

  monkey.rotation.y -= delta * THREE.MathUtils.degToRad(15);
  

  renderer.render(scene, camera);  
  
  requestAnimationFrame(render);
}
  
requestAnimationFrame(render);

/* 
//------------------ render on demand--------------------//

render(); 
window.addEventListener('resize', () => {
  render();
}); 

controls.addEventListener('change', () => {
  render()
});

*/


/* ---------------------------------------functions--------------------------------------- */

// resize window
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}


// dat.gui
function addToGui(obj) {
  if(obj==='chair') {
    const folderPos = gui.addFolder("position");
    folderPos.add(chair.position, 'x', -35, -9).onChange(() => {render()});
    folderPos.add(chair.position, 'z', -32, 16).onChange(() => {render()});
    folderPos.open();
    const folderRot = gui.addFolder("rotation");
    folderRot.add(chair.rotation, 'y', -Math.PI * 2, Math.PI * 2).onChange(() => {render()});
    folderRot.open();
  }
}


// fullscreen
function openFullscreen() {
  const elem = document.body
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}


// load manager
function setLoadManager() {
  const manager = new THREE.LoadingManager();

  manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    //console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    
  };

  manager.onLoad = function ( ) {
    //console.log( 'Loading complete!');    
  };

  manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    //console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };

  manager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
  };
  
  return manager;
}