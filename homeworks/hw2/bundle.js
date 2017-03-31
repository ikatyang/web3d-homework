(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Door = function (_THREE$Object3D) {
  _inherits(Door, _THREE$Object3D);

  /**
   * @param {number} width
   * @param {number} height
   * @param {'left'|'right'} axisPosName
   * @param {number} direction
   */
  function Door(width, height, axisPosName, direction) {
    _classCallCheck(this, Door);

    var _this = _possibleConstructorReturn(this, (Door.__proto__ || Object.getPrototypeOf(Door)).call(this));

    var container = new THREE.Object3D();

    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.5 }));

    mesh.position.x = width / 2 * (axisPosName === 'left' ? -1 : 1);
    container.add(mesh);

    container.position.x = -mesh.position.x;
    _this.add(container);

    _this.width = width;
    _this.height = height;
    _this.axisPosName = axisPosName;
    _this.direction = direction;

    _this.container = container;
    _this.mesh = mesh;
    _this.mesh.axis = _this;

    _this.closed = true;
    _this.acting = false;

    _this.maxRotation = Math.PI / 2.1;
    return _this;
  }

  _createClass(Door, [{
    key: 'toggle',
    value: function toggle() {
      var _this2 = this;

      if (!this.acting) {
        this.acting = true;
        var intervalId = setInterval(function () {
          var sign = _this2.closed ? 1 : -1;
          _this2.container.rotation.y += _this2.direction * sign * 0.1;

          var isDone = _this2.direction < 0 ? _this2.container.rotation.y < -_this2.maxRotation || _this2.container.rotation.y > 0 : _this2.container.rotation.y > _this2.maxRotation || _this2.container.rotation.y < 0;
          if (isDone) {
            _this2.closed = !_this2.closed;

            if (_this2.closed) {
              _this2.container.rotation.y = 0;
            } else {
              _this2.container.rotation.y = _this2.maxRotation * (_this2.direction > 0 ? 1 : -1);
            }

            clearInterval(intervalId);
            _this2.acting = false;
          }
        }, 50);
      }
    }
  }]);

  return Door;
}(THREE.Object3D);

exports.default = Door;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Room = require('./Room');

var _Room2 = _interopRequireDefault(_Room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var House = function (_THREE$Object3D) {
  _inherits(House, _THREE$Object3D);

  function House(roomConfigs) {
    _classCallCheck(this, House);

    var _this = _possibleConstructorReturn(this, (House.__proto__ || Object.getPrototypeOf(House)).call(this));

    var coords = { x: 1, z: -1 };

    var container = new THREE.Object3D();
    _this.add(container);

    var rooms = {};
    var doors = [];
    var borders = [];
    var grounds = [];

    Object.keys(roomConfigs).forEach(function (roomName) {
      var roomConfig = roomConfigs[roomName];

      var _roomConfig$size = _slicedToArray(roomConfig.size, 2),
          width = _roomConfig$size[0],
          depth = _roomConfig$size[1];

      var walls = roomConfig.walls.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            wall = _ref2[0];

        return wall;
      });
      var wallPositions = roomConfig.walls.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            wallPosition = _ref4[1];

        return wallPosition;
      });
      var room = new _Room2.default(width, roomConfig.height, depth, walls, wallPositions);

      var _roomConfig$nextTo = _slicedToArray(roomConfig.nextTo, 2),
          nextToRoomX = _roomConfig$nextTo[0],
          nextToRoomZ = _roomConfig$nextTo[1];

      var nextToWidth = nextToRoomX === null ? 0 : rooms[nextToRoomX].position.x + rooms[nextToRoomX].width / 2 * coords.x;
      var nextToDepth = nextToRoomZ === null ? 0 : rooms[nextToRoomZ].position.z + rooms[nextToRoomZ].depth / 2 * coords.z;
      room.position.set(nextToWidth + width / 2 * coords.x, 0, nextToDepth + depth / 2 * coords.z);
      container.add(room);
      rooms[roomName] = room;

      room.walls.forEach(function (wall) {
        if (wall.door) {
          doors.push(wall.door.mesh);
          borders.push(wall.door.mesh);
        }
        borders.push.apply(borders, _toConsumableArray(wall.container.children));
      });

      room.ground.roomName = roomName;
      grounds.push(room.ground);

      var light = new THREE.PointLight(0xffffff, 0.2);
      light.position.y = 60;
      room.add(light);
    });
    var box = new THREE.Box3().setFromObject(container);
    container.position.sub(box.getCenter().setY(0));

    _this.container = container;
    _this.rooms = rooms;
    _this.doors = doors;
    _this.borders = borders;
    _this.grounds = grounds;
    return _this;
  }

  return House;
}(THREE.Object3D);

