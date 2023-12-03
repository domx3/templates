import { AmbientLight, DirectionalLight, PointLight, SpotLight, HemisphereLight } from 'three';

function createLights() {
  
  const light = new DirectionalLight('#fff', 10);
  light.position.set(10, 10, 10);
  light.castShadow = true;
  light.target.position.set(0,0,0);

  /* const light = new PointLight('#fff', 5);
  light.position.set(5, 5, 5);
  light.distance = 0;
  light.decay = 2; 
  light.castShadow = true;  */

/*   const light = new SpotLight('#fff',1);
  light.position.set(10, 10, 10);
  light.distance = 0;
  light.angle = Math.PI / 4;
  light.penumbra = 0;
  light.decay = 2;
  light.castShadow = true; */

  /* const light = new HemisphereLight( 0xffffbb, 0x080820, 1 );
  light.position.set(1, 1, 1);
 */

/*   const light = new AmbientLight('#fff', 10);
  light.position.set(10, 10, 10); */

  return light;
}

export { createLights };
