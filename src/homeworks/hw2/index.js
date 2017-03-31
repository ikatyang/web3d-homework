import { camera as orbitCamera, scene, init, controls as orbitControls, renderer } from '../../templates/three3D';
import House from './House';
import roomConfigs from './rooms';

const gcontrols = {
  speed: 80,
  blockedHeight: 10,
  controls: 'PointerLock',
};

const clickDistance = 80;
const collisionDistance = 10;

const origin = new THREE.Vector3(0, 40, 300);

const clock = new THREE.Clock();
const pointerRaycaster = new THREE.Raycaster(
  undefined, undefined, undefined, clickDistance);
const collisionRaycaster = new THREE.Raycaster(
  undefined, undefined, undefined, collisionDistance);
const groundRaycaster = new THREE.Raycaster(
  undefined, undefined, undefined, 100);

const pointerLockCamera = orbitCamera.clone();

const minimapSize = 200;
const minimapCamera = new THREE.OrthographicCamera(
  minimapSize / 2, minimapSize / -2, minimapSize / -2, minimapSize / 2);
minimapCamera.rotation.x = Math.PI / -2;

const gui = new dat.GUI();
gui.close();
gui.add(gcontrols, 'speed', 0, 200);
gui.add(gcontrols, 'blockedHeight', 0, 80);
gui.add(pointerRaycaster, 'far', 0, 200).name('clickDistance');
gui.add(collisionRaycaster, 'far', 0, 50).name('collisionDistance');

const onControlsChange = (value) => {
  const blocker = document.getElementById('blocker');
  const icons = document.getElementById('cursor-icons');
  if (value === 'Orbit') {
    document.exitPointerLock();
    blocker.style.display = 'none';
    icons.style.display = 'none';
  } else {
    blocker.style.display = '';
    icons.style.display = '';
  }
};

const controlsController = gui.add(gcontrols, 'controls', ['Orbit', 'PointerLock']).onChange(onControlsChange);

const setViewport = position => () => {
  gcontrols.controls = 'Orbit';
  onControlsChange(gcontrols.controls);
  controlsController.updateDisplay();
  orbitCamera.position.copy(position);
};

const viewports = [
  new THREE.Vector3(0, 300, 600),
  new THREE.Vector3(-300, 300, -300),
  new THREE.Vector3(300, 300, -300),
];
viewports.forEach((viewport, index) => {
  const viewportName = `setViewport${index + 1}`;
  gcontrols[viewportName] = setViewport(viewport);
  gui.add(gcontrols, viewportName);
});

const stats = new Stats();
stats.domElement.id = 'stats';
document.body.appendChild(stats.domElement);

let house;
let intersects = [];
let pointerLockControls;
let mouseEvent;
let isFirst = true;

const pressed = {
  w: false,
  a: false,
  s: false,
  d: false,
};

init(() => {
  orbitCamera.position.set(0, 300, 600);
  scene.add(orbitCamera);

  pointerLockControls = new THREE.PointerLockControls(pointerLockCamera);
  const pointerLockObject = pointerLockControls.getObject();
  pointerLockObject.position.copy(origin);
  scene.add(pointerLockObject);

  const character = new THREE.Mesh(
    new THREE.SphereGeometry(10, 16, 16),
    new THREE.MeshBasicMaterial({ color: 'red' }));
  pointerLockObject.add(character);

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
      isFirst = false;
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

  renderer.autoClear = false;
});

(function animate() {
  stats.update();

  const pointerLockObject = pointerLockControls.getObject();

  renderer.setScissorTest(true);
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);
  renderer.clear();

  const delta = clock.getDelta();
  if (!isFirst && gcontrols.controls === 'PointerLock') {
    if (pointerLockControls.enabled) {
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
        ), pointerLockCamera);

        intersects = pointerRaycaster.intersectObjects(house.borders);

        if (intersects.length > 0 && house.doors.indexOf(intersects[0].object) === -1) {
          intersects = [];
        }
      }

      const isPointed = (intersects.length > 0);
      document.getElementById('pointer').style.opacity = isPointed ? '1' : '0';
      document.getElementById('blocked').style.opacity = blocked && !isPointed ? '1' : '0';
    }
    renderer.render(scene, pointerLockCamera);
  } else {
    orbitControls.update();
    renderer.render(scene, orbitCamera);
  }

  groundRaycaster.set(pointerLockObject.position, new THREE.Vector3(0, -1, 0));
  const intersectGrounds = groundRaycaster.intersectObjects(house.grounds);
  const roomName = (intersectGrounds.length === 0) ? 'outside' :
    intersectGrounds[0].object.roomName;
  const characterPos = pointerLockObject.position;
  document.getElementById('position').innerHTML =
    `(${Math.floor(characterPos.x)}, ${Math.floor(characterPos.z)})`;
  document.getElementById('location').innerHTML =
    roomName[0].toUpperCase() + roomName.slice(1).replace(/[A-Z]/g, x => ` ${x}`);

  minimapCamera.position.copy(pointerLockObject.position).setY(300);

  const direction = pointerLockControls.getDirection(new THREE.Vector3(0, 0, -1));
  minimapCamera.rotation.z = Math.atan2(direction.x, direction.z);

  renderer.setViewport(0, window.innerHeight - minimapSize, minimapSize, minimapSize);
  renderer.setScissor(0, window.innerHeight - minimapSize, minimapSize, minimapSize);
  renderer.setClearColor(0xaa8888);
  renderer.clear();
  renderer.render(scene, minimapCamera);
  renderer.setScissorTest(false);

  requestAnimationFrame(animate);
}());
