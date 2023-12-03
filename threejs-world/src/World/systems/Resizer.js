const setSize = (container, camera, renderer, uniforms) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
};

class Resizer {
  constructor(container, camera, renderer, uniforms) {
    // set initial size
    setSize(container, camera, renderer, uniforms);

    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(container, camera, renderer, uniforms);
      // perform any custom actions
      this.onResize();
    });
  }

  onResize(uniforms, renderer) {}
}

export { Resizer };