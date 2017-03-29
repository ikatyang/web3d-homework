import { camera, scene, init, animate, controls } from '../../templates/three3D';
import Room from './Room';
import roomConfigs from './rooms';

init(() => {
  camera.position.set(200, 800, 600);
  const gridHelper = new THREE.GridHelper(450, 45, 0xffffff, 0xffffff);
  gridHelper.position.set(225, 0, -225);
  scene.add(gridHelper);

  Object.keys(roomConfigs).forEach((roomName) => {
    const roomConfig = roomConfigs[roomName];
    const [width, depth] = roomConfig.size;
    const room = new Room(width, roomConfig.height, depth, roomConfig.spaces || []);
    const [nextToWidthRooms, nextToDepthRooms] = roomConfig.nextTo;
    const nextToWidth = nextToWidthRooms.reduce((value, nextToRoomName) =>
      value + roomConfigs[nextToRoomName].size[0], 0);
    const nextToDepth = nextToDepthRooms.reduce((value, nextToRoomName) =>
      value + roomConfigs[nextToRoomName].size[1], 0);
    room.position.set(nextToWidth, 0, nextToDepth).add(new THREE.Vector3(width / 2, 0, depth / 2));
    room.position.multiply(new THREE.Vector3(1, 1, -1));
    scene.add(room);
  });
});

animate(() => {
  controls.update();
});
