export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer();

export function init(camera, callback) {
  scene.add(camera);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);

  document.body.appendChild(renderer.domElement);

  callback();
}

export function animate(camera, callback) {
  (function animateFrame() {
    callback();
    requestAnimationFrame(animateFrame);
    renderer.render(scene, camera);
  }());
}
