import ModalWrapper from '../components/ModalWrapper';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'

const ModalWrapperContainer = ({ store, chatBox }) => {

  const { 
    getModalVisible,
    setCurrentNickName,
    setCurrentNickId,
    setSocketConnect,
    setSocketReceive
  } = store.socketModel;

  const fnScrollMove = () => {

    const { scrollHeight, clientHeight } = chatBox;
    chatBox.scrollTop = scrollHeight - clientHeight;
  }

  const handleNickRegist = async (nickName) => {
    // 닉네임을 상태에 등록
    setCurrentNickName(nickName);

    // 임시닉 ID 발급(랜덤사진 보여주기위해)
    setCurrentNickId();
  };

  return (
    <ModalWrapper isVisible={ getModalVisible } handleNickRegist={ handleNickRegist }></ModalWrapper>
  );
}

export default inject(({ store }) => ({ store }))(observer(ModalWrapperContainer));