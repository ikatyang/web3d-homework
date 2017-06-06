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

const recordCircles = [];
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
  clean();
  $('#records').val('-');
});

/**
 * - p: circleIndex
 * - t: elaspedTime
 * @type {{p: number, t: number}[]}
 */
const records = [];

const recordStatus = {
  playing: false,
  currentTick: 0,
  speed: 1,
  godView: true,
};

$('#speed').change((event) => {
  recordStatus.speed = +event.target.value.slice(0, -1);
});

$('#records').change((event) => {
  const filename = event.target.value;
  clean();
  if (filename !== '-') {
    const username = filename.match(/[0-9]+-(\w+)/)[1];
    $.getJSON('/load', { filename }, (data) => {
      records.push(...data);
      switchAvatar(username);
    });
  }
});

$('#save').click(save);
function save() {
  const username = $('#login').val();
  if (username !== '-') {
    $.post('/save', {
      username,
      data: JSON.stringify(records),
    }, (body) => {
      const data = JSON.parse(body);
      $('#records > option:first-child').after(`<option>${data.filename}</option>`);
      $('#records').prop('selectedIndex', 1);
    });
  }
}

$('#clean').click(clean);
function clean() {
  stop();
  records.splice(0, records.length);
}

$('#pause').click(pause);
function pause() {
  recordStatus.playing = false;
}

$('#play').click(play);
function play() {
  recordStatus.playing = true;
}

$('#stop').click(stop);
function stop() {
  recordStatus.playing = false;
  recordStatus.currentTick = 0;
  const [firstX, firstY] = recordPositions[(records[0] || { p: 0 }).p];
  moveAvatar(firstX, firstY);
}

$('#view').change((event) => {
  recordStatus.godView = (event.target.value === 'god');
});

$('#progress').on('change input', (event) => {
  recordStatus.currentTick = +event.target.value * records[records.length - 1].t;
  refreshAvatar();
});

let isSelected = false;
$(renderer.domElement).mousedown((event) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(
    ((event.clientX / $(renderer.domElement).innerWidth()) * 2) - 1,
    ((event.clientY / $(renderer.domElement).innerHeight()) * -2) + 1,
  );
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(recordCircles);
  isSelected = (intersects.length !== 0);
  if (isSelected) {
    const circleIndex = recordCircles.indexOf(intersects[0].object);
    recordCircles[circleIndex].material.opacity = 0.5;
    records.push({
      p: circleIndex,
      t: Date.now(),
    });
  }
});
$(renderer.domElement).mouseup(() => {
  if (isSelected) {
    const lastTime = (records.length > 1)
      ? records[records.length - 2].t
      : 0;
    const lastIndex = records.length - 1;
    const lastRecord = records[lastIndex];
    lastRecord.t = (lastIndex === 0)
      ? 0
      : (Date.now() - lastRecord.t) + lastTime;
    recordCircles[lastRecord.p].material.opacity = 1;
  }
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
      new THREE.MeshBasicMaterial({
        transparent: true,
        color: Math.floor(Math.random() * 0xffffff),
      }),
    );
    const [x, y] = pos;
    circle.position.set(x, 1, -y).add(delta);
    circle.rotation.x = Math.PI / -2;
    scene.add(circle);
    recordCircles.push(circle);
  });

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
}, { resize: false });

const clock = new THREE.Clock();
animate(() => {
  if (records.length > 0) {
    $('#progress').val(recordStatus.currentTick / records[records.length - 1].t);
  }

  if (recordStatus.godView) {
    controls.update();
  } else {
    camera.position.copy(avatar.localToWorld(new THREE.Vector3(0, 200, -100)));
    camera.lookAt(avatar.position);
  }

  const dt = clock.getDelta() * 1000;
  if (recordStatus.playing && records.length > 1) {
    recordStatus.currentTick = THREE.Math.clamp(
      recordStatus.currentTick + (dt * recordStatus.speed),
      0,
      records[records.length - 1].t,
    );
    refreshAvatar();
    if (recordStatus.currentTick === 0
      || recordStatus.currentTick === records[records.length - 1].t) {
      recordStatus.playing = false;
    }
  }
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
    moveAvatar(x, y);
    scene.add(avatar);
  }
  $('#login').val(name);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {boolean} look
 */
function moveAvatar(x, y, look) {
  const pos = new THREE.Vector3(x, 0, -y).add(delta);
  if (look) {
    avatar.lookAt(pos);
  } else {
    avatar.rotation.set(0, 0, 0);
  }
  avatar.position.copy(pos);
}

function refreshAvatar() {
  let prevRecord;
  let nextRecord;
  for (let i = 0; i < records.length - 1; i += 1) {
    prevRecord = records[i];
    nextRecord = records[i + 1];
    if (recordStatus.currentTick >= prevRecord.t && recordStatus.currentTick <= nextRecord.t) {
      break;
    }
  }
  const ratio = (recordStatus.currentTick - prevRecord.t) / (nextRecord.t - prevRecord.t);
  const [prevX, prevY] = recordPositions[prevRecord.p];
  const [nextX, nextY] = recordPositions[nextRecord.p];
  const x = prevX + (ratio * (nextX - prevX));
  const y = prevY + (ratio * (nextY - prevY));
  moveAvatar(x, y, true);
}
