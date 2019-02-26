import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/Head'
import io from 'socket.io-client'
import styles from '../style/index.scss';
import ChatMsgBox from '../components/ChatMsgBox'

//const Index = () => {
class Index extends Component {

  state = {
    socket: null,
    socketName: '테스트',
    txtValue: '',
    chat: []
  };

  // 스크롤 맨 아래로
  fnScrollMove() {
    const { scrollHeight, clientHeight } = this.chatBox;
    this.chatBox.scrollTop = scrollHeight - clientHeight;
  }

  // 소켓 연결
  componentDidMount () {
    const socket = io("http://localhost:5000/", {
      transports: ['websocket', 'polling'],
      query: {
        socketName: this.state.socketName
      }
    });

    socket.on('client.msg.receive', async context => {
      console.log('받은메시지:', context);

      // state 에 메시지 담기
      await this.setState({
        chat: [...this.state.chat, { isSelf:false, msg: context }]
      });

      // 스크롤 맨 아래로
      this.fnScrollMove();
    });

    this.setState({ socket });
  }

  // 소켓 종료
  componentWillUnmount () {
    this.state.socket.close()
  }


  // this.state.socket.on('connect', () => {

  // })

  
  // 소켓 전송
  handleSend = async (e) => {
    if (this.state.txtValue.trim() === "") {
      alert('메시지를 입력해주세요!');

      this.setState({ 
        txtValue: ''
      });

    } else {
      // 서버에 메시지 전송
      const socket  = this.state.socket;
      socket.emit('client.msg.send', this.state.txtValue);

      // state 에 메시지 담기
      await this.setState({ 
        txtValue: '',
        chat: [...this.state.chat, { isSelf:true, msg: this.state.txtValue }]
      });

      // 스크롤 맨 아래로
      this.fnScrollMove();
    }
  };

  // 입력창에서 엔터키 눌렀을 때
  handleSendKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSend(e);
    }
  };

  // 전송할 텍스트 입력
  handleChange = (e) => {
    this.setState({
      txtValue: e.target.value
    })
  };

  // 챗박스 감싸고 있는 부분 클릭시 인풋박스 포커스이동되게 함
  handleBoxClick = (e) => {
    this.txtChat.focus();
  }

  render () {
<<<<<<< HEAD
      return (
        <div>
          <style global jsx>{`
            body {
              text-align: center;
              background-color: #f6f6f6;
            }

            input {
              border-style: groove;
            }

            button {
              border-style: groove;
            }

            .shadow {
              box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
            }
          `}</style>
          
          <style jsx>{`
            input:focus {
              outline: none;
            }

            .wrap {
              margin: 2rem 2rem;
              padding: 2rem 2rem 0 2rem;
              border: 1px solid #ced4da;
              height: 40rem;
              border-radius: 5px;
            }
            .chat-box {
              border: 1px solid #e9ecef;
              background: white;
              height: 80%;
              border-radius: 0 5px 5px 0;
            }
            .chat-input-box {
              background: white;
              height: 50px;
              line-height: 50px;
              border: 1px solid #e9ecef;
              border-radius: 5px;
              margin: 3.5rem 0 0 0;
            }
            .chat-input-box input {
              width: 80%;
              border-style: none;
              font-size: 0.9rem;
            }
            .btn-add-container {
              float: right;
              background: linear-gradient(to right, #6478fb, #8763fb);
              display: block;
              width: 3rem;
              border-radius: 0 5px 5px 0;
            }
            .btn-add-container:hover {
              cursor: pointer;
            }
            .btn-add {
              color: white;
              vertical-align: middle;
            }
          `}</style>

          <Head title="Home" >
          </Head>
          <div className={'wrap'}>
            <div className={'chat-box'}>
              
            </div>
            <div className={'chat-input-box shadow'} onClick={this.handleBoxClick}>
              <input onChange={this.handleChange} ref={ref => { this.txtChat = ref }} onKeyPress={this.handleSendKeyPress} value={this.state.txtValue} type="text"></input>
=======
    console.log('test', this.state);
    const { txtValue, chat } = this.state;
    const msgBox = chat.map((data, index) => (
        <ChatMsgBox isSelf={data.isSelf} msg={data.msg} key={index}></ChatMsgBox>  
    ));

    console.log(msgBox);
    

    return (
      <div>
        <Head title="Home" >
        </Head>
        <div className={'chat-wrap'}>
          <div ref={ref => { this.chatBox = ref }} className={'chat-box'}>
            {msgBox}
          </div>
          <div className={'chat-input-box shadow'} onClick={this.handleBoxClick}>
              <input onChange={this.handleChange} ref={ref => { this.txtChat = ref }} onKeyPress={this.handleSendKeyPress} value={txtValue} type="text"></input>
>>>>>>> fd4c7a3... 자기자신이 메시지 보냈을때, 메시지 받았을 때 ui 가 다르게 나오게 수정
              <span className={'btn-add-container'} onClick={this.handleSend}>
                <i className={"fas fa-plus btn-add"}></i>
              </span>
            </div>
          </div>
      </div>
    );
  }
}

export default Index
