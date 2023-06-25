# 아마존s3 배포주소 : http://esteemup.s3-website.ap-northeast-2.amazonaws.com/

# 45기 1차 프로젝트

- Team Name : Agile <br>
- Project Name : Esteem-up <br>  <br>

- Product Manager: 김준섭(F) <br>
- Project Manager: 이지은(B) <br>
- Teammates: 김희연(F), 박현아(F), 오승민(F), 오진석(B), 이소진(F) <br>

<br>


# TECH STACK

<div display=flex >

### FRONTEND <br>
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=red"> 
 
### BACKEND <br>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=TypeORM&logoColor=white">
<img src="https://img.shields.io/badge/postman-FF4500?style=for-the-badge&logo=postman&logoColor=white">
 
### CO-OP TOOLS <br>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">
<img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=Trello&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
</div>


로그인 / 회원 가입 기능 - 이소진

회원가입 기능 

![ezgif com-video-to-gif](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/73672946/0288aea6-ed83-4fc3-9787-72f958c103bc)

[FE] : ● 회원 가입시 적어야 할 사항들을 다 적은 후 필수 체크박스를 선택하지 않은 후 가입하기를 누르면 필수 선택을 선택해 달라고 합니다. 
       
로그인 기능

![ezgif com-video-to-gif (1)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/73672946/926b7263-26a6-41f2-a2d0-63b91b745a39)

[FE] : ● 로그인시 회원가입에 적었던 정보와 일치하지 않으면아이디와 비밀번호를 다시 확인해달라고 알림창이 뜹니다.
      

------------------------
### Nav / Header - 김준섭

Header :
1) 토큰값이 없을때는 "로그인"이라는 글씨가 나오고 토큰값이 있을때는 "로그아웃"이라는 버튼이 나옵니다. 각 버튼은 적절한 기능이 분배되어 있어 고객이 쉽게 로그인 로그아웃을 할 수 있도록 합니다.
2) 토큰값이 없을때는 "회원가입"이라는 글씨가 나오고 토큰값이 있을때는 "마이페이지"라는 버튼이 나옵니다. 각 버튼은 적절한 기능이 분배되어 있어 고객이 쉽게 마이페이지, 회원가입 페이지에 접근하도록 돕습니다.


Nav :
1) 스크롤의 높이에 따라 nav 바가 등장했다 사라졌다 하는 로직을 구현하여 ux적으로 고객에게 만족감을 부여합니다.

----------------------------------------------------------

### 메인페이지/ProductList - 김준섭
1) 비디오 태그를 추가하여 동적인 화면 구현
2) 상품 호버시 상품과 가격이름을 크게 만드는 ux구현
3) 상품리스트 동적 배열
  1. 버튼 클릭시 좌우 이동하는 로직 구현
  2. nav 클릭시 바뀌는 상품 리스트 로직 구현
  3. 쿼리스트링을 이용해 하나의 컴포넌트로 여러 정보를 제공
  4. uselocation 을 이용해 페이지네이션 구현
  5. 쿼리스트링을 이용해 productlist 소팅 기능 구현
  6. hover 시 등장하는 모달창 구현



* 캐러샐 기능
  
![캐러샐_기능_AdobeExpress](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/127650045/b2235c9a-d6ef-4cbb-ae71-e36501a464eb)



* 컴포넌츠 교체방식으로 한공간에서 여러정보 노출
  
![탭화면_AdobeExpress](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/127650045/37fb2875-932b-40a3-8392-b35780c444c4)



* 카테고리 모달

![카테고리모달_AdobeExpress](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/127650045/48b84b48-7b41-4e78-91e2-3fa224554b2b)



* 페이지네이션

![페이지네이션_AdobeExpress](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/127650045/a7b0bd9a-53e3-48e9-aaa6-204ba6dddffa)



* 소팅 기능

![소팅_AdobeExpress](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/127650045/a0e3e7b1-8a40-444c-b9d7-cef0f02254a1)

---------------------------------------
<br>
장바구니 페이지 - 오승민
<br />

기능
- 체크박스 개별선택, 전체선택, 선택삭제
- 구독제품과 일반배송 제품 구분
- 수량변경에 따른 가격변동 
- 4만원 이상 구매 시 무료배송으로 변경
<br />

구독 옵션 설정 후 장바구니 담기 <br/>

![구독상품](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/130316191/adf31377-bef4-46b5-b671-ed22149babb2)


체크박스 전체선택 후 선택삭제 <br/>
![전체선택,선택삭제](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/130316191/64b6b8ae-f388-49b6-bfe9-1e0f5f28775b)

수량 변경 후 선택삭제 <br />
![수량변경,선택삭제](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/130316191/11adcc2a-8a58-48fa-803f-649137025e37)

x 버튼으로 개별삭제 <br />
![수량변경,삭제](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/130316191/7fe560cd-4b76-417c-93f5-489f02322427)


구매하기 버튼 클릭 시 결제페이지로 이동 <br />
![ezgif com-video-to-gif](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/130316191/e4ad6ce5-ca73-4911-b676-5ecdb9bae118)

