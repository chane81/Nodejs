import { Component } from 'react'
import Link from 'next/link'
import Head from '../components/Head'
import io from 'socket.io-client'
import styles from '../style/ChatMsgBox.scss';

const ChatMsgBox = ({ msg, isSelf}) => {

  console.log(isSelf);

  return (
    <div className={`chat-mag-wrap ${ isSelf ? 'chat-right' : 'chat-left' }`}>
      <div className={'chat-msg'}>
        <span>
          {/** string to html **/}
          <div dangerouslySetInnerHTML={{__html: msg}} />
        </span>
      </div>
    </div>
  );
}


export default ChatMsgBox;