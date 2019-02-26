import dotenv from 'dotenv';
import koa from 'koa';
import router from 'koa-router';
import http from 'http' ;
import bodyParser from 'koa-bodyparser';
import _ from 'lodash';


// 설정 세팅
dotenv.config();
const app = new koa();
const server = new http.Server(app.callback());
const socketIo = require('socket.io')(server, {
  pingInterval: 10000,
  pingTimeout: 10000,
  transports: ['websocket', 'polling']
});


// 포트
const port:number = Number(process.env.PORT) || 5000;
// 개발모드인지 여부 true/false
const dev:boolean = process.env.NODE_ENV !== 'production';



// 클라이언트 타입
interface clientType {
  socketId: string,
  socketName: string
}


// 접속 클라이언틑 정보
const clientPool:clientType[] = [];


// 소켓통신 이벤트 핸들러
// connection
socketIo.on('connection', (socket:any) => {
  //connectPool.push(socket.request);
  console.log(socket.handshake.query);
  console.log(process.env.NODE_ENV);

  // 클라이언트 정보
  const clientInfo:clientType = {
    socketId: socket.id,
    socketName: socket.handshake.query.socketName
  };

  // 클라이언트 정보 PUSH
  clientPool.push(clientInfo);

  console.log('접속 클라이언트들:', clientPool);

  // SERVER RECEIVE 이벤트 핸들러(클라이언트 -> 서버)
  socket.on('disconnect', (context:any) => {
    _.remove(clientPool, (data:any) => data.socketId === socket.id)
    console.log('접속 클라이언트들:', clientPool);
  });

  socket.on('client.msg.send', (context:any) => {
    console.log(context);

    socket.broadcast.emit('client.msg.receive', context);
  });

  // socket.on('message.chat2', data => {
  //   messages['chat2'].push(data)
  //   socket.broadcast.emit('message.chat2', data)
  // })

  // socket.on('error', (err) => {
  //   console.log('Error connecting to server', err);
  // });
})

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
server.listen(port, (err:any) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})