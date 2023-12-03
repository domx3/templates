import {
  BoxGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  TextureLoader,
} from 'three';


function createMaterial(uniforms) {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  // load a texture
  const texture = textureLoader.load(
    'x.jpg',
  );

  // create a "standard" material using
  // the texture we just loaded as a color map
  const material1 = new MeshStandardMaterial({
    //map: texture,
    color: '#00FF00'
  });

  // create shader material


  const material = new ShaderMaterial({
  uniforms: uniforms,
  vertexShader: `
    
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader:  `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(vec3(u_mouse.x / u_resolution.x,
    u_mouse.y / u_resolution.y, 
    sin(u_time)), 
    1.0);
  }
  `,
  });

  return material;
}


function createCube(uniforms) {
  
  const geometry = new BoxGeometry(2, 2, 2);
  
  const material = createMaterial(uniforms);
  
  const cube = new Mesh(geometry, material);
  cube.name = 'cube'
  cube.castShadow = true;

  cube.rotation.set(Math.PI/4, 0, Math.PI/4);
  cube.position.set(6,3,0);
  
  // rotate around center
  const cubeGroup = new Group();
  cubeGroup.add(cube);


  document.addEventListener('mousemove', (event) => {
    uniforms.u_mouse.value.set(event.clientX, event.clientY)
    //console.log(uniforms.u_mouse.value.x, uniforms.u_resolution.value.x)
  })

  const radiansPerSecond = MathUtils.degToRad(30);
  cubeGroup.tick = (delta) => {
    // increase the cube's rotation each frame
    cubeGroup.rotation.y += delta * radiansPerSecond;
    //cube.rotation.y = delta * radiansPerSecond
    uniforms.u_time.value += delta;

  };

  cube.click = () => {
    console.log('cube was clicked')
  }

  return cubeGroup;
}


export { createCube };