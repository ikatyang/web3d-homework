import { init, animate, controls, scene, camera, renderer } from '../../templates/three3D';

const groundSize = 100;

let isMouseIn = false;
const mouseMovePos = new THREE.Vector2();
const mouseDownPos = new THREE.Vector2();

const picks = [];

const currentConfig = {};

[
  [50, 100, -50],
  [-30, 80, 10],
].forEach(([x, y, z]) => {
  const light = new THREE.PointLight();
  light.position.set(x, y, z);
  scene.add(light);
});

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(groundSize, groundSize),
  new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }));
ground.rotation.x = Math.PI / -2;
scene.add(ground);

const grid = new THREE.GridHelper(100, 20, 0xff0000, 0xffffff);
scene.add(grid);

const cursor = new THREE.Mesh(undefined,
  new THREE.MeshPhongMaterial({ transparent: true, opacity: 0.5 }));
scene.add(cursor);

/* eslint-disable no-param-reassign */
function initMesh(mesh, { geometry, color, size, rotation }) {
  switch (geometry) {
    case 'Box':
      mesh.geometry = new THREE.BoxGeometry(size, size, size);
      break;
    case 'Sphere':
      mesh.geometry = new THREE.SphereGeometry(size / 2, 16, 16);
      break;
    case 'TorusKnot':
      mesh.geometry = new THREE.TorusKnotGeometry(size / 2, size / 5, 16, 16);
      break;
    default:
      throw new Error(`invalid geometry: ${geometry}`);
  }

  mesh.rotation.y = rotation;
  mesh.material.color.setStyle(color);
}
/* eslint-enable no-param-reassign */

function onFormChange() {
  currentConfig.geometry = document.forms[0].elements.geometry.value;
  currentConfig.color = document.forms[0].elements.color.value;
  currentConfig.size = document.forms[0].elements.size.value;
  currentConfig.rotation = document.forms[0].elements.rotation.value;
  initMesh(cursor, currentConfig);
}

function onMouseMove(event) {
  const raycaster = new THREE.Raycaster();
  mouseMovePos.set(
    ((event.clientX / $(renderer.domElement).innerWidth()) * 2) - 1,
    ((event.clientY / $(renderer.domElement).innerHeight()) * -2) + 1,
  );
  raycaster.setFromCamera(mouseMovePos, camera);
  const intersects = raycaster.intersectObject(ground);
  isMouseIn = (intersects.length !== 0);
  if (isMouseIn) {
    cursor.position.copy(intersects[0].point);
  }
}

function onMouseDown() {
  if (isMouseIn) {
    mouseDownPos.copy(mouseMovePos);
  }
}

function onMouseUp() {
  if (isMouseIn && mouseDownPos.equals(mouseMovePos)) {
    const cloned = cursor.clone(true);
    cloned.material = cloned.material.clone();
    cloned.material.opacity = 1;
    scene.add(cloned);
    picks.push({
      mesh: cloned,
      config: Object.assign({}, currentConfig, { x: cloned.position.x, z: cloned.position.z }),
    });
  }
}

function onWindowResize() {
  const width = $('.left').innerWidth();
  camera.aspect = width / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(width, window.innerHeight);
}

function onClearClick() {
  while (picks.length !== 0) {
    const pick = picks.pop();
    scene.remove(pick.mesh);
  }
}

function onSaveClick() {
  localStorage.setItem('picks', JSON.stringify(picks.map(pick => pick.config)));
}

function onRestoreClick() {
  const storedData = localStorage.getItem('picks');
  if (storedData === null) {
    // eslint-disable-next-line no-alert
    alert('No stored items');
  } else {
    const storedConfigs = JSON.parse(storedData);
    onClearClick();
    picks.splice(0);
    storedConfigs.forEach((storedConfig) => {
      const storedMesh = new THREE.Mesh(undefined, new THREE.MeshPhongMaterial());
      initMesh(storedMesh, storedConfig);
      storedMesh.position.x = storedConfig.x;
      storedMesh.position.z = storedConfig.z;
      picks.push({
        mesh: storedMesh,
        config: storedConfig,
      });
      scene.add(storedMesh);
    });
  }
}

init(() => {
  $(renderer.domElement).detach().appendTo('.left');

  camera.position.set(0, 100, 150);
  scene.add(camera);

  onFormChange();
  onWindowResize();

  $('.clear').click(onClearClick);
  $('.save').click(onSaveClick);
  $('.restore').click(onRestoreClick);
  window.addEventListener('resize', onWindowResize, false);
  document.forms[0].addEventListener('input', onFormChange, false);
  document.forms[0].addEventListener('change', onFormChange, false);
  renderer.domElement.addEventListener('mouseup', onMouseUp, false);
  renderer.domElement.addEventListener('mousedown', onMouseDown, false);
  renderer.domElement.addEventListener('mousemove', onMouseMove, false);
}, { resize: false });

animate(() => {
  controls.update();
});
