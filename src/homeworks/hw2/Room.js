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
      new THREE.MeshNormalMaterial());
    ground.rotation.x = Math.PI / -2;
    this.add(ground);

    walls.forEach((wall, index) => {
      const wallPosition = wallPositions[index];
      const isNegative = wallPosition < 0 || 1 / wallPosition === -Infinity;

      const wallPositionX = isNegative ? width + wallPosition : wallPosition;
      const wallPositionZ = isNegative ? depth + wallPosition : wallPosition;

      switch (wall.direction) {
        case 'north':
          wall.position
            .set(width / -2, wall.height / 2, depth / -2)
            .add(new THREE.Vector3(wallPositionX, 0, 0));
          break;
        case 'west':
          wall.position
            .set(width / -2, wall.height / 2, depth / 2)
            .add(new THREE.Vector3(0, 0, -wallPositionZ));
          break;
        case 'south':
          wall.position
            .set(width / 2, wall.height / 2, depth / 2)
            .add(new THREE.Vector3(-wallPositionX, 0, 0));
          break;
        case 'east':
          wall.position
            .set(width / 2, wall.height / 2, depth / -2)
            .add(new THREE.Vector3(0, 0, wallPositionZ));
          break;
        default:
          break;
      }
      this.add(wall);
    });

    this.width = width;
    this.height = height;
    this.depth = depth;
    this.walls = walls;
  }

}
