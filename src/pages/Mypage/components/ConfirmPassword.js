import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmPassword.scss';

const ConfirmPassword = ({ setModal }) => {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState(); //비밀번호 입력값 상태

  const handlePwd = e => {
    setPwd(e.target.value);
  };

  // 현재 비밀번호와 같은지 확인
  const confirmPwd = () => {
    fetch('http://13.209.8.13:3000/users/auth-check', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ password: pwd }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'AUTH SUCCESS') {
          navigate('/userInfoUpdate');
        } else {
          alert('다시 입력해주세요.');
        }
      });
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      confirmPwd();
    }
  };

  //확인 버튼
  const handleConfirmButton = () => {
    confirmPwd();
  };

  // 닫기 버튼
  const handleCloseButton = () => {
    setModal(false);
  };

  return (
    <div className="confirm-password">
      <div className="confirm-main">
        <div className="text-2xl main-title">
          <b>현재 비밀번호를 입력해주세요</b>
        </div>
        <input type="password" onChange={handlePwd} onKeyUp={handleEnter} />
        <div className="button-part">
          <button onClick={handleConfirmButton}>
            <b>확인</b>
          </button>
          <button onClick={handleCloseButton}>
            <b>닫기</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
