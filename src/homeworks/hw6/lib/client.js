/* eslint-disable
  ,no-use-before-define
*/

import { init, animate, controls, scene, camera, renderer } from '../../../templates/three3D';

function onWindowResize() {
  const width = $('.left').innerWidth();
  camera.aspect = width / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(width, window.innerHeight);
}

const groundSize = new THREE.Vector2(440, 470);
const delta = new THREE.Vector3(groundSize.x / -2, 0, groundSize.y / 2);

const recordPositions = [
  [260, 70],
  [45, 190],
  [170, 150],
  [150, 310],
  [150, 390],
  [320, 280],
  [320, 400],
];

const wallPositions = [
  [[0, 155], [0, 315]],
  [[0, 155], [90, 155]],
  [[90, 155], [90, 0]],
  [[0, 315], [90, 315]],
  [[90, 210], [90, 470]],
  [[90, 0], [360, 0]],
  [[360, 135], [360, 0]],
  [[220, 135], [440, 135]],
  [[440, 470], [440, 135]],
  [[90, 470], [230, 470]],
  [[440, 470], [280, 470]],
  [[230, 470], [230, 415]],
  [[230, 380], [230, 315]],
  [[230, 275], [230, 210]],
  [[90, 210], [230, 210]],
  [[90, 365], [130, 365]],
  [[170, 365], [230, 365]],
];

const avatar = createAvatar();
$('#login').change((event) => {
  const name = event.target.value;
  switchAvatar(name);
});

init(() => {
  $(renderer.domElement).detach().appendTo('.left');

  camera.position.set(0, 300, 450);
  scene.add(camera);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(groundSize.x, groundSize.y),
    new THREE.MeshBasicMaterial({
      transparent: true,
      map: new THREE.TextureLoader().load('resources/images/floorplan.png'),
    }),
  );
  ground.rotation.x = Math.PI / -2;
  scene.add(ground);

  const wallContainer = new THREE.Object3D();
  wallContainer.position.add(delta);
  scene.add(wallContainer);

  wallPositions.forEach((wallInfo) => {
    const [rawP1, rawP2] = wallInfo;
    addWallTo(
      wallContainer,
      new THREE.Vector2().fromArray(rawP1),
      new THREE.Vector2().fromArray(rawP2),
    );
  });

  recordPositions.forEach((pos) => {
    const circle = new THREE.Mesh(
      new THREE.CircleGeometry(15, 32),
      new THREE.MeshBasicMaterial({ color: Math.floor(Math.random() * 0xffffff) }),
    );
    const [x, y] = pos;
    circle.position.set(x, 1, -y).add(delta);
    circle.rotation.x = Math.PI / -2;
    scene.add(circle);
  });

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
}, { resize: false });

animate(() => {
  controls.update();
});

/**
 * @param {THREE.Object3D} obj
 * @param {THREE.Vector2} p1
 * @param {THREE.Vector2} p2
 */
function addWallTo(obj, p1, p2) {
  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(p1.distanceTo(p2), 100),
    new THREE.MeshBasicMaterial({
      color: 0x123456,
      side: THREE.DoubleSide,
      opacity: 0.2,
      transparent: true,
    }),
  );
  wall.rotation.y = (p1.x === p2.x)
    ? Math.PI / 2
    : 0;
  wall.position.set((p1.x + p2.x) / 2, 50, (p1.y + p2.y) / -2);
  obj.add(wall);
}

/**
 * @param {string} name
 */
function createAvatar() {
  const newAvatar = new THREE.Object3D();

  const container = new THREE.Object3D();
  container.rotation.y = Math.PI / -2;
  newAvatar.add(container);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(15, 32, 32),
    new THREE.MeshBasicMaterial(),
  );
  head.position.set(0, 55, 0);
  container.add(head);

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(10, 50, 20),
    new THREE.MeshNormalMaterial(),
  );
  body.position.set(0, 25, 0);
  container.add(body);

  newAvatar.material = head.material;

  return newAvatar;
}

/**
 * @param {string} name
 */
function switchAvatar(name) {
  if (name === '-') {
    scene.remove(avatar);
  } else {
    avatar.material.map = new THREE.TextureLoader().load(`resources/avatars/${name}.png`);
    avatar.rotation.set(0, 0, 0);

    const [x, y] = recordPositions[0];
    avatar.position.set(x, 0, -y).add(delta);
    scene.add(avatar);
  }
}
