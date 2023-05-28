import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';
import MainLayout from '../Details/Mainlayout';
import TitleLine from '../../components/TitleLine/TitleLine';

const SignUp = () => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState({
    userId: '',
    userPassword: '',
    userPasswordOk: '',
    userName: '',
    userAddress: '',
    userPhoneNumber: '',
    userBirth: '',
  });

  const { userId, userPassword, userPasswordOk, userPhoneNumber } = memberData;
  const [checkId, setCheckId] = useState([]);

  const isAllChecked = checkId.length === CHECKBOX.length;

  const handleCheckBox = (checked, id) => {
    if (checked) {
      setCheckId(prev => [...prev, id]);
    } else {
      setCheckId(checkId.filter(ele => ele !== id));
    }
  };

  const handleAllAgreeChange = () => {
    if (isAllChecked) {
      setCheckId([]);
    } else {
      setCheckId(CHECKBOX.map(ele => ele.id));
    }
  };

  const handleUserInput = event => {
    const { value, name } = event.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const conditions = {
    userId:
      /^[a-z0-9]+@[a-z]+(\.[a-z]{2,3}){1,2}$/i.test(userId) &&
      userId.length !== 0,
    userPassword:
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(
        userPassword
      ) && userPassword.length !== 0,
    userPasswordOk: userPasswordOk === userPassword,
    userPhoneNumber:
      /^01([0|1|6|7|8|9])-\d{3,4}-\d{4}$/.test(userPhoneNumber) &&
      userPhoneNumber.length !== 0,
  };

  const handleradioCheck = event => {
    const { name, value } = event.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const goToMain = () => {
    const allCondtionMet =
      Object.keys(conditions).every(key => {
        if (!conditions[key]) {
          alert(ALERT_MESSAGE[key]);
          return false;
        } else {
          return true;
        }
      }) &&
      Object.values(memberData).every(value => {
        if (value === '') {
          alert('고객정보를 기입해주세요.');
          return false;
        } else {
          return true;
        }
      });

    if (!allCondtionMet) {
      return;
    }

    const checkTerm = checkId.includes(1) && checkId.includes(2);

    if (!checkTerm) {
      alert('필수 사항을 선택해주세요!');
      return;
    }

    fetch('http://13.209.8.13:3000/users/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: memberData.userId,
        password: memberData.userPassword,
        name: memberData.userName,
        gender: memberData.gender,
        address: memberData.userAddress,
        phoneNumber: memberData.userPhoneNumber,
        birthDate: memberData.userBirth,
      }),
    });
    fetch('http://13.209.8.13:3000/users/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: memberData.userId,
        password: memberData.userPassword,
        name: memberData.userName,
        gender: memberData.gender,
        address: memberData.userAddress,
        phoneNumber: memberData.userPhoneNumber,
        birthDate: memberData.userBirth,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === `EMAIL_EXISTS`) {
          alert('이미 사용 중인 아이디 입니다!');
        } else if (result.message === `SIGNUP_SUCCESS`) {
          console.log(result);
          alert('회원가입이 완료되었습니다!');
          navigate('/login', { state: { from: 'signup' } });
        }
      })
      .catch(err => alert(err));
  };

  return (
    <MainLayout>
      <TitleLine />
      <div className="signup">
        <div className="title">
          <h1>회원가입</h1>
        </div>
        <div className="basicinfo">
          <div className="basic-info">추가 정보</div>
        </div>

        <div className="signupform">
          {USER_INFO.map(info => {
            return (
              <div className="form-id" key={info.id}>
                <span className="form-title">{info.title}</span>
                <input
                  className="form-placeholder"
                  type={info.type}
                  placeholder={info.placeholder}
                  name={info.name}
                  onChange={handleUserInput}
                />
                {(info.title === '이메일' || info.title === '비밀번호') && (
                  <span className="form-message">{info.message}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="plusinfo">
          <div className="plus-info">고객정보</div>
        </div>
        <div className="plusinfoform">
          <div className="write-birth">
            <span className="birth">생년월일</span>
            <input
              className="input-birth"
              type="date"
              name="userBirth"
              onChange={handleUserInput}
            />
          </div>
          <div className="check-gender">
            <span className="gender">성별</span>
            <div className="check-radio">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleradioCheck}
              />
              남자
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleradioCheck}
              />
              여자
              <input
                type="radio"
                name="gender"
                value="noselected"
                onChange={handleradioCheck}
              />
              선택 안함
            </div>
          </div>
        </div>
        <div className="agree">
          <div className="agree-ok">이용약관 동의</div>
        </div>
        <div className="agree-all">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={handleAllAgreeChange}
          />
          전체 동의 합니다.
          <div className="check-message">
            선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할
            수 있습니다.
          </div>
        </div>

        <div className="agree-check">
          {CHECKBOX.map(checkbox => {
            return (
              <div key={checkbox.id} className="agree-check">
                <input
                  type="checkbox"
                  checked={checkId.includes(checkbox.id)}
                  onChange={e => handleCheckBox(e.target.checked, checkbox.id)}
                />
                <label htmlFor={checkbox.name}>{checkbox.label}</label>
                {(checkbox.label === '전체 동의 합니다.' ||
                  checkbox.label ===
                    '[선택] 이메일로 혜택과 정보를 보내드려도 될까요?') && (
                  <span className="checkbox-message">{checkbox.message}</span>
                )}
              </div>
            );
          })}
        </div>
        <button className="signupbtn" type="button" onClick={goToMain}>
          가입하기
        </button>
      </div>
    </MainLayout>
  );
};

export default SignUp;

const USER_INFO = [
  {
    id: 1,
    title: '이메일',
    type: 'text',
    placeholder: '이메일을 입력해주세요',
    name: 'userId',
    message: '로그인 아이디로 사용할 이메일을 입력해 주세요.',
  },
  {
    id: 2,
    title: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    name: 'userPassword',
    message: '(영문 대/소문자, 숫자, 특수기호 8~20개 사이를 입력해주세요)',
  },
  {
    id: 3,
    title: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 한번 더 입력해주세요',
    name: 'userPasswordOk',
  },
  {
    id: 4,
    title: '이름',
    type: 'text',
    placeholder: '실명으로 기입해주세요',
    name: 'userName',
  },
  {
    id: 5,
    title: '주소',
    type: 'text',
    placeholder: '주소',
    name: 'userAddress',
  },
  {
    id: 6,
    title: '전화번호',
    type: 'text',
    placeholder: '000-0000-0000',
    name: 'userPhoneNumber',
  },
];
const ALERT_MESSAGE = {
  userId: '이메일을 다시 입력해주세요!',
  userPassword: '비밀번호를 다시 입력해주세요!',
  userPasswordOk: '입력한 비밀번호와 일치하지 않습니다!',
  userPhoneNumber: '전화번호를 다시 입력해주세요!',
};

const CHECKBOX = [
  {
    id: 1,
    label: '[필수] 이용약관 동의',
  },

  {
    id: 2,
    label: '[필수] 개인정보 수집 및 동의',
  },

  {
    id: 3,
    label:
      '[선택] SMS (문자, 카카오톡 등)으로 혜택과 유용한 정보를 보내드려도 될까요?',
  },

  {
    id: 4,
    label: '[선택] 이메일로 혜택과 정보를 보내드려도 될까요?',
    message:
      '본인은 만 14세 이상이며, 이용약관, 개인정보 수집 및 이용을 확인하며, 동의합니다.',
  },
];
