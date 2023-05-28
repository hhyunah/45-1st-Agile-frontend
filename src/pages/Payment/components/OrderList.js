import React from 'react';
import './OrderList.scss';

const OrderList = ({ orderInfo }) => {
  // ~ 이외의 제품(-1)
  const orderLength = orderInfo.length - 1;

  return (
    <div className="order-list">
      <div className="text-xl">주문제품</div>
      <div className="order-list-main">
        {orderInfo.length === 0 && <div>장바구니를 불러올 수 없습니다.</div>}
        {orderInfo.length !== 0 && (
          <div>
            {orderInfo[0]?.title}{' '}
            {orderLength > 0 && <span>외 {orderLength}개 </span>}
            제품을 주문합니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
