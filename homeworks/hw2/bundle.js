(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Door = function (_THREE$Object3D) {
  _inherits(Door, _THREE$Object3D);

  /**
   * @param {number} width
   * @param {number} height
   * @param {'left'|'right'} axis
   * @param {number} direction
   */
  function Door(width, height, axis, direction) {
    _classCallCheck(this, Door);

    var _this = _possibleConstructorReturn(this, (Door.__proto__ || Object.getPrototypeOf(Door)).call(this));

    var container = new THREE.Object3D();

    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));

    mesh.position.x = width / 2 * (axis === 'left' ? -1 : 1);
    container.add(mesh);

    container.position.x = -mesh.position.x;
    _this.add(container);

    _this.width = width;
    _this.height = height;
    _this.axis = axis;

    _this.container = container;

    var sign = 1;
    setInterval(function () {
      _this.container.rotation.y += direction * sign * 0.1;
      if (direction < 0 && (_this.container.rotation.y < Math.PI / -2 || _this.container.rotation.y > 0) || direction > 0 && (_this.container.rotation.y > Math.PI / 2 || _this.container.rotation.y < 0)) {
        sign *= -1;
      }
    }, 50);
    return _this;
  }

  return Door;
}(THREE.Object3D);

exports.default = Door;

},{}],2:[function(require,module,exports){
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

    var ground = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), new THREE.MeshNormalMaterial());
    ground.rotation.x = Math.PI / -2;
    _this.add(ground);

    walls.forEach(function (wall, index) {
      var wallPosition = wallPositions[index];
      var isNegative = wallPosition < 0 || 1 / wallPosition === -Infinity;

      var wallPositionX = isNegative ? width + wallPosition : wallPosition;
      var wallPositionZ = isNegative ? depth + wallPosition : wallPosition;

      switch (wall.direction) {
        case 'north':
          wall.position.set(width / -2, wall.height / 2, depth / -2).add(new THREE.Vector3(wallPositionX, 0, 0));
          break;
        case 'west':
          wall.position.set(width / -2, wall.height / 2, depth / 2).add(new THREE.Vector3(0, 0, -wallPositionZ));
          break;
        case 'south':
          wall.position.set(width / 2, wall.height / 2, depth / 2).add(new THREE.Vector3(-wallPositionX, 0, 0));
          break;
        case 'east':
          wall.position.set(width / 2, wall.height / 2, depth / -2).add(new THREE.Vector3(0, 0, wallPositionZ));
          break;
        default:
          break;
      }
      _this.add(wall);
    });

    _this.width = width;
    _this.height = height;
    _this.depth = depth;
    _this.walls = walls;
    return _this;
  }

  return Room;
}(THREE.Object3D);

exports.default = Room;

},{"./Wall":3}],3:[function(require,module,exports){
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

var directions = ['north', 'west', 'south', 'east'];

var Wall = function (_THREE$Object3D) {
  _inherits(Wall, _THREE$Object3D);

  _createClass(Wall, null, [{
    key: 'directions',
    get: function get() {
      return directions;
    }

    /**
     * @param {number} width
     * @param {number} height
     * @param {'north'|'west'|'south'|'east'} direction
     * @param {THREE.Side} side
     * @param {Door} door
     * @param {number} doorPosition
     * @param {boolean} holdDoor
     */

  }]);

  function Wall(width, height, direction, side, door, doorPosition) {
    var holdDoor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    _classCallCheck(this, Wall);

    var _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this));

    var container = new THREE.Object3D();
    container.rotation.y = directions.indexOf(direction) * (Math.PI / 2);
    _this.add(container);

    if (!door) {
      var mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshNormalMaterial({ side: side }));
      container.add(mesh);
    } else {
      var isNegative = doorPosition < 0 || 1 / doorPosition === -Infinity;
      var doorDeltaX = door.width / -2 + (isNegative ? width + doorPosition : doorPosition);
      var partitions = [[0, door.height, width, height - door.height], [0, 0, doorDeltaX, height], [doorDeltaX + door.width, 0, width - doorDeltaX - door.width, height]];
      partitions.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 4),
            left = _ref2[0],
            bottom = _ref2[1],
            partitionWidth = _ref2[2],
            partitionHeight = _ref2[3];

        if (partitionWidth > 0 && partitionHeight > 0) {
          var _mesh = new THREE.Mesh(new THREE.PlaneGeometry(partitionWidth, partitionHeight), new THREE.MeshNormalMaterial({ side: side }));
          _mesh.position.set(width / -2 + partitionWidth / 2 + left, height / -2 + partitionHeight / 2 + bottom, 0);
          container.add(_mesh);
        }
      });

      if (holdDoor) {
        var doorPositionX = width / -2 + (isNegative ? width + doorPosition : doorPosition);
        door.position.set(doorPositionX, height / -2 + door.height / 2, 0);
        container.add(door);
      }
    }

    _this.width = width;
    _this.height = height;
    _this.direction = direction;
    return _this;
  }

  return Wall;
}(THREE.Object3D);

