import { scene, renderer, init as basicInit, animate as basicAnimate } from './three';

export { scene, renderer };

export const camera =
  new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
export const controls = new THREE.OrbitControls(camera, renderer.domElement);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function init(callback = () => {}, { resize = true } = {}) {
  basicInit(camera, () => {
    if (resize) {
      window.addEventListener('resize', onWindowResize, false);
    }
    callback();
  });
}

export function animate(callback = () => {}) {
  basicAnimate(camera, callback);
}
