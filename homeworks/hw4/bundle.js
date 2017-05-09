(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _three3D = require('../../templates/three3D');

var groundSize = 100;

var isMouseIn = false;
var mouseMovePos = new THREE.Vector2();
var mouseDownPos = new THREE.Vector2();

var picks = [];

var currentConfig = {};

[[50, 100, -50], [-30, 80, 10]].forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      x = _ref2[0],
      y = _ref2[1],
      z = _ref2[2];

  var light = new THREE.PointLight();
  light.position.set(x, y, z);
  _three3D.scene.add(light);
});

var ground = new THREE.Mesh(new THREE.PlaneGeometry(groundSize, groundSize), new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }));
ground.rotation.x = Math.PI / -2;
_three3D.scene.add(ground);

var grid = new THREE.GridHelper(100, 20, 0xff0000, 0xffffff);
_three3D.scene.add(grid);

var cursor = new THREE.Mesh(undefined, new THREE.MeshPhongMaterial({ transparent: true, opacity: 0.5 }));
_three3D.scene.add(cursor);

/* eslint-disable no-param-reassign */
function initMesh(mesh, _ref3) {
  var geometry = _ref3.geometry,
      color = _ref3.color,
      size = _ref3.size,
      rotation = _ref3.rotation;

  switch (geometry) {
    case 'Box':
      mesh.geometry = new THREE.BoxGeometry(size, size, size);
      break;
    case 'Sphere':
      mesh.geometry = new THREE.SphereGeometry(size / 2, 16, 16);
      break;
    case 'TorusKnot':
      mesh.geometry = new THREE.TorusKnotGeometry(size / 2, size / 5, 16, 16);
      break;
    default:
      throw new Error('invalid geometry: ' + geometry);
  }

  mesh.rotation.y = rotation;
  mesh.material.color.setStyle(color);
}
/* eslint-enable no-param-reassign */

function onFormChange() {
  currentConfig.geometry = document.forms[0].elements.geometry.value;
  currentConfig.color = document.forms[0].elements.color.value;
  currentConfig.size = document.forms[0].elements.size.value;
  currentConfig.rotation = document.forms[0].elements.rotation.value;
  initMesh(cursor, currentConfig);
}

function onMouseMove(event) {
  var raycaster = new THREE.Raycaster();
  mouseMovePos.set(event.clientX / $(_three3D.renderer.domElement).innerWidth() * 2 - 1, event.clientY / $(_three3D.renderer.domElement).innerHeight() * -2 + 1);
  raycaster.setFromCamera(mouseMovePos, _three3D.camera);
  var intersects = raycaster.intersectObject(ground);
  isMouseIn = intersects.length !== 0;
  if (isMouseIn) {
    cursor.position.copy(intersects[0].point);
  }
}

function onMouseDown() {
  if (isMouseIn) {
    mouseDownPos.copy(mouseMovePos);
  }
}

function onMouseUp() {
  if (isMouseIn && mouseDownPos.equals(mouseMovePos)) {
    var cloned = cursor.clone(true);
    cloned.material = cloned.material.clone();
    cloned.material.opacity = 1;
    _three3D.scene.add(cloned);
    picks.push({
      mesh: cloned,
      config: Object.assign({}, currentConfig, { x: cloned.position.x, z: cloned.position.z })
    });
  }
}

function onWindowResize() {
  var width = $('.left').innerWidth();
  _three3D.camera.aspect = width / window.innerHeight;
  _three3D.camera.updateProjectionMatrix();
  _three3D.renderer.setSize(width, window.innerHeight);
}

function onClearClick() {
  while (picks.length !== 0) {
    var pick = picks.pop();
    _three3D.scene.remove(pick.mesh);
  }
}

function onSaveClick() {
  localStorage.setItem('picks', JSON.stringify(picks.map(function (pick) {
    return pick.config;
  })));
}

function onRestoreClick() {
  var storedData = localStorage.getItem('picks');
  if (storedData === null) {
    // eslint-disable-next-line no-alert
    alert('No stored items');
  } else {
    var storedConfigs = JSON.parse(storedData);
    onClearClick();
    picks.splice(0);
    storedConfigs.forEach(function (storedConfig) {
      var storedMesh = new THREE.Mesh(undefined, new THREE.MeshPhongMaterial());
      initMesh(storedMesh, storedConfig);
      storedMesh.position.x = storedConfig.x;
      storedMesh.position.z = storedConfig.z;
      picks.push({
        mesh: storedMesh,
        config: storedConfig
      });
      _three3D.scene.add(storedMesh);
    });
  }
}

(0, _three3D.init)(function () {
  $(_three3D.renderer.domElement).detach().appendTo('.left');

  _three3D.camera.position.set(0, 100, 150);
  _three3D.scene.add(_three3D.camera);

  onFormChange();
  onWindowResize();

  $('.clear').click(onClearClick);
  $('.save').click(onSaveClick);
  $('.restore').click(onRestoreClick);
  window.addEventListener('resize', onWindowResize, false);
  document.forms[0].addEventListener('input', onFormChange, false);
  document.forms[0].addEventListener('change', onFormChange, false);
  _three3D.renderer.domElement.addEventListener('mouseup', onMouseUp, false);
  _three3D.renderer.domElement.addEventListener('mousedown', onMouseDown, false);
  _three3D.renderer.domElement.addEventListener('mousemove', onMouseMove, false);
}, { resize: false });

(0, _three3D.animate)(function () {
  _three3D.controls.update();
});

},{"../../templates/three3D":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./three":2}]},{},[1]);
