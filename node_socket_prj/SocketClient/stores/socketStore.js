import { types, applySnapshot } from 'mobx-state-tree'
import messageStore from './messageStore'
import { flow } from 'mobx';
import io from 'socket.io-client'
import config from '../config.js';


const model = types
  .model('socketModel', {
    socket: types.frozen(),
    socketName: types.string,
    currentNickName: types.string,
    currentNickId: types.string,
    currentMessage: messageStore.model,
    messages: types.array(messageStore.model),
    modalVisible: types.boolean
  })
  .actions(self => ({
    // 접속 소켓을 상태값에 넣어주기
    setSocket(socket) {
      self.socket = socket;
    },
    // 소켓 커넥션과 이벤트등록
    setSocketConnect() {
      if (self.socket == null) {
        const socket = io(config.socketServerHost, {
          transports: ['websocket', 'polling'],
          query: {
            socketName: "테스트"
          },
          secure: true
        });

        // 접속한 소켓 set
        socket.on("connect", () => {
          self.setSocket(socket);
        });

        socket.on('client.msg.receive', context => {
          console.log('받은메시지:', context);

          const receiveMsg = JSON.parse(context);

          // 메시지들 배열에 push
          self.setMessagesPush({ ...receiveMsg, isSelf: false });
        });

        socket.on('connect_error', function(err) {
          console.log('socket error');
        });
    
        socket.on("disconnect", () => {
          console.log('서버 disconnected!');
        });
      }
    },
    // 주고 받은 메시지들 push
    setMessagesPush(messageModel) {

      console.log('메시지 push:', JSON.stringify(messageModel))

      self.messages.push({...messageModel});
    },
    // 현재 접속한 유저의 닉네임 set
    setCurrentNickName(currentNickName) {
      self.currentNickName = currentNickName;
    },
    // 현재 접속한 유저가 보낼려는 메시지 set
    setCurrentMessage(message) {
      self.currentMessage = {
        message,
        nickName: self.currentNickName,
        nickId: self.currentNickId,
        isSelf: true
      };
    },
    // 소켓 close
    setSocketClose() {
      if (self.socket != null) {
        self.socket.close();
      }
    },
    // 소켓 send
    setSendMessage: flow(function* () {

      if (self.socket === null || self.socket.connected == false) {
        alert('서버에 연결되어 있지 않습니다.');

      }
      else if (self.currentMessage.message.trim() === "") {
        alert('메시지를 입력해주세요!');

      } else {
        console.log(self.socket);
        // 소켓 emit
        yield self.socket.emit('client.msg.send', JSON.stringify(self.currentMessage));

        console.log('소켓send:', self.socket);

        // 메시지들 배열에 push
        self.setMessagesPush(self.currentMessage);
      }

      // input 박스 메시지 초기화
      self.setCurrentMessage('');
    }),
    // 모달 visible 세팅
    setModalVisible(isVisible) {
      self.modalVisible = false;
    },
    // 현재사용자의 임시ID
    setCurrentNickId() {
      self.currentNickId = Math.floor((Math.random() * 50)).toString();
    }
  }))
  .views(self => ({
    // 모달을 보여줘야할지 여부
    get getModalVisible() {
      return self.currentNickName ? false : true;
    },
    get getSocket() {
      return self.socket;
    }
  }));


const defaultValue = {
  socket: null,
  socketName: '',
  currentNickName: '',
  currentMessage: {
    ...messageStore.defaultValue
  },
  currentNickId: '',
  messages: [],
  modalVisible: false
};


const create = model.create(defaultValue);


const socketStore = {
  model,
  defaultValue,
  create
};


export default socketStore;