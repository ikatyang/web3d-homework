import Door from './Door'; // eslint-disable-line no-unused-vars

const singleDepth = 5;
const directions = ['north', 'west', 'south', 'east'];

const blackMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
const transparentMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });

const allSides = ['l', 'r', 'u', 'd', 'b', 'f'];
const createMultiMaterial = (sides) => {
  const materials = [];
  const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(
      Math.random() * 0.3,
      Math.random() * 0.3,
      Math.random() * 0.3,
    ),
  });
  allSides.forEach((side) => {
    if (side === 'u' || side === 'd') {
      materials.push(blackMaterial);
    } else {
      materials.push(sides.indexOf(side) === -1
        ? transparentMaterial
        : material);
    }
  });
  return new THREE.MultiMaterial(materials);
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
   * @param {string} sides
   *    'u' = up
   *    'd' = down
   *    'l' = left
   *    'r' = right
   *    'f' = front
   *    'b' = back
   * @param {number} bottom
   * @param {number} depthCount
   * @param {number} depthDelta
   * @param {Door} door
   * @param {number} doorPosition
   * @param {number} doorDepthDelta
   * @param {boolean} holdDoor
   */
  constructor(width, height, direction, sides, bottom,
    depthCount, depthDelta, door, doorPosition, doorDepthDelta, holdDoor) {
    super();

    const wallSides = {
      all: sides.all || sides,
      top: sides.top || '',
      left: sides.left || '',
      right: sides.right || '',
    };

    wallSides.top += wallSides.all;
    wallSides.left += wallSides.all;
    wallSides.right += wallSides.all;

    const depth = singleDepth * depthCount;

    const container = new THREE.Object3D();
    container.rotation.y = directions.indexOf(direction) * (Math.PI / 2);
    this.add(container);

    if (!door) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        createMultiMaterial(wallSides.all));
      mesh.position.y = bottom;
      container.add(mesh);
    } else {
      const isNegative = (doorPosition < 0 || 1 / doorPosition === -Infinity);

      if (height > 0) {
        const doorDeltaX = (door.width / -2) + (isNegative
          ? (width + doorPosition) - (singleDepth * 2)
          : doorPosition + (singleDepth * 2));
        const partitions = {
          top: [0, door.height, width, height - door.height],
          left: [0, 0, doorDeltaX, door.height],
          right: [doorDeltaX + door.width, 0, width - doorDeltaX - door.width, door.height],
        };
        Object.keys(partitions).forEach((partitionName) => {
          const [
            partitionLeft,
            partitionBottom,
            partitionWidth,
            partitionHeight,
          ] = partitions[partitionName];
          if (partitionWidth > 0 && partitionHeight > 0) {
            const mesh = new THREE.Mesh(
              new THREE.BoxGeometry(partitionWidth, partitionHeight, depth),
              createMultiMaterial(wallSides[partitionName]));
            mesh.position.set(
              (width / -2) + (partitionWidth / 2) + partitionLeft,
              (height / -2) + (partitionHeight / 2) + partitionBottom + bottom, 0);
            container.add(mesh);
          }
        });
      }

      if (holdDoor) {
        const doorPositionX = (width / -2) + (isNegative
          ? (width + doorPosition) - (singleDepth * 2)
          : doorPosition + (singleDepth * 2));
        door.position.set(
          doorPositionX, (height / -2) + (door.height / 2), doorDepthDelta * singleDepth);
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
