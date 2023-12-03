import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { setLoadManager } from './loadManager';


class LoaderGLTF {
  constructor() {
    
    const loadManager = setLoadManager();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/'); // Set the path to the Draco decoder

    this.loader = new GLTFLoader(loadManager);
    this.loader.setDRACOLoader(dracoLoader);
  }

  loadModel(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(url, (gltf) => {
        resolve(gltf.scene);
      }, undefined, (error) => {
        reject(error);
      });
    });
  }
}


export { LoaderGLTF };