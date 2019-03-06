import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/Head'
import io from 'socket.io-client'
import styles from '../style/index.scss';
import ChatMsgBox from '../components/ChatMsgBox'
import config from '../config.js';
import ModalWrapper from '../components/ModalWrapper'
import { inject, observer } from 'mobx-react'
import ModalWrapperContainer from '../containers/ModalWrapperContainer';
import { onAction, onPatch } from 'mobx-state-tree';
import { autorun }from 'mobx';



// @inject('store')
// @observer
class Index extends Component {

  // 스크롤 맨 아래로
  fnScrollMove() {
    const { scrollHeight, clientHeight } = this.chatBox;
    this.chatBox.scrollTop = scrollHeight - clientHeight;

    //this.chatBox.scrollToBottom();
  }

  // 소켓 연결
  componentDidMount () {
    const { store } = this.props;

    console.log('config:', config);

    const { socket, setSocket, setSocketConnect, setMessagesPush } = store.socketModel;

    // autorun(() => {
    //   console.log('test');
    // })
    
    // mobx-state-tree patch 이벤트 핸들러
    // onPatch(store, patch => {
    //   console.log("onPatch");
    //   console.log(patch);
    // });

    // mobx-state-tree action 이벤트 핸들러 - 닉네임변경 액션이 발생했을 때 메세지 입력 input 쪽으로 focus 가 가도록 수정함
    onAction(store, action => {
      if (action.name === "setCurrentNickName") {
        // 바로 포커스가 가지 않아서 setTimeout(1초) 를 줌
        setTimeout(() => {
          this.txtChat.focus();
        }, 1000);
      }
    });


    if (socket == null) {
      const socketIo = io(config.socketServerHost, {
        transports: ['websocket', 'polling'],
        query: {
          socketName: "테스트"
        },
        secure: true
      });

      // 접속한 소켓 set
      socketIo.on("connect", () => {
        setSocket(socketIo);
      });

      socketIo.on('client.msg.receive', context => {
        console.log('받은메시지:', context);

        const receiveMsg = JSON.parse(context);

        // 메시지들 배열에 push
        setMessagesPush({ ...receiveMsg, isSelf: false });

        this.fnScrollMove();
      });

      socketIo.on('connect_error', function(err) {
        console.log('socket error');
      });
  
      socketIo.on("disconnect", () => {
        console.log('서버 disconnected!');
      });
    }
  }

  // 소켓 종료
  componentWillUnmount () {
    const { store } = this.props;
    store.socketModel.setSocketClose();
  }

  // 소켓 전송
  // setSendMessage 가 비동기 이므로 async await 를 써서 스크롤 맨아래로내리는 부분 제대로 수행되게 함
  handleSend = async (e) => {
    const { store } = this.props;

    // socket emit
    await store.socketModel.setSendMessage(this.txtChat.value);

    // 스크롤 맨 아래로
    this.fnScrollMove();
  };

  // 입력창에서 엔터키 눌렀을 때
  handleSendKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSend(e);
    }
  };

  // 전송할 텍스트 입력
  handleChange = (e) => {
    const { store } = this.props;
    store.socketModel.setCurrentMessage(e.target.value);
  };

  // 챗박스 감싸고 있는 부분 클릭시 인풋박스 포커스이동되게 함
  handleBoxClick = (e) => {
    this.txtChat.focus();
  }

  render () {
    const { store } = this.props;
    const { messages, getModalVisible, currentMessage: { message } } = store.socketModel;

    const msgBox = messages.map((data, index) => 
      <ChatMsgBox 
        isSelf={data.isSelf}
        message={data.message}
        nickName={data.nickName}
        nickId={data.nickId}
        key={index}
      />
    );

    return (
      <div>
        <Head title="Home" >
        </Head>
        <div className={'chat-wrap'}>
          <div ref={ref => { this.chatBox = ref }} className={'chat-box'}>
            {msgBox}
          </div>
          <div className={'chat-input-box shadow'} onClick={this.handleBoxClick}>
              <input 
                onChange={this.handleChange} 
                ref={ref => { this.txtChat = ref }} 
                onKeyPress={this.handleSendKeyPress} 
                value={message} 
                type="text"
                placeholder="메시지를 입력해 주세요!"
              ></input>
              <span className={'btn-add-container'} onClick={this.handleSend}>
                <i className={"fas fa-plus btn-add"}></i>
              </span>
            </div>
          </div>
          <ModalWrapperContainer></ModalWrapperContainer>
      </div>
    );
  }
}

export default inject(({ store }) => ({ store }))(observer(Index));

//export default Index