exports.default = House;

},{"./Room":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Wall = require('./Wall');

var _Wall2 = _interopRequireDefault(_Wall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line no-unused-vars

var Room = function (_THREE$Object3D) {
  _inherits(Room, _THREE$Object3D);

  /**
   * @param {number} width
   * @param {number} height
   * @param {number} depth
   * @param {Wall[]} walls
   * @param {number[]} wallPositions
   *
   *               0 (north)
   *            _>____________
   *            |            |
   *  1 (west)  |            |   3 (east)
   *            |            |
   *            |__________<_|
   *               2 (south)
   */
  function Room(width, height, depth, walls, wallPositions) {
    _classCallCheck(this, Room);

    var _this = _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).call(this));

    var ground = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), new THREE.MeshPhongMaterial({
      color: new THREE.Color().setRGB(Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2)
    }));
    ground.rotation.x = Math.PI / -2;
    _this.add(ground);

    walls.forEach(function (wall, index) {
      var wallPosition = wallPositions[index];

      var wallPositionX = void 0;
      var wallPositionZ = void 0;

      if (typeof wallPosition === 'number') {
        var isNegative = wallPosition < 0 || 1 / wallPosition === -Infinity;

        wallPositionX = isNegative ? width + wallPosition : wallPosition;
        wallPositionZ = isNegative ? depth + wallPosition : wallPosition;
      } else {
        wallPositionX = +wallPosition;
        wallPositionZ = +wallPosition;
      }

      switch (wall.direction) {
        case 'north':
          wall.position.set(width / -2, wall.height / 2, depth / -2).add(new THREE.Vector3(wallPositionX, 0, 0));
          if (wall.depthDelta) {
            wall.position.add(new THREE.Vector3(0, 0, wall.depth / -2).multiplyScalar(wall.depthDelta));
          }
          break;
        case 'west':
          wall.position.set(width / -2, wall.height / 2, depth / 2).add(new THREE.Vector3(0, 0, -wallPositionZ));
          if (wall.depthDelta) {
            wall.position.add(new THREE.Vector3(wall.depth / -2, 0, 0).multiplyScalar(wall.depthDelta));
          }
          break;
        case 'south':
          wall.position.set(width / 2, wall.height / 2, depth / 2).add(new THREE.Vector3(-wallPositionX, 0, 0));
          if (wall.depthDelta) {
            wall.position.add(new THREE.Vector3(0, 0, wall.depth / 2).multiplyScalar(wall.depthDelta));
          }
          break;
        case 'east':
          wall.position.set(width / 2, wall.height / 2, depth / -2).add(new THREE.Vector3(0, 0, wallPositionZ));
          if (wall.depthDelta) {
            wall.position.add(new THREE.Vector3(wall.depth / 2, 0, 0).multiplyScalar(wall.depthDelta));
          }
          break;
        default:
          throw new Error('Unexpected direction: ' + wall.direction);
      }
      _this.add(wall);
    });

    _this.width = width;
    _this.height = height;
    _this.depth = depth;
    _this.walls = walls;
    _this.ground = ground;
    return _this;
  }

  return Room;
}(THREE.Object3D);

exports.default = Room;

},{"./Wall":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Door = require('./Door');

var _Door2 = _interopRequireDefault(_Door);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line no-unused-vars

var singleDepth = 5;
var directions = ['north', 'west', 'south', 'east'];

var blackMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
var transparentMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });

var allSides = ['l', 'r', 'u', 'd', 'b', 'f'];
var createMultiMaterial = function createMultiMaterial(sides) {
  var materials = [];
  var material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(Math.random() * 0.3, Math.random() * 0.3, Math.random() * 0.3)
  });
  allSides.forEach(function (side) {
    if (side === 'u' || side === 'd') {
      materials.push(blackMaterial);
    } else {
      materials.push(sides.indexOf(side) === -1 ? transparentMaterial : material);
    }
  });
  return new THREE.MultiMaterial(materials);
};

