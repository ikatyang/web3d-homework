import Room from './Room';

export default class House extends THREE.Object3D {

  constructor(roomConfigs) {
    super();

    const coords = { x: 1, z: -1 };

    const container = new THREE.Object3D();
    this.add(container);

    const rooms = {};
    const doors = [];
    const borders = [];

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
      container.add(room);
      rooms[roomName] = room;

      room.walls.forEach((wall) => {
        if (wall.door) {
          doors.push(wall.door.mesh);
          borders.push(wall.door.mesh);
        }
        borders.push(...wall.container.children);
      });
    });
    const box = new THREE.Box3().setFromObject(container);
    container.position.sub(box.getCenter().setY(0));

    this.container = container;
    this.rooms = rooms;
    this.doors = doors;
    this.borders = borders;
  }

}
