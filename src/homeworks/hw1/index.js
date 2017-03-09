import resources from '../../templates/resources';
import { scene, init, animate, camera } from '../../templates/three2D';
import XmasLight from './XmasLight';

const lightCount = 10;
const lightSpacing = 50;
const lampshadeRadius = 50; // px

const lights = [];
const clock = new THREE.Clock();

$('body').append(`<style>
  .lampshade {
    width: ${lampshadeRadius}px;
    height: ${lampshadeRadius}px;
  }
</style>`);

function addLight(background, width, height) {
  const point = new THREE.Vector2();
  const position = new THREE.Vector3();
  const color = new THREE.Color().setHSL(Math.random(), Math.random(), Math.random());

  do {
    point.set(
      (Math.random() * 0.8) + 0.1,
      (Math.random() * 0.8) + 0.1);
    position.set(
      (point.x - 0.5) * width,
      (point.y - 0.5) * height, 5);
  } while (lights.some(light => light.position.distanceTo(position) < lightSpacing));

  const light = new XmasLight({ color, intensity: 5, period: Math.random() + 0.25 });
  light.position.copy(position);
  background.add(light);

  lights.push(light);

  const $lampshadeForm = $('.lampshade.template form').clone();

  $lampshadeForm.find('select.switch').change((event) => {
    light[event.target.value]();
  });
  $lampshadeForm.find('input.period').val(light.period).change((event) => {
    light.period = event.target.value;
  });
  $lampshadeForm.find('input.color-h').val(light.color.getHSL().h).change((event) => {
    const hsl = light.color.getHSL();
    light.color.setHSL(event.target.value, hsl.s, hsl.l);
  });
  $lampshadeForm.find('input.color-s').val(light.color.getHSL().s).change((event) => {
    const hsl = light.color.getHSL();
    light.color.setHSL(hsl.h, event.target.value, hsl.l);
  });
  $lampshadeForm.find('input.color-l').val(light.color.getHSL().l).change((event) => {
    const hsl = light.color.getHSL();
    light.color.setHSL(hsl.h, hsl.s, event.target.value);
  });
  $lampshadeForm.find('input.intensity').val(light.intensity).change((event) => {
    light.intensity = event.target.value;
  });

  const $lampshade = $('<div class="lampshade"></div>')
    .tooltip({
      title: light.name,
      placement: 'auto',
    })
    .popover({
      html: true,
      title: light.name,
      placement: 'auto',
      trigger: 'manual',
      content: $lampshadeForm.mouseleave(() => $('.lampshade').popover('hide')),
    })
    .click(() => {
      $('.lampshade').not($lampshade).popover('hide');
      $lampshade.popover('show');
    });

  const updatePosition = () => $lampshade.css({
    left: (point.x * window.innerWidth) - (lampshadeRadius / 2),
    bottom: (point.y * window.innerHeight) - (lampshadeRadius / 2),
  });
  updatePosition();

  $(window).resize(() => updatePosition());

  $('body').append($lampshade);
}

init(() => {
  camera.position.set(0, 0, 1000);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5);
  scene.add(hemiLight);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(`${resources}/images/xmas.jpg`, (texture) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const background = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshPhongMaterial({ map: texture }));
    scene.add(background);

    $(window).resize(() =>
      background.scale.set(window.innerWidth / width, window.innerHeight / height, 1));

    for (let i = 0; i < lightCount; i += 1) {
      addLight(background, width, height);
    }
  });
});

animate(() => {
  const delta = clock.getDelta();
  lights.forEach(light => light.update(delta));
});