var Wall = function (_THREE$Object3D) {
  _inherits(Wall, _THREE$Object3D);

  _createClass(Wall, null, [{
    key: 'directions',
    get: function get() {
      return directions;
    }
  }, {
    key: 'singleDepth',
    get: function get() {
      return singleDepth;
    }

    /**
     * @param {number} width
     * @param {number} height
     * @param {'north'|'west'|'south'|'east'} direction
     * @param {string} sides
     *    'u' = up
     *    'd' = down
     *    'l' = left
     *    'r' = right
     *    'f' = front
     *    'b' = back
     * @param {number} bottom
     * @param {number} depthCount
     * @param {number} depthDelta
     * @param {Door} door
     * @param {number} doorPosition
     * @param {number} doorDepthDelta
     * @param {boolean} holdDoor
     */

  }]);

  function Wall(width, height, direction, sides, bottom, depthCount, depthDelta, door, doorPosition, doorDepthDelta, holdDoor) {
    _classCallCheck(this, Wall);

    var _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this));

    var wallSides = {
      all: sides.all || sides,
      top: sides.top || '',
      left: sides.left || '',
      right: sides.right || ''
    };

    wallSides.top += wallSides.all;
    wallSides.left += wallSides.all;
    wallSides.right += wallSides.all;

    var depth = singleDepth * depthCount;

    var container = new THREE.Object3D();
    container.rotation.y = directions.indexOf(direction) * (Math.PI / 2);
    _this.add(container);

    if (!door) {
      var mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), createMultiMaterial(wallSides.all));
      mesh.position.y = bottom;
      container.add(mesh);
    } else {
      var isNegative = doorPosition < 0 || 1 / doorPosition === -Infinity;

      if (height > 0) {
        var doorDeltaX = door.width / -2 + (isNegative ? width + doorPosition - singleDepth * 2 : doorPosition + singleDepth * 2);
        var partitions = {
          top: [0, door.height, width, height - door.height],
          left: [0, 0, doorDeltaX, door.height],
          right: [doorDeltaX + door.width, 0, width - doorDeltaX - door.width, door.height]
        };
        Object.keys(partitions).forEach(function (partitionName) {
          var _partitions$partition = _slicedToArray(partitions[partitionName], 4),
              partitionLeft = _partitions$partition[0],
              partitionBottom = _partitions$partition[1],
              partitionWidth = _partitions$partition[2],
              partitionHeight = _partitions$partition[3];

          if (partitionWidth > 0 && partitionHeight > 0) {
            var _mesh = new THREE.Mesh(new THREE.BoxGeometry(partitionWidth, partitionHeight, depth), createMultiMaterial(wallSides[partitionName]));
            _mesh.position.set(width / -2 + partitionWidth / 2 + partitionLeft, height / -2 + partitionHeight / 2 + partitionBottom + bottom, 0);
            container.add(_mesh);
          }
        });
      }

      if (holdDoor) {
        var doorPositionX = width / -2 + (isNegative ? width + doorPosition - singleDepth * 2 : doorPosition + singleDepth * 2);
        door.position.set(doorPositionX, height / -2 + door.height / 2, doorDepthDelta * singleDepth);
        container.add(door);
      }
    }

    _this.width = width;
    _this.height = height;
    _this.direction = direction;
    _this.depth = depth;
    _this.depthDelta = depthDelta;

    _this.container = container;
    _this.door = holdDoor ? door : null;
    return _this;
  }

  return Wall;
}(THREE.Object3D);

exports.default = Wall;

},{"./Door":1}],5:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _three3D = require('../../templates/three3D');

var _House = require('./House');

var _House2 = _interopRequireDefault(_House);

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gcontrols = {
  speed: 80,
  blockedHeight: 10,
  controls: 'PointerLock'
};

var clickDistance = 80;
var collisionDistance = 10;

var origin = new THREE.Vector3(0, 40, 300);

var clock = new THREE.Clock();
var pointerRaycaster = new THREE.Raycaster(undefined, undefined, undefined, clickDistance);
var collisionRaycaster = new THREE.Raycaster(undefined, undefined, undefined, collisionDistance);
var groundRaycaster = new THREE.Raycaster(undefined, undefined, undefined, 100);

var pointerLockCamera = _three3D.camera.clone();

var minimapSize = 200;
var minimapCamera = new THREE.OrthographicCamera(minimapSize / 2, minimapSize / -2, minimapSize / -2, minimapSize / 2);
minimapCamera.rotation.x = Math.PI / -2;

