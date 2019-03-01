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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
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
var koa2_cors_1 = __importDefault(__webpack_require__(/*! koa2-cors */ "koa2-cors"));
var net_1 = __importDefault(__webpack_require__(/*! net */ "net"));
var lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));
var v1_1 = __importDefault(__webpack_require__(/*! uuid/v1 */ "uuid/v1"));
/* 설정 세팅 =================================================================================================*/
dotenv_1.default.config();
var app = new koa_1.default();
var server = new http_1.default.Server(app.callback());
var socketIo = __webpack_require__(/*! socket.io */ "socket.io")(server, {
    pingInterval: 10000,
    pingTimeout: 10000,
    transports: ['websocket', 'polling']
});
// 포트
var socketIoPort = Number(process.env.SOCKET_IO_PORT) || 5000;
var ip = process.env.IP || '127.0.0.1';
var netPort = Number(process.env.NET_PORT) || 5001;
// 개발모드인지 여부 true/false
var dev = "development" !== 'production';
// CORS 관련 옵션 설정
app.use(koa2_cors_1.default({
    origin: function (ctx) { return '*'; }
}));
// 접속 클라이언틑 정보
var clientPool = [];
// 접속한 클라이언트들 로그로 보여주기
function connectClients() {
    console.log('접속 클라이언트들:');
    clientPool.map(function (data) {
        var uniqueId = data.uniqueId, socketName = data.socketName, socketGubun = data.socketGubun;
        console.log("socketGubun:" + socketGubun + ", uniqueId:" + uniqueId + ", socketName:" + socketName);
    });
}
/* 설정 세팅 =================================================================================================*/
/* SOCKET.IO 서버 =================================================================================================*/
// 소켓통신 이벤트 핸들러
// connection
socketIo.on('connection', function (socket) {
    // 클라이언트 정보
    var clientInfo = {
        clientSocket: socket,
        uniqueId: socket.id,
        socketName: socket.handshake.query.socketName,
        socketGubun: 'socket.io'
    };
    // 클라이언트 정보 PUSH
    clientPool.push(clientInfo);
    // 접속한 클라이언트들 보여주기
    connectClients();
    // SERVER RECEIVE 이벤트 핸들러(클라이언트 -> 서버)
    socket.on('disconnect', function (context) {
        lodash_1.default.remove(clientPool, function (data) { return data.uniqueId === socket.id; });
        console.log('socket.io client disconnected!');
    });
    socket.on('client.msg.send', function (context) {
        console.log('socket.io data:', context);
        socket.broadcast.emit('client.msg.receive', context);
        // .NET 클라이언트에게로 메시지 보내기
        clientPool.filter(function (data) { return data.socketGubun === 'net'; }).map(function (data) {
            data.clientSocket.write(JSON.stringify({
                action: 'client.msg.receive',
                data: context
            }), function (err) {
            });
        });
    });
});
// app.use(bodyParser());
// router.get('/messages/:chat', (ctx, next) => {
//   console.log(messages[ctx.params.chat]);
//   ctx.body = JSON.stringify(messages[ctx.params.chat]);
// });
// router.get('*', async (ctx, next) => {
//   return await nextHandler(ctx.req, ctx.res);
// })
//app.use(router.routes());
// socket.io 서버 listen
server.listen(socketIoPort, ip, function (err) {
    if (err)
        throw err;
    console.log("> SOCKET.IO Server Listening! http://localhost:" + socketIoPort);
});
/* SOCKET.IO 서버 =================================================================================================*/
/* NET 서버 =======================================================================================================*/
// net 서버 listen
// const netServer = net.createServer((socket: any) => {
// 	console.log('> Ready On NET Server!');
// 	socket.on('end', () => {
// 		console.log('> NET Server End');
// 	});
// 	socket.on('');
// });
var netServer = net_1.default.createServer(function (socket) {
    var remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
    console.log('client connected:', remoteAddress);
    // clientPool.map((data) => {
    // 	console.log('접속 클라이언트들:', data.socketName, data.uniqueId);
    // });
    // 클라이언트 정보
    var clientInfo = {
        clientSocket: socket,
        uniqueId: v1_1.default(),
        socketName: '',
        socketGubun: 'net'
    };
    // 클라이언트에게 uniqueId 를 전송함
    socket.write(JSON.stringify({
        action: 'client.msg.connected',
        data: clientInfo.uniqueId
    }));
    // 클라이언트 정보 PUSH
    clientPool.push(clientInfo);
    // 접속한 클라이언트들 보여주기
    connectClients();
    socket.on('data', function (data) {
        var msg = data.toString();
        console.log('net data:', msg);
        // 브라우저쪽으로 .NET 클라이언트에서 보낸 메세지 보내기
        clientPool.filter(function (data) { return data.socketGubun === 'socket.io'; }).map(function (data) {
            data.clientSocket.emit('client.msg.receive', msg);
        });
    });
    socket.on('close', function () {
        console.log('NET Server Closed!');
        // 연결 끊어진 소켓을 클라이언트풀에서 삭제처리
        lodash_1.default.remove(clientPool, function (data) { return data.clientSocket === socket; });
        // 접속한 클라이언트들 보여주기
        connectClients();
        socket.end('소켓 closed!');
    });
    socket.on('end', function () {
        console.log('NET Socket Client end!');
    });
    socket.on('error', function (err) {
    });
});
netServer.on('connection', function (conn) {
    console.log('connected!');
    // 접속한 클라이언트들 보여주기
    connectClients();
    //console.log(conn);
});
netServer.listen(netPort, ip, function () {
    console.log("> NET Server Listening! 127.0.0.1:" + netPort);
});
/* NET 서버 =======================================================================================================*/ 


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

/***/ "koa2-cors":
/*!****************************!*\
  !*** external "koa2-cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa2-cors");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "uuid/v1":
/*!**************************!*\
  !*** external "uuid/v1" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid/v1");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map