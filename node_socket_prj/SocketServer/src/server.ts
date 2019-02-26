import dotenv from 'dotenv';
import koa from 'koa';
import router from 'koa-router';
import http from 'http';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import net from 'net';
import _ from 'lodash';

// 설정 세팅
dotenv.config();
const app = new koa();
const server = new http.Server(app.callback());
const socketIo = require('socket.io')(server, {
	pingInterval: 10000,
	pingTimeout: 10000,
	transports: [ 'websocket', 'polling' ]
});

// 포트
const socketIoPort: number = Number(process.env.SOCKET_IO_PORT) || 5000;
const netPort: number = Number(process.env.NET_PORT) || 5001;

// 개발모드인지 여부 true/false
const dev: boolean = process.env.NODE_ENV !== 'production';

// 클라이언트 타입
interface clientType {
	clientSocket: any;
	socketId: string;
	socketName: string;
	gubun: string;
}

// 접속 클라이언틑 정보
const clientPool: clientType[] = [];

const socketIoObj = null;

// 소켓통신 이벤트 핸들러
// connection
socketIo.on('connection', (socket: any) => {
	//connectPool.push(socket.request);
	//console.log(socket);
	//console.log(socket.handshake.query);
	//console.log(process.env.NODE_ENV);

	// 클라이언트 정보
	const clientInfo: clientType = {
		clientSocket: socket,
		socketId: socket.id,
		socketName: socket.handshake.query.socketName,
		gubun: 'SOCKET_IO'
	};

	// 클라이언트 정보 PUSH
	clientPool.push(clientInfo);

	clientPool.map((data) => {
		console.log('접속 클라이언트들:', data.socketName, data.socketId);
	});

	// SERVER RECEIVE 이벤트 핸들러(클라이언트 -> 서버)
	socket.on('disconnect', (context: any) => {
		_.remove(clientPool, (data: any) => data.socketId === socket.id);
		//console.log('접속 클라이언트들:', clientPool);
	});

	socket.on('client.msg.send', (context: any) => {
		console.log(context);

		socket.broadcast.emit('client.msg.receive', context);

		// .NET 클라이언트에게로 메시지 보내기
		clientPool.filter((data) => data.gubun === 'NET').map((data) => {
			data.clientSocket.write(context);
		});
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
app.use(
	cors({
		origin: (ctx) => '*'
	})
);

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
server.listen(socketIoPort, (err: any) => {
	if (err) throw err;
	console.log(`> Ready on SOCKET.IO Server http://localhost:${socketIoPort}`);
});

// net 서버 listen
// var netServer = net.createServer((socket: any) => {
// 	console.log('> Ready On NET Server!');

// 	socket.on('end', () => {
// 		console.log('> NET Server End');
// 	});

// 	socket.on('');
// });
var netServer = net.createServer();
netServer.on('connection', (socket) => {
	var remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
	console.log('client connected:', remoteAddress);

	// 클라이언트 정보
	const clientInfo: clientType = {
		clientSocket: socket,
		socketId: '',
		socketName: '',
		gubun: 'NET'
	};

	// 클라이언트 정보 PUSH
	clientPool.push(clientInfo);

	socket.on('data', (data) => {
		const msg = data.toString();
		console.log('data:', msg);

		// 브라우저쪽으로 .NET 클라이언트에서 보낸 메세지 보내기
		clientPool.filter((data) => data.gubun === 'SOCKET_IO').map((data) => {
			data.clientSocket.emit('client.msg.receive', msg);
		});
	});

	socket.on('close', () => {
		console.log('NET Server Closed!');
	});

	socket.on('error', (err) => {
		console.log('NET Server Err:', err);
	});
});

netServer.listen(netPort, () => {
	console.log('> NET Server Listening!');
});
