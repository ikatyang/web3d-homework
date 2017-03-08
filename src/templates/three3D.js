export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer();
export const camera =
  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
export const controls = new THREE.OrbitControls(camera, renderer.domElement);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function init(callback = () => {}) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);

  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);

  callback();
}

export function animate(callback = () => {}) {
  (function animateFrame() {
    callback();
    requestAnimationFrame(animateFrame);
    renderer.render(scene, camera);
  }());
}