exports.default = Wall;

},{"./Door":1}],4:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _three3D = require('../../templates/three3D');

var _Room = require('./Room');

var _Room2 = _interopRequireDefault(_Room);

var _rooms = require('./rooms');

var _rooms2 = _interopRequireDefault(_rooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _three3D.init)(function () {
  _three3D.camera.position.set(0, 800, 600);

  var gridHelper = new THREE.GridHelper(450, 45, 0xffffff, 0xffffff);
  gridHelper.position.y = 0.1;
  _three3D.scene.add(gridHelper);

  var house = new THREE.Object3D();
  house.position.set(-225, 0, 225);
  _three3D.scene.add(house);

  var coords = { x: 1, z: -1 };

  var rooms = {};
  Object.keys(_rooms2.default).forEach(function (roomName) {
    var roomConfig = _rooms2.default[roomName];

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
    house.add(room);
    rooms[roomName] = room;
  });
});

(0, _three3D.animate)(function () {
  _three3D.controls.update();
});

},{"../../templates/three3D":7,"./Room":2,"./rooms":5}],5:[function(require,module,exports){
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
var balconyHeight = 40;

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
  depth: 120,
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
    walls: [[new _Wall2.default(balconyWest.width, roomHeight, 'north', THREE.DoubleSide, balconyWest.door, balconyWest.door.width / 2, false), balconyWest.width / 2], [new _Wall2.default(bedRoomWest.width - balconyWest.width, roomHeight, 'north', THREE.FrontSide), (bedRoomWest.width - balconyWest.width) / -2], [new _Wall2.default(bedRoomWest.depth, roomHeight, 'west', THREE.DoubleSide), bedRoomWest.depth / 2], [new _Wall2.default(bedRoomWest.width, roomHeight, 'south', THREE.DoubleSide), bedRoomWest.width / 2], [new _Wall2.default(bedRoomWest.depth, roomHeight, 'east', THREE.FrontSide, bedRoomWest.door, bedRoomWest.door.width / 2, true), bedRoomWest.depth / 2]]
  },
  balconyWest: {
    height: balconyHeight,
    size: [balconyWest.width, balconyWest.depth],
    nextTo: [null, 'bedRoomWest'],
    walls: [[new _Wall2.default(balconyWest.width, balconyHeight, 'north', THREE.DoubleSide), balconyWest.width / 2], [new _Wall2.default(balconyWest.depth, balconyHeight, 'west', THREE.DoubleSide), balconyWest.depth / 2], [new _Wall2.default(balconyWest.width, 0, 'south', THREE.FrontSide, balconyWest.door, balconyWest.door.width / -2, true), -balconyWest.width / 2]]
  },
  drawingRoom: {
    height: roomHeight,
    size: [drawingRoom.width, drawingRoom.depth],
    nextTo: ['bedRoomWest', null],
    walls: [[new _Wall2.default(drawingRoom.depth, roomHeight, 'west', THREE.FrontSide, bedRoomWest.door, bedRoomWest.door.width / -2, false), drawingRoom.depth / 2], [new _Wall2.default(drawingRoom.width, roomHeight, 'south', THREE.DoubleSide, drawingRoom.door, drawingRoom.door.width / 2, true), drawingRoom.width / 2], [new _Wall2.default(drawingRoom.depth, roomHeight, 'east', THREE.FrontSide), drawingRoom.depth / 2]]
  },
  kitchen: {
    height: roomHeight,
    size: [kitchen.width, kitchen.depth],
    nextTo: ['balconyWest', 'drawingRoom'],
    walls: [[new _Wall2.default(kitchen.width, roomHeight, 'north', THREE.DoubleSide), kitchen.width / 2], [new _Wall2.default(kitchen.depth, roomHeight, 'west', THREE.DoubleSide), kitchen.depth / 2], [new _Wall2.default(bedRoomWest.width - balconyWest.width, roomHeight, 'south', THREE.FrontSide), (bedRoomWest.width - balconyWest.width) / -2]]
  },
  balconyNorthWest: {
    height: balconyHeight,
    size: [balconyNorthWest.width, balconyNorthWest.depth],
    nextTo: ['balconyWest', 'kitchen'],
    walls: [[new _Wall2.default(balconyNorthWest.width, balconyHeight, 'north', THREE.DoubleSide), balconyNorthWest.width / 2], [new _Wall2.default(balconyNorthWest.depth, balconyHeight, 'west', THREE.DoubleSide), balconyNorthWest.depth / 2], [new _Wall2.default(balconyNorthWest.width, 0, 'south', THREE.FrontSide, balconyNorthWest.door, balconyNorthWest.door.width / 2, true), balconyNorthWest.width / 2]]
  },
  diningRoom: {
    height: roomHeight,
    size: [diningRoom.width, diningRoom.depth],
    nextTo: ['kitchen', 'drawingRoom'],
    walls: [[new _Wall2.default(diningRoom.width, roomHeight, 'north', THREE.DoubleSide, balconyNorthWest.door, balconyNorthWest.door.width / -2, false), diningRoom.width / 2], [new _Wall2.default(diningRoom.depth - aisle.depth, roomHeight, 'east', THREE.FrontSide), (diningRoom.depth - aisle.depth) / 2]]
  },
  shaft: {
    height: roomHeight,
    size: [shaft.width, shaft.depth],
    nextTo: ['drawingRoom', null],
    walls: [[new _Wall2.default(shaft.width, roomHeight, 'north', THREE.FrontSide), shaft.width / 2], [new _Wall2.default(shaft.depth, roomHeight, 'west', THREE.FrontSide), shaft.depth / 2], [new _Wall2.default(shaft.width, roomHeight, 'south', THREE.DoubleSide), shaft.width / 2], [new _Wall2.default(shaft.depth, roomHeight, 'east', THREE.FrontSide), shaft.depth / 2]]
  },
  toiletSouthEast: {
    height: roomHeight,
    size: [toiletSouthEast.width, toiletSouthEast.depth],
    nextTo: ['shaft', null],
    walls: [[new _Wall2.default(toiletSouthEast.width, roomHeight, 'north', THREE.FrontSide, toiletSouthEast.door, toiletSouthEast.door.width / -2, true), toiletSouthEast.width / 2], [new _Wall2.default(toiletSouthEast.depth, roomHeight, 'west', THREE.FrontSide), toiletSouthEast.depth / 2], [new _Wall2.default(toiletSouthEast.width, roomHeight, 'south', THREE.DoubleSide), toiletSouthEast.width / 2], [new _Wall2.default(toiletSouthEast.depth, roomHeight, 'east', THREE.DoubleSide), toiletSouthEast.depth / 2]]
  },
  toiletSouth: {
    height: roomHeight,
    size: [toiletSouth.width, toiletSouth.depth],
    nextTo: ['drawingRoom', 'shaft'],
    walls: [[new _Wall2.default(toiletSouth.width, roomHeight, 'north', THREE.DoubleSide, toiletSouth.door, toiletSouth.door.width / 2, true), toiletSouth.width / 2], [new _Wall2.default(toiletSouth.depth, roomHeight, 'west', THREE.FrontSide), toiletSouth.depth / 2], [new _Wall2.default(toiletSouth.width, roomHeight, 'south', THREE.FrontSide), toiletSouth.width / 2], [new _Wall2.default(toiletSouth.depth, roomHeight, 'east', THREE.FrontSide), toiletSouth.depth / 2]]
  },
  bedRoomEast: {
    height: roomHeight,
    size: [bedRoomEast.width, bedRoomEast.depth],
    nextTo: ['toiletSouth', 'shaft'],
    walls: [[new _Wall2.default(bedRoomEast.width - balconyEast.width, roomHeight, 'north', THREE.FrontSide), (bedRoomEast.width - balconyEast.width) / 2], [new _Wall2.default(balconyEast.width, roomHeight, 'north', THREE.DoubleSide, balconyEast.door, balconyEast.door.width / 2, false), balconyEast.width / -2], [new _Wall2.default(aisle.depth, roomHeight, 'west', THREE.DoubleSide, bedRoomEast.door, bedRoomEast.door.width / -2, true), aisle.depth / -2], [new _Wall2.default(bedRoomEast.depth - bedRoomEast.door.width, roomHeight, 'west', THREE.FrontSide), (bedRoomEast.depth - bedRoomEast.door.width) / 2], [new _Wall2.default(bedRoomEast.width, roomHeight, 'south', THREE.FrontSide, toiletSouthEast.door, toiletSouthEast.door.width / 2, false), bedRoomEast.width / 2], [new _Wall2.default(bedRoomEast.depth, roomHeight, 'east', THREE.DoubleSide), bedRoomEast.depth / 2]]
  },
  aisle: {
    height: roomHeight,
    size: [aisle.width, aisle.depth],
    nextTo: ['drawingRoom', 'toiletSouth'],
    walls: [[new _Wall2.default(aisle.width, roomHeight, 'north', THREE.FrontSide, bedRoomNorth.door, bedRoomNorth.door.width / 2, false), aisle.width / 2]]
  },
  bedRoomNorth: {
    height: roomHeight,
    size: [bedRoomNorth.width, bedRoomNorth.depth],
    nextTo: ['drawingRoom', 'bedRoomEast'],
    walls: [[new _Wall2.default(bedRoomNorth.width, roomHeight, 'north', THREE.DoubleSide, balconyNorthEast.door, balconyNorthEast.door.width / -2, false), bedRoomNorth.width / 2], [new _Wall2.default(balconyNorthWest.depth, roomHeight, 'west', THREE.DoubleSide), balconyNorthWest.depth / -2], [new _Wall2.default(bedRoomNorth.depth - balconyNorthWest.depth, roomHeight, 'west', THREE.FrontSide), (bedRoomNorth.depth - balconyNorthWest.depth) / 2], [new _Wall2.default(bedRoomNorth.width, roomHeight, 'south', THREE.FrontSide, bedRoomNorth.door, bedRoomNorth.door.width / -2, true), bedRoomNorth.width / 2], [new _Wall2.default(bedRoomNorth.depth, roomHeight, 'east', THREE.DoubleSide), bedRoomNorth.depth / 2]]
  },
  balconyEast: {
    height: balconyHeight,
    size: [balconyEast.width, balconyEast.depth],
    nextTo: ['bedRoomNorth', 'bedRoomEast'],
    walls: [[new _Wall2.default(balconyEast.width, balconyHeight, 'north', THREE.DoubleSide), balconyEast.width / 2], [new _Wall2.default(balconyEast.depth, balconyHeight, 'east', THREE.DoubleSide), balconyEast.depth / 2], [new _Wall2.default(balconyEast.width, 0, 'south', THREE.FrontSide, balconyEast.door, balconyEast.door.width / -2, true), balconyEast.width / 2]]
  },
  balconyNorthEast: {
    height: balconyHeight,
    size: [balconyNorthEast.width, balconyNorthEast.depth],
    nextTo: ['drawingRoom', 'bedRoomNorth'],
    walls: [[new _Wall2.default(balconyNorthEast.width, balconyHeight, 'north', THREE.DoubleSide), balconyNorthEast.width / 2], [new _Wall2.default(balconyNorthEast.depth, balconyHeight, 'west', THREE.DoubleSide), balconyNorthEast.depth / 2], [new _Wall2.default(balconyNorthEast.width, 0, 'south', THREE.FrontSide, balconyNorthEast.door, balconyNorthEast.door.width / 2, true), balconyNorthEast.width / 2], [new _Wall2.default(balconyNorthEast.depth, balconyHeight, 'east', THREE.DoubleSide), balconyNorthEast.depth / 2]]
  }
};

},{"./Door":1,"./Wall":3}],6:[function(require,module,exports){
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

  (0, _three.init)(camera, function () {
    window.addEventListener('resize', onWindowResize, false);
    callback();
  });
}

function animate() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  (0, _three.animate)(camera, callback);
}

},{"./three":6}]},{},[4]);
