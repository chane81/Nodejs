import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import io from 'socket.io-client'

//const Index = () => {
class Index extends Component {

  state = {
    socket: null,
    socketName: '테스트',
    txtValue: '',
    msg: this.props.msg
  };

  // 소켓 연결
  componentDidMount () {
    const socket = io("http://localhost:5000/", {
      transports: ['websocket', 'polling'],
      query: {
        socketName: this.state.socketName
      }
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
  handleSend = (e) => {
    e.preventDefault();

    const { socket }  = this.state;
    socket.emit('client.msg.send', this.state.txtValue);
  }

  // 전송할 텍스트 입력
  handleChange = (e) => {
    this.setState({
      txtValue: e.target.value
    })
  };

  render () {
      return (
        <div>
          <style jsx>{`
              .wrap {
                margin: 10rem auto;
                border: 2px solid #ced4da;
              }
              .chat-box {
                
              }
              .txt-chat {
                width: 15%;
              }
              .btn-chat {
                width: 80px;
                line-height: 15px;
                margin-left: 10px;
              }
          `}</style>

          <Head title="Home" >
          </Head>
          <div className={'wrap'}>
            <div className={'chat'}></div>
            <input className={'txt-chat'} onChange={this.handleChange} type="text"></input>
            <button id="btnChat" className={'btn-chat'} onClick={this.handleSend}>확인</button>
          </div>
        </div>
        
      );
  }
}

export default Index
