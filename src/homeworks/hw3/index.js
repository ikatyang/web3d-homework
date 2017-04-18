import resources from '../../templates/resources';
import { init, animate, controls, scene, camera } from '../../templates/three3D';
import Base from './Base';
import Painting from './Painting';

const spotlights = [];
const addSpotlight = (intensity, position) => {
  const spotlight = new THREE.SpotLight(0xffffff, intensity);
  spotlight.penumbra = 0.5;
  spotlight.angle = 0.3;
  spotlight.position.copy(position);

  const spotlightHelper = new THREE.SpotLightHelper(spotlight);
  spotlight.helper = spotlightHelper;
  scene.add(spotlightHelper);

  spotlights.push(spotlight);
  scene.add(spotlight);
};

const createRoomMaterial = () => {
  const wallMaterial = new THREE.MeshPhongMaterial({
    side: THREE.BackSide,
  });
  const groundMaterial = new THREE.MeshPhongMaterial({
    side: THREE.BackSide,
    map: new THREE.TextureLoader().load(`${resources}/images/wood.jpg`),
  });
  return new THREE.MultiMaterial([
    wallMaterial,
    wallMaterial,
    wallMaterial,
    groundMaterial,
    wallMaterial,
    wallMaterial,
  ]);
};

init(() => {
  camera.position.set(0, 200, 200);
  scene.add(camera);

  const roomSize = new THREE.Vector3(400, 200, 600);
  const room = new THREE.Mesh(
    new THREE.BoxGeometry(roomSize.x, roomSize.y, roomSize.z),
    createRoomMaterial());
  room.position.set(0, roomSize.y / 2, 0);
  scene.add(room);

  const light = new THREE.PointLight(0xffffff, 0.2);
  light.position.set(0, roomSize.y, 0);
  scene.add(light);

  addSpotlight(0.8, new THREE.Vector3(roomSize.x / -2, roomSize.y, 0));
  addSpotlight(0.8, new THREE.Vector3(roomSize.x / 2, roomSize.y, 0));
  addSpotlight(0.7, new THREE.Vector3(0, roomSize.y, 0));
  addSpotlight(0.7, new THREE.Vector3(0, roomSize.y, 0));

  const teapotSize = 40;
  const toyTrainSize = 40;

  const jsonLoader = new THREE.JSONLoader();
  jsonLoader.load(`${resources}/models/teapot.json`, (geometry) => {
    const teapot = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x1234ff }));
    teapot.scale.set(5, 5, 5);

    const base = new Base(teapot, 50, teapotSize, 30, teapotSize);
    base.position.set((roomSize.x / 2) + (teapotSize / -2), 0, 0);
    scene.add(base);

    spotlights[0].target = base;
  });

  const objectLoader = new THREE.ObjectLoader();
  objectLoader.load(`${resources}/models/toy-train.json`, (toyTrain) => {
    toyTrain.scale.set(5, 5, 5);

    const base = new Base(toyTrain, 50, toyTrainSize, 30, toyTrainSize);
    base.position.set((roomSize.x / -2) + (toyTrainSize / 2), 0, 0);
    scene.add(base);

    spotlights[1].target = base;
  });

  const paintingTube = 2;
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load(`${resources}/images/lena.png`, (texture) => {
    const painting = new Painting(texture, 50, 50, paintingTube);
    painting.position.set(0, roomSize.y / 2, (roomSize.z / -2) + (paintingTube / 2));
    scene.add(painting);

    spotlights[2].target = painting;
  });

  textureLoader.load(`${resources}/images/danboard.png`, (texture) => {
    const painting = new Painting(texture, 77, 50, paintingTube);
    painting.rotation.set(0, Math.PI, 0);
    painting.position.set(0, roomSize.y / 2, (roomSize.z / 2) + (paintingTube / -2));
    scene.add(painting);

    spotlights[3].target = painting;
  });
});

animate(() => {
  controls.update();
  spotlights.forEach(spotlight => spotlight.helper.update());
});
