import React, { useState, useEffect } from 'react';
import ItemTitle from './ItemTitle';
import SubscribesProduct from './SubscribesProduct';
import './Subscribes.scss';

const Subscribes = () => {
  const [subList, setSubList] = useState([]);

  //구독상품 불러오기
  useEffect(() => {
    fetch('http://13.209.8.13:3000/orders/subscribe', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        const { result } = data;
        setSubList(result);
      });
  }, []);

  return (
    <div className="subscribes">
      <ItemTitle title="정기구독 관리" />
      <div className="subscribes-main">
        <div className="text-lg application-details">
          신청내역 ({subList ? subList.length : 0}건)
        </div>
        <div className="subscribes-list">
          {(!subList || subList.length === 0) && (
            <div className="no-list">신청내역이 없습니다.</div>
          )}
          {subList &&
            subList.length !== 0 &&
            subList.map(data => {
              return <SubscribesProduct key={data.id} data={data} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Subscribes;
