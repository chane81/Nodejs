import { types } from 'mobx-state-tree'

// 채팅 메시지 모델 - 채팅메시지(message), 메시지를 보낸 닉네임(nickname), 내가 보낸 메시지 인지여부(isSelf) 가 들어감
const model = types
  .model('messageModel', {
    message: types.string,
    nickName: types.string,
    nickId: types.string,
    isSelf: types.boolean
  });


const defaultValue = {
  message: '',
  nickName: '',
  nickId: '',
  isSelf: false
};


const create = model.create(defaultValue);


const messageStore = {
  model,
  defaultValue,
  create
};


export default messageStore;
  

