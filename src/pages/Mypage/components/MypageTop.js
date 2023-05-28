import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MypageTop.scss';

const MypageTop = ({ userInfo, setModal, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleUpdateInfoClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    setModal(true);
  };

  return (
    <div className="mypage-top">
      <div className="mypage-top-wrap">
        <div className="top-left">
          <div className="text-xl">
            안녕하세요, <span className="bold">{userInfo.name}</span>님
            <br /> 오늘도 현명한 하루 되세요!
          </div>
          <div className="member">
            <span className="text-lg">Esteem Up </span> 회원
          </div>
        </div>
        <div className="top-right">
          <div className="point">
            <div className="text-lg">포인트</div>
            <div className="text-xl">
              {parseInt(userInfo.point)?.toLocaleString()}원
            </div>
          </div>
          <div className="phone-number">
            <div>{userInfo.phoneNumber}</div>
            <div onClick={handleUpdateInfoClick}>정보수정{' > '}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageTop;
