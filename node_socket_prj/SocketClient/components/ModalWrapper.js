import { Component } from 'react'
import Link from 'next/link'
import styles from '../style/ModalWrapper.scss';
import PropTypes from 'prop-types';

class ModalWrapper extends Component {
  // 확인버튼 클릭시 프로퍼티 함수에 닉네임 전달하여 수행하게 함
  handleClick = () => {

    // store 에 닉네임 등록
    this.props.handleNickRegist(this.nickBox.value);
  };

  // 입력창에서 엔터키 눌렀을 때
  handleSendKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  // 별명입력 input 에 focus 주기
  handleFocus = (e) => {
    this.nickBox.focus();
  }


  render () {
    const { isVisible } = this.props;

    return (
      <div className={ isVisible ? 'show' : 'hide' }>
        <div className="nicknm-gray-background"></div>
        <div className="nicknm-wrapper">
          <div className="nicknm-modal">
            <div className="nicknm-input-container" onClick={this.handleFocus}>
              <input 
                className="nicknm-input" 
                ref={ref => { this.nickBox = ref }} 
                type="text" 
                placeholder="별명을 입력해주세요!"
                onKeyPress={this.handleSendKeyPress}
              >
              </input>
              <span className='nicknm-btn-add' onClick={this.handleClick}>
                <i className="fas fa-user fa-2x nicknm-user-icon"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWrapper;