import { camera, scene, init, animate, controls } from '../../templates/three3D';
import Room from './Room';
import roomConfigs from './rooms';

init(() => {
  camera.position.set(0, 800, 600);

  const gridHelper = new THREE.GridHelper(450, 45, 0xffffff, 0xffffff);
  gridHelper.position.y = 0.1;
  scene.add(gridHelper);

  const house = new THREE.Object3D();
  house.position.set(-225, 0, 225);
  scene.add(house);

  const coords = { x: 1, z: -1 };

  const rooms = {};
  Object.keys(roomConfigs).forEach((roomName) => {
    const roomConfig = roomConfigs[roomName];
    const [width, depth] = roomConfig.size;
    const walls = roomConfig.walls.map(([wall]) => wall);
    const wallPositions = roomConfig.walls.map(([, wallPosition]) => wallPosition);
    const room = new Room(width, roomConfig.height, depth, walls, wallPositions);
    const [nextToRoomX, nextToRoomZ] = roomConfig.nextTo;
    const nextToWidth = (nextToRoomX === null) ? 0 :
      rooms[nextToRoomX].position.x + ((rooms[nextToRoomX].width / 2) * coords.x);
    const nextToDepth = (nextToRoomZ === null) ? 0 :
      rooms[nextToRoomZ].position.z + ((rooms[nextToRoomZ].depth / 2) * coords.z);
    room.position.set(
      nextToWidth + ((width / 2) * coords.x), 0,
      nextToDepth + ((depth / 2) * coords.z));
    house.add(room);
    rooms[roomName] = room;
  });
});

animate(() => {
  controls.update();
});
