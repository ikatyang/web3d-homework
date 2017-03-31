import Wall from './Wall'; // eslint-disable-line no-unused-vars

export default class Room extends THREE.Object3D {

  /**
   * @param {number} width
   * @param {number} height
   * @param {number} depth
   * @param {Wall[]} walls
   * @param {number[]} wallPositions
   *
   *               0 (north)
   *            _>____________
   *            |            |
   *  1 (west)  |            |   3 (east)
   *            |            |
   *            |__________<_|
   *               2 (south)
   */
  constructor(width, height, depth, walls, wallPositions) {
    super();

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(width, depth),
      new THREE.MeshPhongMaterial({
        color: new THREE.Color().setRGB(
          Math.random() * 0.2,
          Math.random() * 0.2,
          Math.random() * 0.2,
        ),
      }));
    ground.rotation.x = Math.PI / -2;
    this.add(ground);

    walls.forEach((wall, index) => {
      const wallPosition = wallPositions[index];

      let wallPositionX;
      let wallPositionZ;

      if (typeof wallPosition === 'number') {
        const isNegative = wallPosition < 0 || 1 / wallPosition === -Infinity;

        wallPositionX = isNegative ? width + wallPosition : wallPosition;
        wallPositionZ = isNegative ? depth + wallPosition : wallPosition;
      } else {
        wallPositionX = +wallPosition;
        wallPositionZ = +wallPosition;
      }

      switch (wall.direction) {
        case 'north':
          wall.position
            .set(width / -2, wall.height / 2, depth / -2)
            .add(new THREE.Vector3(wallPositionX, 0, 0));
          if (wall.depthDelta) {
            wall.position.add(new THREE.Vector3(0, 0, wall.depth / -2)
              .multiplyScalar(wall.depthDelta));
          }
          break;
        case 'west':
          wall.position
            .set(width / -2, wall.height / 2, depth / 2)
            .add(new THREE.Vector3(0, 0, -wallPositionZ));
          if (wall.depthDelta) {
            wall.position.add(new THREE.Vector3(wall.depth / -2, 0, 0)
              .multiplyScalar(wall.depthDelta));
          }
          break;
        case 'south':
          wall.position
            .set(width / 2, wall.height / 2, depth / 2)
            .add(new THREE.Vector3(-wallPositionX, 0, 0));
          if (wall.depthDelta) {
            wall.position.add(new THREE.Vector3(0, 0, wall.depth / 2)
              .multiplyScalar(wall.depthDelta));
          }
          break;
        case 'east':
          wall.position
            .set(width / 2, wall.height / 2, depth / -2)
            .add(new THREE.Vector3(0, 0, wallPositionZ));
          if (wall.depthDelta) {
            wall.position.add(new THREE.Vector3(wall.depth / 2, 0, 0)
              .multiplyScalar(wall.depthDelta));
          }
          break;
        default:
          throw new Error(`Unexpected direction: ${wall.direction}`);
      }
      this.add(wall);
    });

    this.width = width;
    this.height = height;
    this.depth = depth;
    this.walls = walls;
    this.ground = ground;
  }

}
