import { camera, scene, init, animate } from '../../templates/three3D';
import House from './House';
import roomConfigs from './rooms';

const gcontrols = {
  speed: 80,
  blockedHeight: 10,
};

const clickDistance = 80;
const collisionDistance = 10;

const origin = new THREE.Vector3(0, 40, 300);

const clock = new THREE.Clock();
const pointerRaycaster = new THREE.Raycaster(
  undefined, undefined, undefined, clickDistance);
const collisionRaycaster = new THREE.Raycaster(
  undefined, undefined, undefined, collisionDistance);

const gui = new dat.GUI();
gui.close();
gui.add(gcontrols, 'speed', 0, 200);
gui.add(gcontrols, 'blockedHeight', 0, 80);
gui.add(pointerRaycaster, 'far', 0, 200).name('clickDistance');
gui.add(collisionRaycaster, 'far', 0, 50).name('collisionDistance');

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
    if (intersects && intersects.length > 0) {
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

    const direction = new THREE.Vector3();
    if (pressed.w) {
      direction.z -= 1;
    }
    if (pressed.a) {
      direction.x -= 1;
    }
    if (pressed.s) {
      direction.z += 1;
    }
    if (pressed.d) {
      direction.x += 1;
    }
    direction.normalize();

    let blocked = false;

    const collisionOrigin = pointerLockObject.position.clone().setY(gcontrols.blockedHeight);
    const collisionDirection = pointerLockObject.localToWorld(direction.clone())
      .sub(pointerLockObject.localToWorld(new THREE.Vector3()))
      .normalize();
    collisionRaycaster.set(collisionOrigin, collisionDirection);
    if (collisionRaycaster.intersectObjects(house.borders).length > 0) {
      blocked = true;
    }

    if (!blocked) {
      pointerLockObject.translateOnAxis(direction, gcontrols.speed * delta);
    }

    if (mouseEvent) {
      pointerRaycaster.setFromCamera(new THREE.Vector2(
        ((mouseEvent.clientX / window.innerWidth) * 2) - 1,
        ((mouseEvent.clientY / window.innerHeight) * -2) + 1,
      ), camera);

      intersects = pointerRaycaster.intersectObjects(house.borders);

      if (intersects.length > 0 && house.doors.indexOf(intersects[0].object) === -1) {
        intersects = [];
      }
    }

    const isPointed = (intersects.length > 0);
    document.getElementById('pointer').style.opacity = isPointed ? '1' : '0';
    document.getElementById('blocked').style.opacity = blocked && !isPointed ? '1' : '0';
  }
});
