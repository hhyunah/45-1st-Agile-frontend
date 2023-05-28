import React from 'react';
import OrderItems from './OrderItems';
import ItemTitle from './ItemTitle';
import './OrderStatus.scss';

const OrderStatus = ({ dataStatus }) => {
  return (
    <div className="order-status">
      <ItemTitle title="주문내역 조회" />
      {(!dataStatus || dataStatus.length === 0) && (
        <div className="no-order-status">
          <div>주문하신 상품이 없습니다.</div>
        </div>
      )}

      <div className="ok-order-status">
        {dataStatus &&
          dataStatus.length !== 0 &&
          dataStatus.map((data, index) => {
            return <OrderItems key={index} data={data} />;
          })}
      </div>
    </div>
  );
};

export default OrderStatus;
