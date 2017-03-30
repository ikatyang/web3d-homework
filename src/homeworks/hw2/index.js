import { camera, scene, init, animate } from '../../templates/three3D';
import House from './House';
import roomConfigs from './rooms';

const speed = 80;
const clickDistance = 60;
const origin = new THREE.Vector3(0, 40, -50);

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster(undefined, undefined, undefined, clickDistance);

let house;
let intersects;
let pointerLockControls;
let mouseEvent;

const pressed = {
  w: false,
  a: false,
  s: false,
  d: false,
};

init(() => {
  pointerLockControls = new THREE.PointerLockControls(camera);
  pointerLockControls.getObject().position.copy(origin);
  scene.add(pointerLockControls.getObject());

  const gridHelper = new THREE.GridHelper(450, 45, 0xffffff, 0xffffff);
  gridHelper.position.y = 0.1;
  scene.add(gridHelper);

  house = new House(roomConfigs);
  scene.add(house);

  window.addEventListener('mousemove', (event) => {
    mouseEvent = event;
  }, false);
  window.addEventListener('mousedown', () => {
    if (intersects.length > 0) {
      intersects[0].object.axis.toggle();
    }
  }, false);

  const blocker = document.getElementById('blocker');

  blocker.addEventListener('click', () => {
    document.body.requestPointerLock();
  }, false);

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === document.body) {
      pointerLockControls.enabled = true;
      blocker.style.display = 'none';
    } else {
      pointerLockControls.enabled = false;
      blocker.style.display = '';
    }
  }, false);

  const createKeyEvent = value => (event) => {
    switch (event.key) {
      case 'w':
      case 'W':
      case 'ArrowUp':
        pressed.w = value;
        break;
      case 'a':
      case 'A':
      case 'ArrowLeft':
        pressed.a = value;
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
        pressed.s = value;
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
        pressed.d = value;
        break;
      default:
        // do nothing
        break;
    }
  };

  document.addEventListener('keydown', createKeyEvent(true), false);
  document.addEventListener('keyup', createKeyEvent(false), false);
});

animate(() => {
  const delta = clock.getDelta();
  if (pointerLockControls.enabled) {
    const pointerLockObject = pointerLockControls.getObject();
    if (pressed.w) {
      pointerLockObject.translateZ(-speed * delta);
    }
    if (pressed.a) {
      pointerLockObject.translateX(-speed * delta);
    }
    if (pressed.s) {
      pointerLockObject.translateZ(speed * delta);
    }
    if (pressed.d) {
      pointerLockObject.translateX(speed * delta);
    }
  }
  if (mouseEvent) {
    raycaster.setFromCamera(new THREE.Vector2(
      ((mouseEvent.clientX / window.innerWidth) * 2) - 1,
      ((mouseEvent.clientY / window.innerHeight) * -2) + 1,
    ), camera);
    intersects = raycaster.intersectObjects(house.doors);
  }
});
