import { types, applySnapshot } from 'mobx-state-tree'
import socketStore from './socketStore'
import { flow } from 'mobx';
import io from 'socket.io-client'
import config from '../config.js';

let _store = null;


const store = types
  .model('store', {
    socketModel: socketStore.model,
  });


export function initializeStore (isServer, snapshot = null) {
  const defaultValue = {
    socketModel: {...socketStore.defaultValue}
  };

  // 서버일 경우에 대한 로직 작성
  if (isServer) {
    _store = store.create(defaultValue);
  }

  // 클라이언트일 경우에 대한 로직 작성
  if (store === null) {
    _store = store.create(defaultValue);
  }

  // 스냅샷 있을 경우 스토어에 스냅샷을 적용
  if (snapshot) {
    applySnapshot(_store, snapshot)
  }

  return _store
}
  