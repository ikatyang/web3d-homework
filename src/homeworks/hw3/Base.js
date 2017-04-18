export default class Base extends THREE.Object3D {

  /**
   * @param {THREE.Object3D} artwork
   * @param {number} height
   * @param {number} minWidth
   * @param {number} minHeight
   * @param {number} minDepth
   */
  constructor(artwork, height, minWidth = 0, minHeight = 0, minDepth = 0) {
    super();

    const artworkBox = new THREE.Box3().expandByObject(artwork);
    const artworkSize = artworkBox.getSize();
    const artworkCenter = artworkBox.getCenter();

    const baseWidth = Math.max(artworkSize.x, minWidth);
    const baseHeight = height;
    const baseDepth = Math.max(artworkSize.z, minDepth);

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth),
      new THREE.MeshPhongMaterial({ color: 'gray' }));
    base.position.set(0, baseHeight / 2, 0);
    base.receiveShadow = true;
    this.add(base);

    const mirrorHeight = Math.max(artworkSize.y, minHeight);
    const mirror = new THREE.Mesh(
      new THREE.BoxGeometry(baseWidth, mirrorHeight, baseDepth),
      new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2,
        color: 'white',
      }));
    mirror.position.set(0, baseHeight + (mirrorHeight / 2) + 0.1, 0);
    this.add(mirror);

    artwork.position.set(
      -artworkCenter.x,
      -artworkCenter.y + (artworkSize.y / 2) + baseHeight,
      -artworkCenter.z);
    this.add(artwork);
  }

}
