import { scene, renderer, init as basicInit, animate as basicAnimate } from './three';

export { scene, renderer };

export const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2, window.innerWidth / 2,
  window.innerHeight / 2, window.innerHeight / -2, -50, 1000);

function onWindowResize() {
  camera.left = window.innerWidth / -2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / -2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function init(callback = () => {}) {
  basicInit(camera, () => {
    window.addEventListener('resize', onWindowResize, false);
    callback();
  });
}

export function animate(callback = () => {}) {
  basicAnimate(camera, callback);
}
