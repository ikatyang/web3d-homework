(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Room = function (_THREE$Object3D) {
  _inherits(Room, _THREE$Object3D);

  /**
   * @param {number} width X
   * @param {number} height Y
   * @param {number} depth N
   * @param {any[]} roomSpaces [[wall, [x, width, height]], ...]
   *
   *               0 (north)
   *            _>____________
   *            |            |
   *  1 (west)  |            |   3 (east)
   *            |            |
   *            |__________<_|
   *               2 (south)
   */
  function Room(width, height, depth, roomSpaces) {
    _classCallCheck(this, Room);

    var _this = _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).call(this));

    _this.idx2dir = ['north', 'west', 'south', 'east'];
    _this.initSpaces(roomSpaces);
    _this.initWalls(width, height, depth);
    return _this;
  }

  _createClass(Room, [{
    key: 'initSpaces',
    value: function initSpaces(roomSpaces) {
      var _this2 = this;

      this.spaces = {};
      this.idx2dir.forEach(function (dir, idx) {
        var wallSpaces = [];
        _this2.spaces[idx] = wallSpaces;
        _this2.spaces[dir] = wallSpaces;
      });
      roomSpaces.forEach(function (roomSpace) {
        var _roomSpace = _slicedToArray(roomSpace, 2),
            wall = _roomSpace[0],
            space = _roomSpace[1];

        _this2.spaces[wall].push(space);
      });
    }
  }, {
    key: 'initWalls',
    value: function initWalls(width, height, depth) {
      var _this3 = this;

      this.walls = {};
      this.idx2dir.forEach(function (dir, idx) {
        var wall = _this3.createWall(idx % 2 ? depth : width, height, dir);
        wall.position.set(idx % 2 ? (idx - 2) * (width / 2) : 0, height / 2, idx % 2 ? 0 : (idx - 1) * (depth / 2));
        wall.rotation.y = idx * (Math.PI / 2);
        _this3.walls[idx] = wall;
        _this3.walls[dir] = wall;
        _this3.add(wall);
      });
    }
  }, {
    key: 'createWall',
    value: function createWall(width, height, dir) {
      var material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
      var spaces = this.spaces[dir];
      if (spaces.length === 0) {
        return new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
      }
      var wall = new THREE.Object3D();

      var _spaces$ = _slicedToArray(spaces[0], 3),
          spaceX = _spaces$[0],
          spaceWidth = _spaces$[1],
          spaceHeight = _spaces$[2];

      var wallConfigs = [[0, spaceHeight, width, height - spaceHeight], [0, 0, spaceX, height], [spaceX + spaceWidth, 0, width - spaceX - spaceWidth, height]];
      wallConfigs.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 4),
            left = _ref2[0],
            bottom = _ref2[1],
            wallWidth = _ref2[2],
            wallHeight = _ref2[3];

        if (wallWidth > 0 && wallHeight > 0) {
          var plane = new THREE.Mesh(new THREE.PlaneGeometry(wallWidth, wallHeight), material);
          plane.position.set(width / -2 + wallWidth / 2 + left, height / -2 + wallHeight / 2 + bottom, 0);
          wall.add(plane);
        }
      });
      return wall;
    }
  }]);

  return Room;
}(THREE.Object3D);

exports.default = Room;

},{}],2:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _three3D = require('../../templates/three3D');

var _Room = require('./Room');

var _Room2 = _interopRequireDefault(_Room);

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _three3D.init)(function () {
  _three3D.camera.position.set(200, 800, 600);
  var gridHelper = new THREE.GridHelper(450, 45, 0xffffff, 0xffffff);
  gridHelper.position.set(225, 0, -225);
  _three3D.scene.add(gridHelper);

  Object.keys(_rooms2.default).forEach(function (roomName) {
    var roomConfig = _rooms2.default[roomName];

    var _roomConfig$size = _slicedToArray(roomConfig.size, 2),
        width = _roomConfig$size[0],
        depth = _roomConfig$size[1];

    var room = new _Room2.default(width, roomConfig.height, depth, roomConfig.spaces || []);

    var _roomConfig$nextTo = _slicedToArray(roomConfig.nextTo, 2),
        nextToWidthRooms = _roomConfig$nextTo[0],
        nextToDepthRooms = _roomConfig$nextTo[1];

    var nextToWidth = nextToWidthRooms.reduce(function (value, nextToRoomName) {
      return value + _rooms2.default[nextToRoomName].size[0];
    }, 0);
    var nextToDepth = nextToDepthRooms.reduce(function (value, nextToRoomName) {
      return value + _rooms2.default[nextToRoomName].size[1];
    }, 0);
    room.position.set(nextToWidth, 0, nextToDepth).add(new THREE.Vector3(width / 2, 0, depth / 2));
    room.position.multiply(new THREE.Vector3(1, 1, -1));
    _three3D.scene.add(room);
  });
});

