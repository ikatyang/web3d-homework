(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = function (_THREE$Object3D) {
  _inherits(Base, _THREE$Object3D);

  /**
   * @param {THREE.Object3D} artwork
   * @param {number} height
   * @param {number} minWidth
   * @param {number} minHeight
   * @param {number} minDepth
   */
  function Base(artwork, height) {
    var minWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var minHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var minDepth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, Base);

    var _this = _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).call(this));

    var artworkBox = new THREE.Box3().expandByObject(artwork);
    var artworkSize = artworkBox.getSize();
    var artworkCenter = artworkBox.getCenter();

    var baseWidth = Math.max(artworkSize.x, minWidth);
    var baseHeight = height;
    var baseDepth = Math.max(artworkSize.z, minDepth);

    var base = new THREE.Mesh(new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth), new THREE.MeshPhongMaterial({ color: 'gray' }));
    base.position.set(0, baseHeight / 2, 0);
    base.receiveShadow = true;
    _this.add(base);

    var mirrorHeight = Math.max(artworkSize.y, minHeight);
    var mirror = new THREE.Mesh(new THREE.BoxGeometry(baseWidth, mirrorHeight, baseDepth), new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
      color: 'white'
    }));
    mirror.position.set(0, baseHeight + mirrorHeight / 2 + 0.1, 0);
    _this.add(mirror);

    artwork.position.set(-artworkCenter.x, -artworkCenter.y + artworkSize.y / 2 + baseHeight, -artworkCenter.z);
    _this.add(artwork);
    return _this;
  }

  return Base;
}(THREE.Object3D);

exports.default = Base;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Painting = function (_THREE$Object3D) {
  _inherits(Painting, _THREE$Object3D);

  /**
   * @param {THREE.Texture} texture
   * @param {number} width
   * @param {number} height
   * @param {number} depth
   * @param {number} tube
   */
  function Painting(texture, width, height, tube) {
    _classCallCheck(this, Painting);

    var _this = _possibleConstructorReturn(this, (Painting.__proto__ || Object.getPrototypeOf(Painting)).call(this));

    var borderMaterial = new THREE.MeshPhongMaterial({ color: 0xff1234 });

    var topBorder = new THREE.Mesh(new THREE.BoxGeometry(width + tube, tube, tube), borderMaterial);
    topBorder.position.set(tube / -2, height / 2, 0);
    _this.add(topBorder);

    var bottomBorder = new THREE.Mesh(new THREE.BoxGeometry(width + tube, tube, tube), borderMaterial);
    bottomBorder.position.set(tube / 2, height / -2, 0);
    _this.add(bottomBorder);

    var leftBorder = new THREE.Mesh(new THREE.BoxGeometry(tube, height + tube, tube), borderMaterial);
    leftBorder.position.set(width / -2, tube / -2, 0);
    _this.add(leftBorder);

    var rightBorder = new THREE.Mesh(new THREE.BoxGeometry(tube, height + tube, tube), borderMaterial);
    rightBorder.position.set(width / 2, tube / 2, 0);
    _this.add(rightBorder);

    var picture = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshPhongMaterial({ map: texture }));
    _this.add(picture);
    return _this;
  }

  return Painting;
}(THREE.Object3D);

exports.default = Painting;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpotLight = function (_THREE$SpotLight) {
  _inherits(SpotLight, _THREE$SpotLight);

  function SpotLight(radius, height) {
    var _ref;

    _classCallCheck(this, SpotLight);

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = SpotLight.__proto__ || Object.getPrototypeOf(SpotLight)).call.apply(_ref, [this].concat(args)));

    _this.rawSwitch = true;
    _this.switchOnColor = 'white';
    _this.switchOffColor = 'black';

    var container = new THREE.Object3D();
    _this.add(container);

    var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 16, 1, true), new THREE.MeshPhongMaterial({ color: 'white' }));
    cylinder.rotation.set(Math.PI / 2, 0, 0);
    cylinder.position.set(0, 0, height / 2);
    container.add(cylinder);

    var front = new THREE.Mesh(new THREE.CircleGeometry(radius, 16), new THREE.MeshBasicMaterial({ color: _this.switchOnColor }));
    front.position.set(0, 0, height);
    container.add(front);

    _this.wrapper = container;
    _this.frontMaterial = front.material;
    return _this;
  }

  _createClass(SpotLight, [{
    key: 'lookTarget',
    value: function lookTarget(object) {
      this.target = object;
      this.wrapper.lookAt(this.worldToLocal(object.position.clone()));
    }
  }, {
    key: 'switchOn',
    value: function switchOn() {
      this.intensity = this.originalIntensity;
      this.frontMaterial.color.setStyle(this.switchOnColor);
    }
  }, {
    key: 'switchOff',
    value: function switchOff() {
      this.originalIntensity = this.intensity;
      this.intensity = 0;
      this.frontMaterial.color.setStyle(this.switchOffColor);
    }
  }, {
    key: 'switch',
    get: function get() {
      return this.rawSwitch;
    },
    set: function set(rawSwitch) {
      this.rawSwitch = rawSwitch;
      if (rawSwitch) {
        this.switchOn();
      } else {
        this.switchOff();
      }
    }
  }]);

  return SpotLight;
}(THREE.SpotLight);

