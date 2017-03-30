export default class Door extends THREE.Object3D {

  /**
   * @param {number} width
   * @param {number} height
   * @param {'left'|'right'} axis
   * @param {number} direction
   */
  constructor(width, height, axis, direction) {
    super();

    const container = new THREE.Object3D();

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));

    mesh.position.x = (width / 2) * (axis === 'left' ? -1 : 1);
    container.add(mesh);

    container.position.x = -mesh.position.x;
    this.add(container);

    this.width = width;
    this.height = height;
    this.axis = axis;

    this.container = container;

    let sign = 1;
    setInterval(() => {
      this.container.rotation.y += direction * sign * 0.1;
      if (
        (direction < 0 &&
          (this.container.rotation.y < Math.PI / -2 || this.container.rotation.y > 0)) ||
        (direction > 0 &&
          (this.container.rotation.y > Math.PI / 2 || this.container.rotation.y < 0))
      ) {
        sign *= -1;
      }
    }, 50);
  }

}
