/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

var canvas = document.querySelector("canvas");
var getContext = canvas.getContext("2d");
var radius = canvas.height / 2;
getContext.translate(radius, radius);
radius = radius * .9;
setInterval(drawClock, 1000);

function drawClock() {
  drawClockFace(getContext, radius);
  drawClockNumber(getContext, radius);
  drawClockTime(getContext, radius);
}

function drawClockFace(getContext, radius) {
  var gradian = null;
  getContext.beginPath();
  getContext.arc(0, 0, radius, 0, 2 * Math.PI);
  getContext.fillStyle = "#eee";
  getContext.fill();
  gradian = getContext.createRadialGradient(0, 0, radius * .95, 0, 0, radius * 1.05);
  gradian.addColorStop(0, "#000");
  gradian.addColorStop(.5, "#fff");
  gradian.addColorStop(1, "#333");
  getContext.strokeStyle = gradian;
  getContext.lineWidth = radius * .1;
  getContext.stroke();
  getContext.beginPath();
  getContext.arc(0, 0, radius * .1, 0, 2 * Math.PI);
  getContext.fillStyle = "#000";
  getContext.fill();
}

function drawClockNumber(getContext, radius) {
  var ang;
  var num;
  getContext.font = radius * .15 + "px arial";
  getContext.textBaseline = "middle";
  getContext.textAlign = "center";

  for (num = 1; num < 13; num++) {
    ang = num * Math.PI / 6;
    getContext.rotate(ang);
    getContext.translate(0, -radius * 0.85);
    getContext.rotate(-ang);
    getContext.fillText(num.toString(), 0, 0);
    getContext.rotate(ang);
    getContext.translate(0, radius * 0.85);
    getContext.rotate(-ang);
  }
}

function drawClockTime(getContext, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds(); //hour

  hour = hour % 12;
  hour = hour * Math.PI / 6 + minute * Math.PI / (6 * 60) + second * Math.PI / (360 * 60);
  drawHand(getContext, hour, radius * 0.5, radius * 0.07); //minute

  minute = minute * Math.PI / 30 + second * Math.PI / (30 * 60);
  drawHand(getContext, minute, radius * 0.8, radius * 0.07); // second

  second = second * Math.PI / 30;
  console.log(second);
  drawHand(getContext, second, radius * 0.9, radius * 0.02);
}

function drawHand(getContext, pos, length, width) {
  getContext.beginPath();
  getContext.lineWidth = width;
  getContext.moveTo(0, 0);
  getContext.rotate(pos);
  getContext.lineTo(0, -length);
  getContext.stroke();
  getContext.rotate(-pos);
}

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map