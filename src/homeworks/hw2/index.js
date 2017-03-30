import { camera, scene, init, animate, controls } from '../../templates/three3D';
import House from './House';
import roomConfigs from './rooms';

const raycaster = new THREE.Raycaster();

init(() => {
  camera.position.set(0, 800, 600);

  const gridHelper = new THREE.GridHelper(450, 45, 0xffffff, 0xffffff);
  gridHelper.position.y = 0.1;
  scene.add(gridHelper);

  const house = new House(roomConfigs);
  scene.add(house);

  window.addEventListener('mousedown', (event) => {
    raycaster.setFromCamera(new THREE.Vector2(
      ((event.clientX / window.innerWidth) * 2) - 1,
      ((event.clientY / window.innerHeight) * -2) + 1,
    ), camera);
    const intersects = raycaster.intersectObjects(house.doors);
    if (intersects.length > 0) {
      intersects[0].object.axis.toggle();
    }
  }, false);
});

animate(() => {
  controls.update();
});