var gui = new dat.GUI();
gui.close();
gui.add(gcontrols, 'speed', 0, 200);
gui.add(gcontrols, 'blockedHeight', 0, 80);
gui.add(pointerRaycaster, 'far', 0, 200).name('clickDistance');
gui.add(collisionRaycaster, 'far', 0, 50).name('collisionDistance');

var onControlsChange = function onControlsChange(value) {
  var blocker = document.getElementById('blocker');
  var icons = document.getElementById('cursor-icons');
  if (value === 'Orbit') {
    document.exitPointerLock();
    blocker.style.display = 'none';
    icons.style.display = 'none';
  } else {
    blocker.style.display = '';
    icons.style.display = '';
  }
};

var controlsController = gui.add(gcontrols, 'controls', ['Orbit', 'PointerLock']).onChange(onControlsChange);

var setViewport = function setViewport(position) {
  return function () {
    gcontrols.controls = 'Orbit';
    onControlsChange(gcontrols.controls);
    controlsController.updateDisplay();
    _three3D.camera.position.copy(position);
  };
};

var viewports = [new THREE.Vector3(0, 300, 600), new THREE.Vector3(-300, 300, -300), new THREE.Vector3(300, 300, -300)];
viewports.forEach(function (viewport, index) {
  var viewportName = 'setViewport' + (index + 1);
  gcontrols[viewportName] = setViewport(viewport);
  gui.add(gcontrols, viewportName);
});

var stats = new Stats();
stats.domElement.id = 'stats';
document.body.appendChild(stats.domElement);

var house = void 0;
var intersects = [];
var pointerLockControls = void 0;
var mouseEvent = void 0;
var isFirst = true;

var pressed = {
  w: false,
  a: false,
  s: false,
  d: false
};

(0, _three3D.init)(function () {
  _three3D.camera.position.set(0, 300, 600);
  _three3D.scene.add(_three3D.camera);

  pointerLockControls = new THREE.PointerLockControls(pointerLockCamera);
  var pointerLockObject = pointerLockControls.getObject();
  pointerLockObject.position.copy(origin);
  _three3D.scene.add(pointerLockObject);

  var character = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 16), new THREE.MeshBasicMaterial({ color: 'red' }));
  pointerLockObject.add(character);

  var gridHelper = new THREE.GridHelper(450, 45, 0xffffff, 0xffffff);
  gridHelper.position.y = 0.1;
  _three3D.scene.add(gridHelper);

  house = new _House2.default(_rooms2.default);
  _three3D.scene.add(house);

  window.addEventListener('mousemove', function (event) {
    mouseEvent = event;
  }, false);
  window.addEventListener('mousedown', function () {
    if (intersects.length > 0) {
      intersects[0].object.axis.toggle();
    }
  }, false);

  var blocker = document.getElementById('blocker');

  blocker.addEventListener('click', function () {
    document.body.requestPointerLock();
  }, false);

  document.addEventListener('pointerlockchange', function () {
    if (document.pointerLockElement === document.body) {
      isFirst = false;
      pointerLockControls.enabled = true;
      blocker.style.display = 'none';
    } else {
      pointerLockControls.enabled = false;
      blocker.style.display = '';
    }
  }, false);

  var createKeyEvent = function createKeyEvent(value) {
    return function (event) {
      switch (event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
          pressed.w = value;
          break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
          pressed.a = value;
          break;
        case 's':
        case 'S':
        case 'ArrowDown':
          pressed.s = value;
          break;
        case 'd':
        case 'D':
        case 'ArrowRight':
          pressed.d = value;
          break;
        default:
          // do nothing
          break;
      }
    };
  };

  [[0, 230], [300, 230], [-300, 230], [75, -240], [-80, -180]].forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        z = _ref2[1];

    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(x, 80, z);
    _three3D.scene.add(light);
  });

  document.addEventListener('keydown', createKeyEvent(true), false);
  document.addEventListener('keyup', createKeyEvent(false), false);

  _three3D.renderer.autoClear = false;
});

