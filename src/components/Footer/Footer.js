import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FooterButton from './FooterButton';
import './Footer.scss';

const Footer = ({ isLoggedIn, handleButtonClick }) => {
  const handlePayment = () => {
    navigate('/mypage', { state: { menuMode: 4 } });
  };
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="footer-list">
        <button className="to-login" onClick={handleButtonClick}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
        <FooterButton onClick={handlePayment}>고객센터</FooterButton>
      </div>
      <div className="footer-info text-sm">
        <div className="footer-left">
          <p>(주)에스팀업 사업자정보</p>
          <div>
            서울특별시 강남구 테헤란로 427 위워크 타워
            <br />
            개인정보보호책임자: info@esteemup.com, 고객센터: 0000-0000
            <br />
            E-mail: help@esteemup.com
            <br />
            제휴문의: sales@esteemup.com
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-right-first">
            <div>고객센터 0000-0000</div>
            <div>
              [ 평일 ] 오전 9시 ~ 오후 6시
              <br />[ 점심시간 ] 오후 12시 ~ 1시
            </div>
          </div>
          <div className="footer-right-second">
            ©2023. Esteem Up, Co., Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
