export default class Painting extends THREE.Object3D {

  /**
   * @param {THREE.Texture} texture
   * @param {number} width
   * @param {number} height
   * @param {number} depth
   * @param {number} tube
   */
  constructor(texture, width, height, tube) {
    super();
    const borderMaterial = new THREE.MeshPhongMaterial({ color: 0xff1234 });

    const topBorder = new THREE.Mesh(
      new THREE.BoxGeometry(width + tube, tube, tube), borderMaterial);
    topBorder.position.set(tube / -2, height / 2, 0);
    this.add(topBorder);

    const bottomBorder = new THREE.Mesh(
      new THREE.BoxGeometry(width + tube, tube, tube), borderMaterial);
    bottomBorder.position.set(tube / 2, height / -2, 0);
    this.add(bottomBorder);

    const leftBorder = new THREE.Mesh(
      new THREE.BoxGeometry(tube, height + tube, tube), borderMaterial);
    leftBorder.position.set(width / -2, tube / -2, 0);
    this.add(leftBorder);

    const rightBorder = new THREE.Mesh(
      new THREE.BoxGeometry(tube, height + tube, tube), borderMaterial);
    rightBorder.position.set(width / 2, tube / 2, 0);
    this.add(rightBorder);

    const picture = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshPhongMaterial({ map: texture }));
    this.add(picture);
  }

}