(function animate() {
  stats.update();

  var pointerLockObject = pointerLockControls.getObject();

  _three3D.renderer.setScissorTest(true);
  _three3D.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  _three3D.renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
  _three3D.renderer.setClearColor(0x888888);
  _three3D.renderer.clear();

  var delta = clock.getDelta();
  if (!isFirst && gcontrols.controls === 'PointerLock') {
    if (pointerLockControls.enabled) {
      var _direction = new THREE.Vector3();
      if (pressed.w) {
        _direction.z -= 1;
      }
      if (pressed.a) {
        _direction.x -= 1;
      }
      if (pressed.s) {
        _direction.z += 1;
      }
      if (pressed.d) {
        _direction.x += 1;
      }
      _direction.normalize();

      var blocked = false;

      var collisionOrigin = pointerLockObject.position.clone().setY(gcontrols.blockedHeight);
      var collisionDirection = pointerLockObject.localToWorld(_direction.clone()).sub(pointerLockObject.localToWorld(new THREE.Vector3())).normalize();
      collisionRaycaster.set(collisionOrigin, collisionDirection);
      if (collisionRaycaster.intersectObjects(house.borders).length > 0) {
        blocked = true;
      }

      if (!blocked) {
        pointerLockObject.translateOnAxis(_direction, gcontrols.speed * delta);
      }

      if (mouseEvent) {
        pointerRaycaster.setFromCamera(new THREE.Vector2(mouseEvent.clientX / window.innerWidth * 2 - 1, mouseEvent.clientY / window.innerHeight * -2 + 1), pointerLockCamera);

        intersects = pointerRaycaster.intersectObjects(house.borders);

        if (intersects.length > 0 && house.doors.indexOf(intersects[0].object) === -1) {
          intersects = [];
        }
      }

      var isPointed = intersects.length > 0;
      document.getElementById('pointer').style.opacity = isPointed ? '1' : '0';
      document.getElementById('blocked').style.opacity = blocked && !isPointed ? '1' : '0';
    }
    _three3D.renderer.render(_three3D.scene, pointerLockCamera);
  } else {
    _three3D.controls.update();
    _three3D.renderer.render(_three3D.scene, _three3D.camera);
  }

  groundRaycaster.set(pointerLockObject.position, new THREE.Vector3(0, -1, 0));
  var intersectGrounds = groundRaycaster.intersectObjects(house.grounds);
  var roomName = intersectGrounds.length === 0 ? 'outside' : intersectGrounds[0].object.roomName;
  var characterPos = pointerLockObject.position;
  document.getElementById('position').innerHTML = '(' + Math.floor(characterPos.x) + ', ' + Math.floor(characterPos.z) + ')';
  document.getElementById('location').innerHTML = roomName[0].toUpperCase() + roomName.slice(1).replace(/[A-Z]/g, function (x) {
    return ' ' + x;
  });

  minimapCamera.position.copy(pointerLockObject.position).setY(300);

  var direction = pointerLockControls.getDirection(new THREE.Vector3(0, 0, -1));
  minimapCamera.rotation.z = Math.atan2(direction.x, direction.z);

  _three3D.renderer.setViewport(0, window.innerHeight - minimapSize, minimapSize, minimapSize);
  _three3D.renderer.setScissor(0, window.innerHeight - minimapSize, minimapSize, minimapSize);
  _three3D.renderer.setClearColor(0xaa8888);
  _three3D.renderer.clear();
  _three3D.renderer.render(_three3D.scene, minimapCamera);
  _three3D.renderer.setScissorTest(false);

  requestAnimationFrame(animate);
})();

},{"../../templates/three3D":8,"./House":2,"./rooms":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Door = require('./Door');

var _Door2 = _interopRequireDefault(_Door);

var _Wall = require('./Wall');

var _Wall2 = _interopRequireDefault(_Wall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roomHeight = 100;
var doorHeight = 60;
var balconyHeight = 30;

var balconyDepth = 60;

var doorWidthLarge = 40;
var doorWidthSmall = 30;

var bedRoomWest = {
  width: 120,
  depth: 144,
  door: new _Door2.default(doorWidthLarge, doorHeight, 'right', -1)
};

var balconyWest = {
  width: 66,
  depth: balconyDepth,
  door: new _Door2.default(doorWidthSmall, doorHeight, 'left', 1)
};

var drawingRoom = {
  width: 120,
  depth: bedRoomWest.depth,
  door: new _Door2.default(doorWidthLarge, doorHeight, 'right', -1)
};

var kitchen = {
  width: 84,
  depth: 108
};

var diningRoom = {
  width: bedRoomWest.width + drawingRoom.width - (balconyWest.width + kitchen.width),
  depth: kitchen.depth
};

var balconyNorthWest = {
  width: kitchen.width + diningRoom.width,
  depth: balconyDepth,
  door: new _Door2.default(doorWidthSmall, doorHeight, 'right', -1)
};

var shaft = {
  width: 120,
  depth: 60
};

var toiletSouthEast = {
  width: 84,
  depth: shaft.depth,
  door: new _Door2.default(doorWidthSmall, doorHeight, 'left', 1)
};

var toiletSouth = {
  width: 60,
  depth: bedRoomWest.depth - shaft.depth,
  door: new _Door2.default(doorWidthSmall, doorHeight, 'right', -1)
};

var bedRoomEast = {
  width: shaft.width + toiletSouthEast.width - toiletSouth.width,
  depth: 130,
  door: new _Door2.default(doorWidthLarge, doorHeight, 'left', 1)
};

var aisle = {
  width: toiletSouth.width,
  depth: bedRoomEast.depth - toiletSouth.depth
};

var bedRoomNorth = {
  width: 120,
  depth: balconyNorthWest.depth + diningRoom.depth - aisle.depth,
  door: new _Door2.default(doorWidthLarge, doorHeight, 'left', 1)
};

var balconyEast = {
  width: toiletSouth.width + bedRoomEast.width - bedRoomNorth.width,
  depth: balconyDepth,
  door: new _Door2.default(doorWidthSmall, doorHeight, 'left', 1)
};

var balconyNorthEast = {
  width: bedRoomNorth.width,
  depth: balconyDepth,
  door: new _Door2.default(doorWidthSmall, doorHeight, 'right', -1)
};

exports.default = {
  bedRoomWest: {
    height: roomHeight,
    size: [bedRoomWest.width, bedRoomWest.depth],
    nextTo: [null, null],
    walls: [[new _Wall2.default(balconyWest.width, roomHeight, 'north', { all: 'fb', right: 'r' }, 0, 2, -1, balconyWest.door, balconyWest.door.width / 2, 0, false), balconyWest.width / 2], [new _Wall2.default(bedRoomWest.width - balconyWest.width, roomHeight, 'north', 'fb', 0, 1, -3), (bedRoomWest.width - balconyWest.width) / -2], [new _Wall2.default(bedRoomWest.depth, roomHeight, 'west', 'fb', 0, 2, -1), bedRoomWest.depth / 2], [new _Wall2.default(bedRoomWest.width, roomHeight, 'south', 'fb', 0, 2, -1), bedRoomWest.width / 2], [new _Wall2.default(bedRoomWest.depth, roomHeight, 'east', { all: 'fb', right: 'r' }, 0, 1, -3, bedRoomWest.door, bedRoomWest.door.width / 2, -0.5, true), bedRoomWest.depth / 2]]
  },
  balconyWest: {
    height: balconyHeight,
    size: [balconyWest.width, balconyWest.depth],
    nextTo: [null, 'bedRoomWest'],
    walls: [[new _Wall2.default(balconyWest.width, balconyHeight, 'north', 'fb', 0, 2, -1), balconyWest.width / 2], [new _Wall2.default(balconyWest.depth, balconyHeight, 'west', 'fb', 0, 2, -1), balconyWest.depth / 2], [new _Wall2.default(balconyWest.width, 0, 'south', 'fb', 0, 1, -1, balconyWest.door, balconyWest.door.width / -2, -1.5, true), -balconyWest.width / 2]]
  },
  drawingRoom: {
    height: roomHeight,
    size: [drawingRoom.width, drawingRoom.depth],
    nextTo: ['bedRoomWest', null],
    walls: [[new _Wall2.default(drawingRoom.depth, roomHeight, 'west', { all: 'fb', left: 'l' }, 0, 1, 1, bedRoomWest.door, bedRoomWest.door.width / -2, 0, false), drawingRoom.depth / 2], [new _Wall2.default(drawingRoom.width, roomHeight, 'south', { all: 'fb', left: 'l', right: 'r' }, 0, 2, -1, drawingRoom.door, drawingRoom.door.width / 2, 0, true), drawingRoom.width / 2], [new _Wall2.default(drawingRoom.depth, roomHeight, 'east', 'fb', 0, 1, 1), drawingRoom.depth / 2]]
  },
  kitchen: {
    height: roomHeight,
    size: [kitchen.width, kitchen.depth],
    nextTo: ['balconyWest', 'drawingRoom'],
    walls: [[new _Wall2.default(kitchen.width, roomHeight, 'north', 'fb', 0, 2, -1), kitchen.width / 2], [new _Wall2.default(kitchen.depth, roomHeight, 'west', 'fb', 0, 2, -1), kitchen.depth / 2], [new _Wall2.default(bedRoomWest.width - balconyWest.width, roomHeight, 'south', 'fb', 0, 1, 1), (bedRoomWest.width - balconyWest.width) / -2]]
  },
  balconyNorthWest: {
    height: balconyHeight,
    size: [balconyNorthWest.width, balconyNorthWest.depth],
    nextTo: ['balconyWest', 'kitchen'],
    walls: [[new _Wall2.default(balconyNorthWest.width, balconyHeight, 'north', 'fb', 0, 2, -1), balconyNorthWest.width / 2], [new _Wall2.default(balconyNorthWest.depth, balconyHeight, 'west', 'fb', 0, 2, -1), balconyNorthWest.depth / 2], [new _Wall2.default(balconyNorthWest.width, 0, 'south', 'fb', 0, 1, -1, balconyNorthWest.door, balconyNorthWest.door.width / 2, -1.5, true), balconyNorthWest.width / 2]]
  },
  diningRoom: {
    height: roomHeight,
    size: [diningRoom.width, diningRoom.depth],
    nextTo: ['kitchen', 'drawingRoom'],
    walls: [[new _Wall2.default(diningRoom.width, roomHeight, 'north', { all: 'fb', left: 'l', right: 'r' }, 0, 2, -1, balconyNorthWest.door, balconyNorthWest.door.width / -2, 0, false), diningRoom.width / 2], [new _Wall2.default(diningRoom.depth - aisle.depth, roomHeight, 'east', 'fb', 0, 1, 1), (diningRoom.depth - aisle.depth) / 2]]
  },
  shaft: {
    height: roomHeight,
    size: [shaft.width, shaft.depth],
    nextTo: ['drawingRoom', null],
    walls: [[new _Wall2.default(shaft.width, roomHeight, 'north', 'fb', 0, 1, -1), shaft.width / 2], [new _Wall2.default(shaft.depth, roomHeight, 'west', 'fb', 0, 1, -3), shaft.depth / 2], [new _Wall2.default(shaft.width, roomHeight, 'south', 'fb', 0, 2, -1), shaft.width / 2], [new _Wall2.default(shaft.depth, roomHeight, 'east', 'fb', 0, 1, -1), shaft.depth / 2]]
  },
  toiletSouthEast: {
    height: roomHeight,
    size: [toiletSouthEast.width, toiletSouthEast.depth],
    nextTo: ['shaft', null],
    walls: [[new _Wall2.default(toiletSouthEast.width, roomHeight, 'north', { all: 'fb', left: 'l' }, 0, 1, -1, toiletSouthEast.door, toiletSouthEast.door.width / -2, -0.5, true), toiletSouthEast.width / 2], [new _Wall2.default(toiletSouthEast.depth, roomHeight, 'west', 'fb', 0, 1, -1), toiletSouthEast.depth / 2], [new _Wall2.default(toiletSouthEast.width, roomHeight, 'south', 'fb', 0, 2, -1), toiletSouthEast.width / 2], [new _Wall2.default(toiletSouthEast.depth, roomHeight, 'east', 'fb', 0, 2, -1), toiletSouthEast.depth / 2]]
  },
  toiletSouth: {
    height: roomHeight,
    size: [toiletSouth.width, toiletSouth.depth],
    nextTo: ['drawingRoom', 'shaft'],
    walls: [[new _Wall2.default(toiletSouth.width, roomHeight, 'north', { all: 'fb', right: 'r' }, 0, 2, -1, toiletSouth.door, toiletSouth.door.width / 2, 0, true), toiletSouth.width / 2], [new _Wall2.default(toiletSouth.depth, roomHeight, 'west', 'fb', 0, 1, -3), toiletSouth.depth / 2], [new _Wall2.default(toiletSouth.width, roomHeight, 'south', 'fb', 0, 1, -1), toiletSouth.width / 2], [new _Wall2.default(toiletSouth.depth, roomHeight, 'east', 'fb', 0, 1, -1), toiletSouth.depth / 2]]
  },
  bedRoomEast: {
    height: roomHeight,
    size: [bedRoomEast.width, bedRoomEast.depth],
    nextTo: ['toiletSouth', 'shaft'],
    walls: [[new _Wall2.default(bedRoomEast.width - balconyEast.width, roomHeight, 'north', 'fb', 0, 1, 1), (bedRoomEast.width - balconyEast.width) / 2], [new _Wall2.default(balconyEast.width, roomHeight, 'north', { all: 'fb', left: 'l', right: 'r' }, 0, 2, 1, balconyEast.door, balconyEast.door.width / 2, 0, false), balconyEast.width / -2], [new _Wall2.default(aisle.depth, roomHeight, 'west', { all: 'fb', right: 'r' }, 0, 2, 0, bedRoomEast.door, bedRoomEast.door.width / -2, 0, true), aisle.depth / -2], [new _Wall2.default(bedRoomEast.depth - aisle.depth, roomHeight, 'west', 'fbl', 0, 1, -1), (bedRoomEast.depth - aisle.depth) / 2], [new _Wall2.default(bedRoomEast.width, roomHeight, 'south', { all: 'fb', right: 'r' }, 0, 1, -1, toiletSouthEast.door, toiletSouthEast.door.width / 2, 0, false), bedRoomEast.width / 2], [new _Wall2.default(bedRoomEast.depth, roomHeight, 'east', 'fb', 0, 2, -1), bedRoomEast.depth / 2], [new _Wall2.default(_Wall2.default.singleDepth * 2, roomHeight - balconyHeight, 'east', 'fb', balconyHeight, 2, -1), '-' + _Wall2.default.singleDepth]]
  },
  aisle: {
    height: roomHeight,
    size: [aisle.width, aisle.depth],
    nextTo: ['drawingRoom', 'toiletSouth'],
    walls: [[new _Wall2.default(aisle.width, roomHeight, 'north', { all: 'fb', right: 'r' }, 0, 1, 1, bedRoomNorth.door, bedRoomNorth.door.width / 2, 0, false), aisle.width / 2]]
  },
  bedRoomNorth: {
    height: roomHeight,
    size: [bedRoomNorth.width, bedRoomNorth.depth],
    nextTo: ['drawingRoom', 'bedRoomEast'],
    walls: [[new _Wall2.default(bedRoomNorth.width, roomHeight, 'north', { all: 'fb', left: 'l' }, 0, 2, -1, balconyNorthEast.door, balconyNorthEast.door.width / -2, 0, false), bedRoomNorth.width / 2], [new _Wall2.default(balconyNorthWest.depth, roomHeight, 'west', 'fb', 0, 2, -1), balconyNorthWest.depth / -2], [new _Wall2.default(bedRoomNorth.depth - balconyNorthWest.depth, roomHeight, 'west', 'fb', 0, 1, -3), (bedRoomNorth.depth - balconyNorthWest.depth) / 2], [new _Wall2.default(bedRoomNorth.width, roomHeight, 'south', { all: 'fb', left: 'l' }, 0, 1, -3, bedRoomNorth.door, bedRoomNorth.door.width / -2, -0.5, true), bedRoomNorth.width / 2], [new _Wall2.default(bedRoomNorth.depth, roomHeight, 'east', 'fb', 0, 2, -1), bedRoomNorth.depth / 2]]
  },
  balconyEast: {
    height: balconyHeight,
    size: [balconyEast.width, balconyEast.depth],
    nextTo: ['bedRoomNorth', 'bedRoomEast'],
    walls: [[new _Wall2.default(balconyEast.width, balconyHeight, 'north', 'fb', 0, 2, -1), balconyEast.width / 2], [new _Wall2.default(balconyEast.depth, balconyHeight, 'east', 'fb', 0, 2, -1), balconyEast.depth / 2], [new _Wall2.default(balconyEast.width, 0, 'south', 'fb', 0, 1, -1, balconyEast.door, balconyEast.door.width / -2, 0.5, true), balconyEast.width / 2]]
  },
  balconyNorthEast: {
    height: balconyHeight,
    size: [balconyNorthEast.width, balconyNorthEast.depth],
    nextTo: ['drawingRoom', 'bedRoomNorth'],
    walls: [[new _Wall2.default(balconyNorthEast.width, balconyHeight, 'north', 'fb', 0, 2, -1), balconyNorthEast.width / 2], [new _Wall2.default(balconyNorthEast.depth, balconyHeight, 'west', 'fb', 0, 2, -1), balconyNorthEast.depth / 2], [new _Wall2.default(balconyNorthEast.width, 0, 'south', 'fb', 0, 1, -1, balconyNorthEast.door, balconyNorthEast.door.width / 2, -1.5, true), balconyNorthEast.width / 2], [new _Wall2.default(balconyNorthEast.depth, balconyHeight, 'east', 'fb', 0, 2, -1), balconyNorthEast.depth / 2]]
  }
};

},{"./Door":1,"./Wall":4}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./three":7}]},{},[5]);
