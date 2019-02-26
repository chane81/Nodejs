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
    const { socket }  = this.state;
    socket.emit('client.msg.send', this.state.txtValue);

    this.setState({ txtValue: '' });
  };

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