exports.default = SpotLight;

},{}],4:[function(require,module,exports){
'use strict';

var _resources = require('../../templates/resources');

var _resources2 = _interopRequireDefault(_resources);

var _three3D = require('../../templates/three3D');

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

var _Painting = require('./Painting');

var _Painting2 = _interopRequireDefault(_Painting);

var _SpotLight = require('./SpotLight');

var _SpotLight2 = _interopRequireDefault(_SpotLight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var picked = null;
var pickables = [];

var spotlights = [];
var addSpotlight = function addSpotlight(intensity, position) {
  var spotlight = new _SpotLight2.default(5, 20, 0xffffff, intensity);
  spotlight.penumbra = 0.5;
  spotlight.angle = 0.3;
  spotlight.position.copy(position);

  spotlight.castShadow = true;

  var spotlightHelper = new THREE.SpotLightHelper(spotlight);
  spotlight.helper = spotlightHelper;
  spotlightHelper.visible = false;
  _three3D.scene.add(spotlightHelper);

  spotlights.push(spotlight);
  _three3D.scene.add(spotlight);
};

var createRoomMaterial = function createRoomMaterial() {
  var wallMaterial = new THREE.MeshPhongMaterial({
    side: THREE.BackSide
  });
  var groundMaterial = new THREE.MeshPhongMaterial({
    side: THREE.BackSide,
    map: new THREE.TextureLoader().load(_resources2.default + '/images/wood.jpg')
  });
  return new THREE.MultiMaterial([wallMaterial, wallMaterial, wallMaterial, groundMaterial, wallMaterial, wallMaterial]);
};

var createBench = function createBench() {
  var bench = new THREE.Object3D();
  var material = new THREE.MeshPhongMaterial({ color: 0x12ff34 });

  var topHeight = 10;
  var bottomHeight = 20;

  var width = 30;
  var depth = 200;

  var delta = 10;

  var bottom = new THREE.Mesh(new THREE.BoxGeometry(width, bottomHeight, depth), material);
  bottom.position.set(0, bottomHeight / 2, 0);
  bench.add(bottom);

  var top = new THREE.Mesh(new THREE.BoxGeometry(width + delta, topHeight, depth + delta), material);
  top.position.set(0, bottomHeight + topHeight / 2, 0);
  bench.add(top);

  return bench;
};

(0, _three3D.init)(function () {
  _three3D.renderer.shadowMap.enabled = true;

  _three3D.camera.position.set(200, 120, 300);
  _three3D.scene.add(_three3D.camera);

  var roomSize = new THREE.Vector3(400, 200, 600);
  var room = new THREE.Mesh(new THREE.BoxGeometry(roomSize.x, roomSize.y, roomSize.z), createRoomMaterial());
  room.position.set(0, roomSize.y / 2, 0);
  room.receiveShadow = true;
  _three3D.scene.add(room);

  var bench = createBench();
  bench.castShadow = true;
  _three3D.scene.add(bench);

  var light = new THREE.PointLight(0xffffff, 0.7);
  light.position.set(0, roomSize.y, 0);
  _three3D.scene.add(light);

  var gui = new dat.GUI();
  gui.close();

  addSpotlight(0.8, new THREE.Vector3(roomSize.x / -2, roomSize.y, 0));
  addSpotlight(0.8, new THREE.Vector3(roomSize.x / 2, roomSize.y, 0));
  addSpotlight(0.7, new THREE.Vector3(0, roomSize.y, -100));
  addSpotlight(0.7, new THREE.Vector3(0, roomSize.y, 100));

  spotlights.forEach(function (spotlight, index) {
    gui.add(spotlight, 'switch').name('Switch ' + index);
    gui.add(spotlight.helper, 'visible').name('Helper ' + index);
  });

  var teapotSize = 40;
  var toyTrainSize = 40;

  var jsonLoader = new THREE.JSONLoader();
  jsonLoader.load(_resources2.default + '/models/teapot.json', function (geometry) {
    var teapot = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
      color: 0x1234ff,
      side: THREE.DoubleSide
    }));
    teapot.castShadow = true;
    teapot.scale.set(5, 5, 5);
    teapot.rotation.set(0, Math.PI / -2, 0);

    var base = new _Base2.default(teapot, 50, teapotSize, 30, teapotSize);
    base.position.set(roomSize.x / 2 + teapotSize / -2 - 0.1, 0, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    _three3D.scene.add(base);

    pickables.push(base);
    base.description = 'The Great Teapot';

    spotlights[0].lookTarget(base);
  });

  var objectLoader = new THREE.ObjectLoader();
  objectLoader.load(_resources2.default + '/models/toy-train.json', function (toyTrain) {
    toyTrain.scale.set(5, 5, 5);

    var base = new _Base2.default(toyTrain, 50, toyTrainSize, 30, toyTrainSize);
    base.position.set(roomSize.x / -2 + toyTrainSize / 2 + 0.1, 0, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    _three3D.scene.add(base);

    pickables.push(base);
    base.description = 'The Great Train';

    spotlights[1].lookTarget(base);
  });

  var paintingTube = 2;
  var textureLoader = new THREE.TextureLoader();

  textureLoader.load(_resources2.default + '/images/lena.png', function (texture) {
    var painting = new _Painting2.default(texture, 50, 50, paintingTube);
    painting.position.set(0, roomSize.y / 2, roomSize.z / -2 + paintingTube / 2);
    _three3D.scene.add(painting);

    pickables.push(painting);
    painting.description = 'The Great Lena';

    spotlights[2].lookTarget(painting);
  });

  textureLoader.load(_resources2.default + '/images/danboard.png', function (texture) {
    var painting = new _Painting2.default(texture, 77, 50, paintingTube);
    painting.rotation.set(0, Math.PI, 0);
    painting.position.set(0, roomSize.y / 2, roomSize.z / 2 + paintingTube / -2);
    _three3D.scene.add(painting);

    pickables.push(painting);
    painting.description = 'The Great Danboard';

    spotlights[3].lookTarget(painting);
  });

  var getPickable = function getPickable(child) {
    return pickables.indexOf(child) !== -1 ? child : getPickable(child.parent);
  };

  window.addEventListener('mousemove', function (event) {
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(event.clientX / window.innerWidth * 2 - 1, event.clientY / window.innerHeight * -2 + 1), _three3D.camera);
    var intersects = raycaster.intersectObjects(pickables, true);
    picked = intersects.length > 0 ? getPickable(intersects[0].object) : null;
  }, false);
});

(0, _three3D.animate)(function () {
  _three3D.controls.update();
  spotlights.forEach(function (spotlight) {
    return spotlight.helper.update();
  });
  document.getElementById('description').innerText = picked ? picked.description : '';
});

},{"../../templates/resources":5,"../../templates/three3D":7,"./Base":1,"./Painting":2,"./SpotLight":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '../../resources';

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.animate = animate;
var scene = exports.scene = new THREE.Scene();
var renderer = exports.renderer = new THREE.WebGLRenderer();

function init(camera, callback) {
  scene.add(camera);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);

  document.body.appendChild(renderer.domElement);

  callback();
}

function animate(camera, callback) {
  (function animateFrame() {
    callback();
    requestAnimationFrame(animateFrame);
    renderer.render(scene, camera);
  })();
}

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controls = exports.camera = exports.renderer = exports.scene = undefined;
exports.init = init;
exports.animate = animate;

var _three = require('./three');

exports.scene = _three.scene;
exports.renderer = _three.renderer;
var camera = exports.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
var controls = exports.controls = new THREE.OrbitControls(camera, _three.renderer.domElement);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  _three.renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$resize = _ref.resize,
      resize = _ref$resize === undefined ? true : _ref$resize;

  (0, _three.init)(camera, function () {
    if (resize) {
      window.addEventListener('resize', onWindowResize, false);
    }
    callback();
  });
}

function animate() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  (0, _three.animate)(camera, callback);
}

},{"./three":6}]},{},[4]);
