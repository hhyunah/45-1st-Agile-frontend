import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.scss';
import MainLayout from '../Details/Mainlayout';
import TitleLine from '../../components/TitleLine/TitleLine';
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const isInputValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
    userInfo.userId
  );
  const handleInput = event => {
    const { name, value } = event.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };
  const goToMain = event => {
    event.preventDefault();
    if (isInputValid) {
      alert('이메일을 다시 입력해주세요!');
      return false;
    } else if (userInfo.userPassword) {
      alert('비밀번호를 입력해주세요!');
      return false;
    } else {
      fetch('http://13.209.8.13:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(userInfo),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('아이디와 비밀번호를 다시 확인해주세요!');
          }
        })
        .then(result => {
          if (result.accessToken) {
            localStorage.setItem('token', result.accessToken);
            location.state === null ? navigate(-1) : navigate('/');
          }
        })
        .catch(error => {
          alert(error.message);
        });
    }
  };
  const goToSignup = () => {
    navigate('/signup');
  };
  return (
    <MainLayout>
      <TitleLine />
      <div className="loginform">
        <p className="start">
          <strong>로그인 및 회원가입</strong>
          <p className="start-words">을 시작합니다.</p>
        </p>
        <form>
          <div className="inputwrap">
            <input
              className="login"
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleInput}
            />
            <input
              className="password"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleInput}
            />
            <div className="id-check">
              <input type="checkbox" id="id-check" name="id-check" />
              <label htmlFor="id-check">아이디 저장</label>
            </div>
          </div>
          <button className="loginbtn" type="submit" onClick={goToMain}>
            로그인
          </button>
          <button className="registerbtn" type="button" onClick={goToSignup}>
            회원가입
          </button>
        </form>
        <div className="forget">
          <div className="findemail">
            <Link to="/forgetemail">이메일 찾기</Link>
          </div>
          <div className="findpassword">
            <Link to="/forgetpassword">비밀번호 찾기</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Login;
