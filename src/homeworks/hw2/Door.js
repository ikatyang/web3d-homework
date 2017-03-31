export default class Door extends THREE.Object3D {

  /**
   * @param {number} width
   * @param {number} height
   * @param {'left'|'right'} axisPosName
   * @param {number} direction
   */
  constructor(width, height, axisPosName, direction) {
    super();

    const container = new THREE.Object3D();

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.5 }));

    mesh.position.x = (width / 2) * (axisPosName === 'left' ? -1 : 1);
    container.add(mesh);

    container.position.x = -mesh.position.x;
    this.add(container);

    this.width = width;
    this.height = height;
    this.axisPosName = axisPosName;
    this.direction = direction;

    this.container = container;
    this.mesh = mesh;
    this.mesh.axis = this;

    this.closed = true;
    this.acting = false;

    this.maxRotation = Math.PI / 2.1;
  }

  toggle() {
    if (!this.acting) {
      this.acting = true;
      const intervalId = setInterval(() => {
        const sign = this.closed ? 1 : -1;
        this.container.rotation.y += this.direction * sign * 0.1;

        const isDone = this.direction < 0
          ? (this.container.rotation.y < -this.maxRotation || this.container.rotation.y > 0)
          : (this.container.rotation.y > this.maxRotation || this.container.rotation.y < 0);
        if (isDone) {
          this.closed = !this.closed;

          if (this.closed) {
            this.container.rotation.y = 0;
          } else {
            this.container.rotation.y = this.maxRotation * (this.direction > 0 ? 1 : -1);
          }

          clearInterval(intervalId);
          this.acting = false;
        }
      }, 50);
    }
  }

}
