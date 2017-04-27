export default class SpotLight extends THREE.SpotLight {

  constructor(radius, height, ...args) {
    super(...args);
    this.rawSwitch = true;
    this.switchOnColor = 'white';
    this.switchOffColor = 'black';

    const container = new THREE.Object3D();
    this.add(container);

    const cylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, height, 16, 1, true),
      new THREE.MeshPhongMaterial({ color: 'white' }));
    cylinder.rotation.set(Math.PI / 2, 0, 0);
    cylinder.position.set(0, 0, height / 2);
    container.add(cylinder);

    const front = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 16),
      new THREE.MeshBasicMaterial({ color: this.switchOnColor }));
    front.position.set(0, 0, height);
    container.add(front);

    this.wrapper = container;
    this.frontMaterial = front.material;
  }

  lookTarget(object) {
    this.target = object;
    this.wrapper.lookAt(this.worldToLocal(object.position.clone()));
  }

  get switch() {
    return this.rawSwitch;
  }

  set switch(rawSwitch) {
    this.rawSwitch = rawSwitch;
    if (rawSwitch) {
      this.switchOn();
    } else {
      this.switchOff();
    }
  }

  switchOn() {
    this.intensity = this.originalIntensity;
    this.frontMaterial.color.setStyle(this.switchOnColor);
  }

  switchOff() {
    this.originalIntensity = this.intensity;
    this.intensity = 0;
    this.frontMaterial.color.setStyle(this.switchOffColor);
  }

}
