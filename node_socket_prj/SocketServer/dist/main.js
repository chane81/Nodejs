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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
var koa_1 = __importDefault(__webpack_require__(/*! koa */ "koa"));
var http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
// 설정 세팅
dotenv_1.default.config();
var app = new koa_1.default();
var server = new http_1.default.Server(app.callback());
var socketIo = __webpack_require__(/*! socket.io */ "socket.io")(server, {
    pingInterval: 10000,
    pingTimeout: 10000,
    transports: ['websocket', 'polling']
});
// 포트
var port = Number(process.env.PORT) || 5000;
// 개발모드인지 여부 true/false
var dev = "development" !== 'production';
// 접속 클라이언틑 정보
var clientPool = [];
// 소켓통신 이벤트 핸들러
// connection
socketIo.on('connection', function (socket) {
    //connectPool.push(socket.request);
    console.log(socket.handshake.query);
    console.log("development");
    // 클라이언트 정보
    var clientInfo = {
        socketId: socket.id,
        socketName: socket.handshake.query
    };
    // 클라이언트 정보 PUSH
    clientPool.push(clientInfo);
    console.log('접속 클라이언트들:', clientPool);
    // SERVER RECEIVE 이벤트 핸들러(클라이언트 -> 서버)
    socket.on('client.msg.send', function (context) {
        console.log(context);
    });
    // socket.on('message.chat2', data => {
    //   messages['chat2'].push(data)
    //   socket.broadcast.emit('message.chat2', data)
    // })
    // socket.on('error', (err) => {
    //   console.log('Error connecting to server', err);
    // });
});
// http 라우터 관련 로직
// CORS 관련 옵션 설정
// app.use(cors({
//   origin: (ctx) => '*'
// }));
// app.use(bodyParser());
// router.get('/messages/:chat', (ctx, next) => {
//   console.log(messages[ctx.params.chat]);
//   ctx.body = JSON.stringify(messages[ctx.params.chat]);
// });
// router.get('*', async (ctx, next) => {
//   return await nextHandler(ctx.req, ctx.res);
// })
//app.use(router.routes());
// 서버 listen
server.listen(port, function (err) {
    if (err)
        throw err;
    console.log("> Ready on http://localhost:" + port);
});


/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map