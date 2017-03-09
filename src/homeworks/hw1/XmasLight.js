let counter = 0;

export default class XmasLight extends THREE.PointLight {

  constructor(options = {}) {
    const { color, intensity, distance, decay } = options;
    super(color, intensity, distance, decay);

    const { period = 1, blinking = true } = options;
    this.delta = 0;
    this.period = period;
    this.lighting = false;
    this.blinking = blinking;

    counter += 1;
    this.name = `XmasLight ${counter}`;
  }

  on() {
    this.toggleBlinking(false);
    this.toggleLighting(true);
  }

  off() {
    this.toggleBlinking(false);
    this.toggleLighting(false);
  }

  blink() {
    this.toggleBlinking(true);
  }

  toggleLighting(lighting = !this.lighting) {
    this.lighting = lighting;
    this.visible = lighting;
    return this;
  }

  toggleBlinking(blinking = !this.blinking) {
    this.delta = 0;
    this.blinking = blinking;
    return this;
  }

  update(delta) {
    if (this.blinking) {
      this.delta += delta;
      while (this.delta > this.period) {
        this.delta -= this.period;
        this.toggleLighting();
      }
    }
  }

}
