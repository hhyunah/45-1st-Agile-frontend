import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderList from './components/OrderList'; //주문제품
import Orderer from './components/Orderer'; //주문자 정보
import Shipment from './components/Shipment'; //배송 정보
import Subscribe from './components/Subscribe'; //정기배송 시작일
import PaymentMethod from './components/PaymentMethod'; //결제수단
import PaymentInfo from './components/PaymentInfo'; //결제정보
import InvalidAccess from './InvalidAccess';
import Mainlayout from '../../pages/Details/Mainlayout';
import './Payment.scss';

let cartId = [];
let flag = false;

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({});
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderMode, setOrderMode] = useState({});
  const [radio, setRadio] = useState(true);
  const [info, setInfo] = useState({});
  const [checkItems, setCheckItems] = useState([]);

  const handleInfo = e => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });

    if (name === 'receiver_phoneNumber') {
      if (info.receiver_phoneNumber?.length === 10) {
        let v = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        setInfo({ ...info, [name]: v });
      }
    }
  };

  const { productsInfo } = location.state;

  //고객정보 불러오기
  useEffect(() => {
    fetch('http://13.209.8.13:3000/users', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        const user = data.user;
        setUserInfo(user);

        setInfo({
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          address: user.address,
          receiver_name: user.name,
          receiver_phoneNumber: user.phoneNumber,
          receiver_address: user.address,
          subscribeStart: subDate(),
        });
      });

    setOrderMode(productsInfo);
    setOrderInfo(productsInfo.data);
    if (orderMode.mode) cartId = productsInfo.cartIds;
  }, []);

  orderInfo.forEach(ele => {
    if (ele.isSubscribe) flag = true;
  });

  //라디오변경으로 고객정보 변경
  const switchRadio = () => {
    for (let key in info) {
      if (key.includes('receiver')) {
        if (radio) {
          info[key] = '';
        } else {
          info[key] = userInfo[key.slice(9)];
        }
      }
    }
  };

  const handlePayButton = () => {
    if (
      info.receiver_address === '' ||
      info.receiver_name === '' ||
      info.receiver_phoneNumber === ''
    ) {
      alert('배송정보를 입력해주세요.');
      return;
    } else if (checkItems.length < 2) {
      alert('모든 약관에 동의해주세요.');
      return;
    } else if (point.remainPoint < 0) {
      alert('포인트가 부족합니다.');
      navigate('/invalidAccess');
      return;
    }

    // 상세 -> 결제
    if (!orderMode.mode) {
      fetch('http://13.209.8.13:3000/orders/direct', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          address: info.receiver_address,
          subscribeDeliveryTime: info.subscribeStart,
          bookId: orderInfo[0]?.bookId,
          quantity: orderInfo[0]?.quantity,
          subscribeCycle: productsInfo.data[0].subscribeCycle,
        }),
      })
        .then(res => res.json())
        .then(res => {
          const { message, data } = res;
          navigate('/orderCompleted', {
            state: {
              orderNumber: data.orderNumber,
              price: point.usePoint,
            },
          });
        });
    }

    // 장바구니 -> 결제
    else {
      fetch('http://13.209.8.13:3000/orders', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          address: info.receiver_address,
          subscribeDeliveryTime: info.subscribeStart,
          cartIds: productsInfo.cartIds,
        }),
      })
        .then(res => res.json())
        .then(res => {
          const { message, data } = res;

          navigate('/orderCompleted', {
            state: {
              orderNumber: data.orderNumber,
              price: point.usePoint,
            },
          });
        });
    }
  };

  if (orderMode === {}) return;

  const point = {
    curPoint: parseInt(userInfo?.points),
    usePoint: orderMode.subtotal + (orderMode.subtotal < 40000 ? 3000 : 0),
    earnPoint: orderMode.totalPrice >= 70000 ? orderMode.totalPrice * 0.02 : 0,
    remainPoint:
      parseInt(userInfo?.points) -
      orderMode.totalPrice +
      (orderMode.totalPrice >= 70000 ? orderMode.totalPrice * 0.02 : 0),
    price: orderMode.subtotal,
    shipmentFee: orderMode.subtotal < 40000 ? 3000 : 0,
  };

  //token 없을때 예외처리
  if (!localStorage.getItem('token')) return <InvalidAccess />;

  ////////////////////////////////////////////////////////////////////////
  // main
  return (
    <Mainlayout>
      <div className="payment">
        <div className="order-sheet">
          <p className="text-2xl">주문서</p>
        </div>

        <OrderList orderInfo={orderInfo} />
        <Orderer info={info} handleInfo={handleInfo} />
        <Shipment
          info={info}
          handleInfo={handleInfo}
          setRadio={setRadio}
          radio={radio}
          switchRadio={switchRadio}
        />
        {flag && <Subscribe info={info} handleInfo={handleInfo} />}
        <div className="pay-part">
          <PaymentMethod
            point={point}
            checkItems={checkItems}
            setCheckItems={setCheckItems}
          />
          <PaymentInfo point={point} />
        </div>
        <div className="pay">
          <button className="pay-button" onClick={handlePayButton}>
            결제하기
          </button>
        </div>
      </div>
    </Mainlayout>
  );
};
export default Payment;

const subDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate() + 1; //next day

  if (month < 10) {
    month = '0' + String(month);
  }
  if (day < 10) {
    day = '0' + String(day);
  }

  const date = year + '-' + month + '-' + day;
  return date;
};
