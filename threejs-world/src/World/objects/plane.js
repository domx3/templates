import { DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry } from "three"

function createPlane() {
  const geo = new PlaneGeometry(100,100);
  const mat = new MeshStandardMaterial({color: 0xff4400, metalness: 0.0, roughness: 0.6, name: 'orange', side: DoubleSide});
  
  const plane = new Mesh(geo, mat);
  plane.name = 'plane';
  plane.receiveShadow = true;

  plane.rotation.set(Math.PI/2,0,0);
  plane.position.set(3,-2,0);

  return plane
}

export { createPlane }