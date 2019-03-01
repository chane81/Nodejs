import dotenv from 'dotenv';
import koa from 'koa';
import router from 'koa-router';
import http from 'http';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import net from 'net';
import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import io from 'socket.io';

/* 설정 세팅 =================================================================================================*/
dotenv.config();
const app = new koa();
const server = new http.Server(app.callback());
const socketIo = io(server, {
	pingInterval: 10000, // ping 인터벌
	pingTimeout: 10000, // ping 타임아웃
	transports: [ 'websocket', 'polling' ]
});

// 포트
const socketIoPort: number = Number(process.env.SOCKET_IO_PORT) || 5000;
const ip: string = process.env.IP || '127.0.0.1';
const netPort: number = Number(process.env.NET_PORT) || 5001;

// 개발모드인지 여부 true/false
const dev: boolean = process.env.NODE_ENV !== 'production';

// 클라이언트 타입
interface clientType {
	clientSocket: any;
	uniqueId: string;
	socketName: string;
	socketGubun: string;
}

// CORS 관련 옵션 설정
app.use(
	cors({
		origin: (ctx) => '*'
	})
);

// 접속 클라이언틑 정보
const clientPool: clientType[] = [];

// 접속한 클라이언트들 로그로 보여주기
function connectClients() {
	console.log('접속 클라이언트들:');
	clientPool.map((data) => {
		const { uniqueId, socketName, socketGubun } = data;
		console.log(`socketGubun:${socketGubun}, uniqueId:${uniqueId}, socketName:${socketName}`);
	});
}
/* 설정 세팅 =================================================================================================*/

/* SOCKET.IO 서버 =================================================================================================*/
// 소켓통신 이벤트 핸들러
// connection
socketIo.on('connection', (socket: any) => {
	// 클라이언트 정보
	const clientInfo: clientType = {
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
	socket.on('disconnect', (context: any) => {
		_.remove(clientPool, (data: any) => data.uniqueId === socket.id);
		console.log('socket.io client disconnected!');
	});

	socket.on('client.msg.send', (context: any) => {
		console.log('socket.io data:', context);

		socket.broadcast.emit('client.msg.receive', context);

		// .NET 클라이언트에게로 메시지 보내기
		clientPool.filter((data) => data.socketGubun === 'net').map((data) => {
			data.clientSocket.write(
				JSON.stringify({
					action: 'client.msg.receive',
					data: context
				}),
				(err: any) => {}
			);
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
server.listen(socketIoPort, ip, (err: any) => {
	if (err) throw err;
	console.log(`> SOCKET.IO Server Listening! http://localhost:${socketIoPort}`);
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
const netServer = net.createServer((socket) => {
	const remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
	console.log('client connected:', remoteAddress);

	// clientPool.map((data) => {
	// 	console.log('접속 클라이언트들:', data.socketName, data.uniqueId);
	// });

	// 클라이언트 정보
	const clientInfo: clientType = {
		clientSocket: socket,
		uniqueId: uuidv1(),
		socketName: '',
		socketGubun: 'net'
	};

	// 클라이언트에게 uniqueId 를 전송함
	socket.write(
		JSON.stringify({
			action: 'client.msg.connected',
			data: clientInfo.uniqueId
		})
	);

	// 클라이언트 정보 PUSH
	clientPool.push(clientInfo);

	// 접속한 클라이언트들 보여주기
	connectClients();

	socket.on('data', (data) => {
		const msg = data.toString();
		console.log('net data:', msg);

		// 브라우저쪽으로 .NET 클라이언트에서 보낸 메세지 보내기
		clientPool.filter((data) => data.socketGubun === 'socket.io').map((data) => {
			data.clientSocket.emit('client.msg.receive', msg);
		});
	});

	socket.on('close', () => {
		console.log('NET Server Closed!');

		// 연결 끊어진 소켓을 클라이언트풀에서 삭제처리
		_.remove(clientPool, (data: any) => data.clientSocket === socket);

		// 접속한 클라이언트들 보여주기
		connectClients();

		socket.end('소켓 closed!');
	});

	socket.on('end', () => {
		console.log('NET Socket Client end!');
	});

	socket.on('error', (err) => {});
});

netServer.on('connection', (conn) => {
	console.log('connected!');

	// 접속한 클라이언트들 보여주기
	connectClients();
	//console.log(conn);
});

netServer.listen(netPort, ip, () => {
	console.log(`> NET Server Listening! 127.0.0.1:${netPort}`);
});
/* NET 서버 =======================================================================================================*/
