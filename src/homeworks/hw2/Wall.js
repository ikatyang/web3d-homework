import Door from './Door'; // eslint-disable-line no-unused-vars

const singleDepth = 5;
const directions = ['north', 'west', 'south', 'east'];

const materials = [
  new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), // left
  new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), // right
  new THREE.MeshBasicMaterial({ color: 'black' }), // top
  new THREE.MeshBasicMaterial({ color: 'black' }), // bottom
  new THREE.MeshBasicMaterial({ color: 'black' }), // back
  new THREE.MeshBasicMaterial({ color: 'black' }), // front
];
const createMultiMaterial = () => {
  const customMaterials = materials.slice();
  const material = new THREE.MeshBasicMaterial({ color: Math.floor(Math.random() * 0xffffff) });
  customMaterials[4] = material;
  customMaterials[5] = material;
  return new THREE.MultiMaterial(customMaterials);
};

export default class Wall extends THREE.Object3D {

  static get directions() {
    return directions;
  }

  static get singleDepth() {
    return singleDepth;
  }

  /**
   * @param {number} width
   * @param {number} height
   * @param {'north'|'west'|'south'|'east'} direction
   * @param {number} bottom
   * @param {number} depthCount
   * @param {number} depthDelta
   * @param {Door} door
   * @param {number} doorPosition
   * @param {boolean} holdDoor
   */
  constructor(width, height, direction, bottom,
    depthCount, depthDelta, door, doorPosition, holdDoor) {
    super();

    const depth = singleDepth * depthCount;

    const container = new THREE.Object3D();
    container.rotation.y = directions.indexOf(direction) * (Math.PI / 2);
    this.add(container);

    if (!door) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        createMultiMaterial());
      mesh.position.y = bottom;
      container.add(mesh);
    } else {
      const isNegative = (doorPosition < 0 || 1 / doorPosition === -Infinity);

      if (height > 0) {
        const doorDeltaX = (door.width / -2) + (isNegative
          ? (width + doorPosition) - (singleDepth * 2)
          : doorPosition + (singleDepth * 2));
        const partitions = [
          [0, door.height, width, height - door.height],
          [0, 0, doorDeltaX, door.height],
          [doorDeltaX + door.width, 0, width - doorDeltaX - door.width, door.height],
        ];
        partitions.forEach(([partitionLeft, partitionBottom, partitionWidth, partitionHeight]) => {
          if (partitionWidth > 0 && partitionHeight > 0) {
            const mesh = new THREE.Mesh(
              new THREE.BoxGeometry(partitionWidth, partitionHeight, depth),
              createMultiMaterial());
            mesh.position.set(
              (width / -2) + (partitionWidth / 2) + partitionLeft,
              (height / -2) + (partitionHeight / 2) + partitionBottom + bottom, 0);
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
    this.depth = depth;
    this.depthDelta = depthDelta;

    this.container = container;
    this.door = holdDoor ? door : null;
  }

}
