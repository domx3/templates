import { Raycaster, Vector2 } from "three";


function setClickObjects(scene, camera, canvas){
    
  const raycaster = new Raycaster();    
    
  window.addEventListener('pointerdown', (event) => {
    const mouse = new Vector2();
    mouse.x = ( event.clientX / canvas.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / canvas.clientHeight ) * 2 + 1;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mouse.x = ( x / canvas.clientWidth ) *  2 - 1;
    mouse.y = ( y / canvas.clientHeight) * - 2 + 1

    console.log(mouse.x, mouse.y)
    raycaster.setFromCamera(mouse, camera);
      
    // Find all intersecting objects
    const intersects = raycaster.intersectObjects(scene.children, true);
      
    if(intersects.length > 0 && intersects[0].object.click) { 
      
      intersects[0].object.click();
    }
  });
  
  return raycaster
}

export { setClickObjects }