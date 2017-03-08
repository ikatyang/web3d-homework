import { scene, camera, controls, init, animate } from '../../templates/three3D';

init(() => {
  camera.position.set(0, 200, 200);
  const gridXZ = new THREE.GridHelper(200, 20, 0xff0000, 0xffffff);
  scene.add(gridXZ);
});

animate(() => {
  controls.update();
});
