import Door from './Door'; // eslint-disable-line no-unused-vars

const directions = ['north', 'west', 'south', 'east'];

export default class Wall extends THREE.Object3D {

  static get directions() {
    return directions;
  }

  /**
   * @param {number} width
   * @param {number} height
   * @param {'north'|'west'|'south'|'east'} direction
   * @param {THREE.Side} side
   * @param {Door} door
   * @param {number} doorPosition
   * @param {boolean} holdDoor
   */
  constructor(width, height, direction, side, door, doorPosition, holdDoor) {
    super();

    const container = new THREE.Object3D();
    container.rotation.y = directions.indexOf(direction) * (Math.PI / 2);
    this.add(container);

    if (!door) {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({ side, color: Math.floor(Math.random() * 0xffffff) }));
      container.add(mesh);
    } else {
      const isNegative = (doorPosition < 0 || 1 / doorPosition === -Infinity);

      if (height > 0) {
        const doorDeltaX = (door.width / -2) + (isNegative ? width + doorPosition : doorPosition);
        const partitions = [
          [0, door.height, width, height - door.height],
          [0, 0, doorDeltaX, door.height],
          [doorDeltaX + door.width, 0, width - doorDeltaX - door.width, door.height],
        ];
        partitions.forEach(([left, bottom, partitionWidth, partitionHeight]) => {
          if (partitionWidth > 0 && partitionHeight > 0) {
            const mesh = new THREE.Mesh(
              new THREE.PlaneGeometry(partitionWidth, partitionHeight),
              new THREE.MeshBasicMaterial({ side, color: Math.floor(Math.random() * 0xffffff) }));
            mesh.position.set(
              (width / -2) + (partitionWidth / 2) + left,
              (height / -2) + (partitionHeight / 2) + bottom, 0);
            container.add(mesh);
          }
        });
      }

      if (holdDoor) {
        const doorPositionX = (width / -2) + (isNegative ? width + doorPosition : doorPosition);
        door.position.set(doorPositionX, (height / -2) + (door.height / 2), 0);
        container.add(door);
      }
    }

    this.width = width;
    this.height = height;
    this.direction = direction;

    this.container = container;
    this.door = holdDoor ? door : null;
  }

}
