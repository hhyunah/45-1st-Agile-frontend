import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';

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
    userGender: '',
  });

  const [isIdValid, setIsIdValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isAllAgreed, setIsAllAgreed] = useState(false);

  const handleAllAgreeChange = event => {
    setIsAllAgreed(event.target.checked);
    const allCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]:not(#agree-all)'
    );
    allCheckboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
    });
  };

  const essentialCheckboxes = document.querySelectorAll(
    '.agree-essential input[type="checkbox"]'
  );
  const allAgreeCheckbox = document.querySelector('#agree-all');

  essentialCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const isAllChecked = Array.from(essentialCheckboxes).every(
        checkbox => checkbox.checked
      );
      allAgreeCheckbox.checked = isAllChecked;
    });
  });

  const handleEmailInput = event => {
    const { value } = event.target;
    setMemberData({ ...memberData, userId: value });

    const isValid = /^[a-z0-9]+@[a-z]+(\.[a-z]{2,3}){1,2}$/i.test(value);
    setIsIdValid(isValid);
  };

  const handlePasswordInput = event => {
    const { value } = event.target;
    setMemberData({ ...memberData, userPassword: value });
    validatePassword(value);
  };

  const handlePasswordOkInput = event => {
    const { value } = event.target;
    setMemberData({ ...memberData, userPasswordOk: value });
    validatePassword(memberData.userPassword, value);
  };

  const validatePassword = (password, passwordOk) => {
    const isValid =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(
        password
      );

    const isMatch = password === passwordOk;

    setIsPasswordValid(isValid);
    setIsPasswordMatch(isMatch);
  };

  const handleInput = event => {
    const { name, value } = event.target;
    setMemberData({ ...memberData, [name]: value });

    if (name === 'userPassword' || name === 'userPasswordOk') {
      validatePassword(memberData.userPassword, memberData.userPasswordOk);
    }
  };

  const handleradioCheck = event => {
    const { name, value } = event.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const goToMain = () => {
    if (!memberData.userId || !isIdValid) {
      alert('이메일을 다시 입력해주세요!');
      return;
    }

    if (!memberData.userPassword || !isPasswordValid) {
      alert('비밀번호를 다시 입력해주세요!');
      return;
    }

    if (!isPasswordMatch) {
      alert('입력한 비밀번호와 일치하지 않습니다!');
      return;
    }
    fetch('http://10.58.52.230:3000/users/signUp', {
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
    }).then(response => {
      return response.json();
    });
    navigate('/');
  };

  return (
    <div className="first-title">
      <div className="title">
        <h1>회원가입</h1>
      </div>
      <div className="basicinfo">
        <div className="basic-info">기본정보</div>
      </div>
      <div className="signupform">
        <span className="password">이메일</span>
        <div className="writepwd">
          <input
            className="inputpwd"
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={handleEmailInput}
          />
          <span className="useemail">
            로그인 아이디로 사용할 이메일을 입력해 주세요.
          </span>
        </div>
        <span className="password">비밀번호</span>
        <div className="writepwd">
          <input
            className="inputpwd"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordInput}
          />
          <span className="usepwd">
            (영문 대/소문자, 숫자, 특수기호 8~20개 사이를 입력해주세요)
          </span>
        </div>
        <div className="pwd-ok">
          <span className="checkpwd">비밀번호 확인</span>
          <input
            className="input-checkpwd"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            onChange={handlePasswordOkInput}
          />
        </div>
        <div className="writename">
          <span className="name">이름</span>
          <input
            className="inputname"
            type="text"
            placeholder="실명으로 기입해주세요"
            name="userName"
            onChange={handleInput}
          />
        </div>
        <div className="write-address">
          <span className="address">주소</span>
          <input
            className="input-address"
            type="text"
            placeholder="주소"
            name="userAddress"
            onChange={handleInput}
          />
        </div>
        <div className="write-phonenumber">
          <span className="phonenumber">전화번호</span>
          <input
            className="input-phonenumber"
            type="text"
            placeholder="000-0000-0000"
            name="userPhoneNumber"
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="plusinfo">
        <div className="plus-info">추가정보</div>
      </div>
      <div className="plusinfoform">
        <div className="write-birth">
          <span className="birth">생년월일</span>
          <input
            className="input-birth"
            type="text"
            placeholder="YYYY-MM-DD"
            name="userBirth"
            onChange={handleInput}
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
      <div className="agree-check">
        <input
          type="checkbox"
          id="agree-all"
          name="agree-all"
          onChange={handleAllAgreeChange}
          checked={isAllAgreed}
        />
        <label for="agree-all">전체 동의합니다 </label>
      </div>
      <span className="check-agree">
        선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수
        있습니다.
      </span>
      <div className="agree-essential">
        <input type="checkbox" id="agree-condition" name="agree-condition" />
        <label for="agree-condition">[필수] 이용약관 동의 </label>
      </div>
      <div className="agree-essential">
        <input type="checkbox" id="agree-condition" name="agree-condition" />
        <label for="agree-condition">[필수] 개인정보 수집 및 동의</label>
      </div>
      <div className="agree-select">
        <input type="checkbox" id="agree-message" name="agree-message" />
        <label for="agree-message">
          [선택] SMS (문자, 카카오톡 등)으로 혜택과 유용한 정보를 보내드려도
          될까요?
        </label>
      </div>
      <div className="select-info">
        <input type="checkbox" id="agree-send" name="agree-send" />
        <label for="agree-send">
          [선택] 이메일로 혜택과 정보를 보내드려도 될까요?
        </label>
      </div>
      <div className="text">
        <span className="check-all">
          본인은 만 14세 이상이며,이용약관, 수집 및 이용을 확인하며, 동의합니다.
        </span>
      </div>
      <button className="signupbtn" type="button" onClick={goToMain}>
        가입하기
      </button>
    </div>
  );
};

export default SignUp;
