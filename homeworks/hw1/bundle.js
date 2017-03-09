(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var counter = 0;

var XmasLight = function (_THREE$PointLight) {
  _inherits(XmasLight, _THREE$PointLight);

  function XmasLight() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, XmasLight);

    var color = options.color,
        intensity = options.intensity,
        distance = options.distance,
        decay = options.decay;

    var _this = _possibleConstructorReturn(this, (XmasLight.__proto__ || Object.getPrototypeOf(XmasLight)).call(this, color, intensity, distance, decay));

    var _options$period = options.period,
        period = _options$period === undefined ? 1 : _options$period,
        _options$blinking = options.blinking,
        blinking = _options$blinking === undefined ? true : _options$blinking;

    _this.delta = 0;
    _this.period = period;
    _this.lighting = false;
    _this.blinking = blinking;

    counter += 1;
    _this.name = "XmasLight " + counter;
    return _this;
  }

  _createClass(XmasLight, [{
    key: "on",
    value: function on() {
      this.toggleBlinking(false);
      this.toggleLighting(true);
    }
  }, {
    key: "off",
    value: function off() {
      this.toggleBlinking(false);
      this.toggleLighting(false);
    }
  }, {
    key: "blink",
    value: function blink() {
      this.toggleBlinking(true);
    }
  }, {
    key: "toggleLighting",
    value: function toggleLighting() {
      var lighting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.lighting;

      this.lighting = lighting;
      this.visible = lighting;
      return this;
    }
  }, {
    key: "toggleBlinking",
    value: function toggleBlinking() {
      var blinking = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.blinking;

      this.delta = 0;
      this.blinking = blinking;
      return this;
    }
  }, {
    key: "update",
    value: function update(delta) {
      if (this.blinking) {
        this.delta += delta;
        while (this.delta > this.period) {
          this.delta -= this.period;
          this.toggleLighting();
        }
      }
    }
  }]);

  return XmasLight;
}(THREE.PointLight);

exports.default = XmasLight;

},{}],2:[function(require,module,exports){
'use strict';

var _resources = require('../../templates/resources');

var _resources2 = _interopRequireDefault(_resources);

var _three2D = require('../../templates/three2D');

var _XmasLight = require('./XmasLight');

var _XmasLight2 = _interopRequireDefault(_XmasLight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lightCount = 10;
var lightSpacing = 50;
var lampshadeRadius = 50; // px

var lights = [];
var clock = new THREE.Clock();

$('body').append('<style>\n  .lampshade {\n    width: ' + lampshadeRadius + 'px;\n    height: ' + lampshadeRadius + 'px;\n  }\n</style>');

function addLight(background, width, height) {
  var point = new THREE.Vector2();
  var position = new THREE.Vector3();
  var color = new THREE.Color().setHSL(Math.random(), Math.random(), Math.random());

  do {
    point.set(Math.random() * 0.8 + 0.1, Math.random() * 0.8 + 0.1);
    position.set((point.x - 0.5) * width, (point.y - 0.5) * height, 5);
  } while (lights.some(function (light) {
    return light.position.distanceTo(position) < lightSpacing;
  }));

  var light = new _XmasLight2.default({ color: color, intensity: 5, period: Math.random() + 0.25 });
  light.position.copy(position);
  background.add(light);

  lights.push(light);

  var $lampshadeForm = $('.lampshade.template form').clone();

  $lampshadeForm.find('select.switch').change(function (event) {
    light[event.target.value]();
  });
  $lampshadeForm.find('input.period').val(light.period).change(function (event) {
    light.period = event.target.value;
  });
  $lampshadeForm.find('input.color-h').val(light.color.getHSL().h).change(function (event) {
    var hsl = light.color.getHSL();
    light.color.setHSL(event.target.value, hsl.s, hsl.l);
  });
  $lampshadeForm.find('input.color-s').val(light.color.getHSL().s).change(function (event) {
    var hsl = light.color.getHSL();
    light.color.setHSL(hsl.h, event.target.value, hsl.l);
  });
  $lampshadeForm.find('input.color-l').val(light.color.getHSL().l).change(function (event) {
    var hsl = light.color.getHSL();
    light.color.setHSL(hsl.h, hsl.s, event.target.value);
  });
  $lampshadeForm.find('input.intensity').val(light.intensity).change(function (event) {
    light.intensity = event.target.value;
  });

  var $lampshade = $('<div class="lampshade"></div>').tooltip({
    title: light.name,
    placement: 'auto'
  }).popover({
    html: true,
    title: light.name,
    placement: 'auto',
    trigger: 'manual',
    content: $lampshadeForm.mouseleave(function () {
      return $('.lampshade').popover('hide');
    })
  }).click(function () {
    $('.lampshade').not($lampshade).popover('hide');
    $lampshade.popover('show');
  });

  var updatePosition = function updatePosition() {
    return $lampshade.css({
      left: point.x * window.innerWidth - lampshadeRadius / 2,
      bottom: point.y * window.innerHeight - lampshadeRadius / 2
    });
  };
  updatePosition();

  $(window).resize(function () {
    return updatePosition();
  });

  $('body').append($lampshade);
}

(0, _three2D.init)(function () {
  _three2D.camera.position.set(0, 0, 1000);

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5);
  _three2D.scene.add(hemiLight);

  var textureLoader = new THREE.TextureLoader();
  textureLoader.load(_resources2.default + '/images/xmas.jpg', function (texture) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var background = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshPhongMaterial({ map: texture }));
    _three2D.scene.add(background);

    $(window).resize(function () {
      return background.scale.set(window.innerWidth / width, window.innerHeight / height, 1);
    });

    for (var i = 0; i < lightCount; i += 1) {
      addLight(background, width, height);
    }
  });
});

(0, _three2D.animate)(function () {
  var delta = clock.getDelta();
  lights.forEach(function (light) {
    return light.update(delta);
  });
});

},{"../../templates/resources":3,"../../templates/three2D":5,"./XmasLight":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '../../resources';

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camera = exports.renderer = exports.scene = undefined;
exports.init = init;
exports.animate = animate;

var _three = require('./three');

exports.scene = _three.scene;
exports.renderer = _three.renderer;
var camera = exports.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -50, 1000);

function onWindowResize() {
  camera.left = window.innerWidth / -2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / -2;
  camera.updateProjectionMatrix();
  _three.renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  (0, _three.init)(camera, function () {
    window.addEventListener('resize', onWindowResize, false);
    callback();
  });
}

function animate() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  (0, _three.animate)(camera, callback);
}

},{"./three":4}]},{},[2]);
