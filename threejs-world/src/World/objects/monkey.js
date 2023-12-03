import {
  MathUtils, MeshToonMaterial,
} from 'three';


async function createMonkey(loader) {
  
  //const monkey = await loadModel('monkey.gltf');

  let monkey;
  try {
    monkey = await loader.loadModel('monkey_draco.glb');      
  } catch (error) {
    console.error('Error loading Draco model:', error);
  }

  // point model from scene to mesh
  monkey = monkey.children[0];
  monkey.castShadow = true;
  // position  
  monkey.position.set(3,0,0);
  
  // change material
  const newMaterial = new MeshToonMaterial({color: monkey.material.color})
  monkey.material = newMaterial;
  const radiansPerSecond = MathUtils.degToRad(15);
  
  monkey.tick = (delta) => {
    monkey.rotation.z += delta * radiansPerSecond;
    monkey.rotation.x += delta * radiansPerSecond;
    monkey.rotation.y += delta * radiansPerSecond;
  }

  monkey.click = () => {
    //monkey.material.roughness = monkey.material.roughness < 0.5 ? 0.9 : 0.3
    console.log('monkey clicked')
  }

  return monkey;
}

export { createMonkey };