(0, _three3D.animate)(function () {
  _three3D.controls.update();
});

},{"../../templates/three3D":5,"./Room":1,"./rooms":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var roomHeight = 100;
var doorHeight = 60;
var balconyHeight = 40;

exports.default = {
  bedRoom1: {
    height: roomHeight,
    size: [120, 144],
    nextTo: [[], []],
    spaces: [['east', [0, 47, doorHeight]], ['north', [0, 30, doorHeight]]]
  },
  balcony1: {
    height: balconyHeight,
    size: [66, 60],
    nextTo: [[], ['bedRoom1']],
    spaces: [['south', [36, 30, doorHeight]]]
  },
  drawingRoom: {
    height: roomHeight,
    size: [120, 170],
    nextTo: [['bedRoom1'], []],
    spaces: [['south', [0, 47, doorHeight]], ['west', [97, 47, doorHeight]], ['north', [0, 120, roomHeight]], ['east', [0, 26, roomHeight]]]
  },
  kitchen: {
    height: roomHeight,
    size: [84, 108],
    nextTo: [['balcony1'], ['drawingRoom']],
    spaces: [['south', [0, 30, roomHeight]], ['east', [0, 108, roomHeight]]]
  },
  diningRoom: {
    height: roomHeight,
    size: [90, 108],
    nextTo: [['balcony1', 'kitchen'], ['drawingRoom']],
    spaces: [['south', [0, 90, roomHeight]], ['west', [0, 108, roomHeight]], ['north', [60, 30, doorHeight]], ['east', [88, 20, roomHeight]]]
  },
  balcony2: {
    height: balconyHeight,
    size: [174, 60],
    nextTo: [['balcony1'], ['drawingRoom', 'diningRoom']],
    spaces: [['south', [0, 30, doorHeight]]]
  },
  shaft1: {
    height: roomHeight,
    size: [120, 60],
    nextTo: [['bedRoom1', 'drawingRoom'], []]
  },
  toilet2: {
    height: roomHeight,
    size: [84, 60],
    nextTo: [['bedRoom1', 'drawingRoom', 'shaft1'], []],
    spaces: [['north', [54, 30, doorHeight]]]
  },
  toilet1: {
    height: roomHeight,
    size: [60, 84],
    nextTo: [['bedRoom1', 'drawingRoom'], ['shaft1']],
    spaces: [['north', [0, 30, doorHeight]]]
  },
  bedRoom3: {
    height: roomHeight,
    size: [144, 131],
    nextTo: [['bedRoom1', 'drawingRoom', 'toilet1'], ['shaft1']],
    spaces: [['west', [84, 47, doorHeight]], ['south', [0, 30, doorHeight]], ['north', [60, 30, doorHeight]]]
  },
  bedRoom2: {
    height: roomHeight,
    size: [120, 120],
    nextTo: [['bedRoom1', 'drawingRoom'], ['shaft1', 'bedRoom3']],
    spaces: [['south', [73, 47, doorHeight]], ['north', [90, 30, doorHeight]]]
  },
  balcony3: {
    height: balconyHeight,
    size: [120, 60],
    nextTo: [['bedRoom1', 'drawingRoom'], ['shaft1', 'bedRoom3', 'bedRoom2']],
    spaces: [['south', [0, 30, doorHeight]]]
  },
  balcony4: {
    height: balconyHeight,
    size: [84, 60],
    nextTo: [['bedRoom1', 'drawingRoom', 'bedRoom2'], ['shaft1', 'bedRoom3']],
    spaces: [['south', [54, 30, doorHeight]]]
  },
  shaft2: {
    height: roomHeight,
    size: [54, 26],
    nextTo: [['balcony1'], ['bedRoom1']],
    spaces: []
  }
};

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
