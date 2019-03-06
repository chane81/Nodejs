import { Component } from 'react'
import styles from '../style/ChatMsgBox.scss';

const ChatMsgBox = ({ message, isSelf, nickName, nickId}) => {
  // 줄바꿈을 <br /> 로 치환
  message = message.replace(/(?:\r\n|\r|\n)/g, '<br />');

  return (
    <div className={`chat-msg-wrap ${ isSelf ? 'chat-right' : 'chat-left' }`}>
      <div className={'chat-msg'}>
        <div 
          className={'chat-picture'}
          style={{
            backgroundImage: `url('https://randomuser.me/api/portraits/thumb/men/${nickId}.jpg')`
          }}
        >
        </div>
        <div>
          <span>
            {/** string to html **/}
            <div dangerouslySetInnerHTML={{__html: message}} />
            <div className={'chat-nick'}>- {nickName} -</div>
          </span>
        </div>
      </div>
    </div>
  );
}


export default ChatMsgBox;