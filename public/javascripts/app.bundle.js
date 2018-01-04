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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// var vm = avalon.define({
//   $id: "app",
//   name: "HUO BI",
//   list: {'btcusdt': {}, 'bchusdt': {}, 'dashusdt': {}, 'ethusdt': {}, 'zecusdt': {}, 'ltcusdt': {}, 'qtumusdt': {}}
// })
var data = [];
if (localStorage.getItem('USER')) data = JSON.parse(localStorage.getItem('USER'));
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Huo Bi Online',
    list: [],
    usdt: ['btcusdt', 'bchusdt', 'dashusdt', 'ethusdt', 'zecusdt', 'ltcusdt', 'qtumusdt', 'xrpusdt', 'etcusdt', 'eosusdt', 'hsrusdt', 'omgusdt'],
    usd: {},
    loading: true,
    data: data,
    connectionNumber: 0,
    hlv: 6.556,
    item: {}
  },
  methods: {
    clear: function clear() {
      this.item = {};
    },
    Purchase: function Purchase() {
      // this.item.time = new Date().getTime()
      var myItem = {};
      for (var i in this.item) {
        myItem[i] = this.item[i];
      }
      app.data.push(myItem);
      data = app.data;
      localStorage.setItem('USER', JSON.stringify(data));
      $('#myModal').modal('hide');
    },
    remove: function remove(x) {
      data[x] = null;
      app.data = [];
      for (var i in data) {
        if (data[i]) app.data.push(data[i]);
      }
      data = app.data;
      localStorage.setItem('USER', JSON.stringify(data));
    },
    calcMoney: function calcMoney(o, n) {
      if (o) {
        var num = n.num * o - n.num * n.usdt;
        return num.toFixed(4);
      }
      return '';
    },
    calcMoneyClass: function calcMoneyClass(o, n) {
      if (o) {
        var num = n.num * o - n.num * n.usdt;
        return num > 0 ? 'success' : 'warning';
      }
      return '';
    }
  }
});
// new Vue({
//   el:'#app',
//   data: {
//     message:'Hello World!'
//   }
// });
var socket = io.connect('/');
var list = [];

socket.emit('isSocketId', new Date().getTime().toString() + 'a' + parseInt(Math.random() * 9999).toString());
socket.on('connectionNumber', function (data) {
  app.connectionNumber = data;
});
socket.on('news', function (data) {
  this.loading = false;
  app.usd[data.name] = data.tick.close;
  data.name = data.name.replace('usdt', '').toLocaleUpperCase();
  list[parseInt(data.id)] = data;
  // app.list = list
  app.list = [];
  for (var i in list) {
    app.list.push(list[i]);
  }
  this.loading = true;
  // let num = data.tick.close * a - (a * b)
  // document.getElementById('show').innerHTML = JSON.stringify(data)
  // document.getElementById('showNum').innerHTML = num.toFixed(4) + ' ---- ' + (num * 7.2).toFixed(4)
});
// vm.list.bchusdt = {id: '123123213', tick: {close: '123123'}}
// app.list = [4, 5, 6]

/***/ })
/******/ ]);