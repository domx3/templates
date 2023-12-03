// show loaded objects tree in console
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}



/*
Loads uncompressed gltf file and returns the 
entire scene as a promise
*/
async function loadModel(url) {

  const loader = new GLTFLoader();

  const [gltf] = await Promise.all([
    loader.loadAsync(url),
  ]);
  
  return gltf.scene;
}


/*
Loads compressed gltf file and returns the 
entire scene as a promise
*/
async function loadModelDraco(url) {

  return new Promise((resolve, reject) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/'); // Set the path to the Draco decoder

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(url, (gltf) => {
      resolve(gltf.scene);
    }, undefined, (error) => {
      reject(error);
    });
  });
}


export { dumpObject, loadModel, loadModelDraco };