export default class Room extends THREE.Object3D {

  /**
   * @param {number} width X
   * @param {number} height Y
   * @param {number} depth N
   * @param {any[]} roomSpaces [[wall, [x, width, height]], ...]
   *
   *               0 (north)
   *            _>____________
   *            |            |
   *  1 (west)  |            |   3 (east)
   *            |            |
   *            |__________<_|
   *               2 (south)
   */
  constructor(width, height, depth, roomSpaces) {
    super();
    this.idx2dir = ['north', 'west', 'south', 'east'];
    this.initSpaces(roomSpaces);
    this.initWalls(width, height, depth);
  }

  initSpaces(roomSpaces) {
    this.spaces = {};
    this.idx2dir.forEach((dir, idx) => {
      const wallSpaces = [];
      this.spaces[idx] = wallSpaces;
      this.spaces[dir] = wallSpaces;
    });
    roomSpaces.forEach((roomSpace) => {
      const [wall, space] = roomSpace;
      this.spaces[wall].push(space);
    });
  }

  initWalls(width, height, depth) {
    this.walls = {};
    this.idx2dir.forEach((dir, idx) => {
      const wall = this.createWall(idx % 2 ? depth : width, height, dir);
      wall.position.set(
        idx % 2 ? (idx - 2) * (width / 2) : 0,
        height / 2,
        idx % 2 ? 0 : (idx - 1) * (depth / 2),
      );
      wall.rotation.y = idx * (Math.PI / 2);
      this.walls[idx] = wall;
      this.walls[dir] = wall;
      this.add(wall);
    });
  }

  createWall(width, height, dir) {
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const spaces = this.spaces[dir];
    if (spaces.length === 0) {
      return new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
    }
    const wall = new THREE.Object3D();
    const [spaceX, spaceWidth, spaceHeight] = spaces[0];
    const wallConfigs = [
      [0, spaceHeight, width, height - spaceHeight],
      [0, 0, spaceX, height],
      [spaceX + spaceWidth, 0, width - spaceX - spaceWidth, height],
    ];
    wallConfigs.forEach(([left, bottom, wallWidth, wallHeight]) => {
      if (wallWidth > 0 && wallHeight > 0) {
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(wallWidth, wallHeight), material);
        plane.position.set(
          (width / -2) + (wallWidth / 2) + left,
          (height / -2) + (wallHeight / 2) + bottom, 0);
        wall.add(plane);
      }
    });
    return wall;
  }

}