------------------------
### 결제페이지 - 박현아

1) '주문 제품'에서 주문 제품 리스트 구현
2) '주문자 정보'에서 서버와의 통신을 통해서 현재 고객정보를 받아와 노출
3) '배송 정보'에서 현재 고객정보를 초기값으로 설정하고, 라디오 버튼으로 '새로운 배송지' 입력 가능, '요청사항'을 select로 구현하여 선택가능
4) 휴대폰 번호 입력시 '000-0000-0000' 꼴을 사용하기 위해 숫자만 입력했을때, 자동으로 해당 꼴로 변환
5) 구독상품 구매시 '정기배송 시작일' 설정가능, 초기값으로 접속일+1일로 정기구독을 신청하도록 설정
6) '결제수단'에서 현재, 사용, 적립, 예상잔여 포인트를 보여주고, 약관 동의 체크박스 구현 (사용 포인트 70000점 이상시 포인트 적립)
7) 입력값 미입력시(미선택시) 재요청하는 메시지 노출
8) '결제정보'에서 주문제품의 가격과 배송비, 총 결제금액 노출
9) 백엔드에 결제 요청하고 요청 불가시 에러페이지 노출, 성공시 주문완료페이지에서 주문번호와 결제금액 노출

- **결제페이지 레이아웃** <br />
  ![ezgif com-video-to-gif (3)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/b2d182fa-9901-437c-8fed-3666ba2a109a)

- **배송정보 변경** <br />
![ezgif com-video-to-gif (4)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/2061ff24-1c94-4374-8c80-af14a8301873)

- **결제하기** <br />
![ezgif com-video-to-gif (5)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/4e690db5-df1c-44d5-9fd6-c6ad429fc952)


----------------------------------------------------------

### 마이페이지 - 박현아

1) 마이페이지의 메뉴바 UI 노출
2) 해당 메뉴 hover시 배경색 변화 및 클릭시 해당 메뉴 컴포넌트로 변경
3) 메인페이지에서 고객센터 방문시 자동으로 '고객센터' 메뉴로 설정
4) 메인페이지에서 관심상품 방문시 자동으로 '관심상품' 메뉴로 설정
5) 고객센터 메뉴는 로그인, 로그아웃 모든 모드에서 이용가능
6) 나머지 메뉴는 로그아웃 상태에서 이용불가, 해당 메뉴 클릭시 로그인 페이지로 이동
7) '주문배송 현황, 조회' 메뉴에서 해당 고객의 주문건에 따라 백엔드에서 통신하여 주문 제품 노출, 구독 상품 주문시, 구독 주기 노출
8) '정기구독 관리' 메뉴에서 백엔드에서 통신하여 해당 구독 상품에 대한 구독 시작 및 주기, 가격 노출
9) '관심상품' 메뉴에서 상세페이지에서 관심상품 누른 상품에 대해서 백엔드에서 통신하여 노출, 해당 상품 개별 삭제 및 장바구니 추가 가능, query string을 이용해 선택상품 삭제 가능, 백엔드에 변경된 관심상품 리스트 통신 구현
10) '정보수정' 기능으로 모달창에서 현재 비밀번호 입력 후 수정가능 구현(백엔드와 해당 비밀번호 일치 기능 통신)
11) '정보수정' 기능으로 비밀번호와 비밀번호 확인 유효성 검사 구현과 비밀번호 변경을 백엔드와 통신하여 구현
12) '정보수정' 기능으로 휴대폰 번호, 주소 정보 수정을 백엔드와 통신하여 구현

- **마이페이지 레이아웃** <br />
![ezgif com-video-to-gif (6)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/db295ebc-d106-44fc-89f7-f5e57fe4fe5d)


- **주문배송 조회** <br />
![ezgif com-video-to-gif (7)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/97f1bfb3-5086-4aaa-a776-6555bbda9b02)


- **정기구독 관리** <br />
![ezgif com-video-to-gif (12)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/88028273-b044-4852-9ac6-53eb43be2640)


- **관심상품 보기** <br />
![ezgif com-video-to-gif (8)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/004a9677-c155-446c-ae18-aac349c72e2e)


- **관심상품 삭제 및 장바구니 추가** <br />
![ezgif com-video-to-gif (9)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/242f1370-0928-45fc-a270-a7d6361eb566)


- **정보수정 페이지 이동** <br />
![ezgif com-video-to-gif (2)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/d051232b-b117-4ec8-a4a7-f972340adf79)


- **비밀번호 수정** <br />
![ezgif com-video-to-gif (10)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/d0474650-8d67-44d8-81f7-b0f9e69219bd)


- **회원정보수정(주소, 휴대폰번호)** <br />
![ezgif com-video-to-gif (11)](https://github.com/wecode-bootcamp-korea/45-1st-Agile-frontend/assets/33508589/c2f196b2-b98d-404d-aff0-f00d1145b7bc)


----------------------------------------------------------
