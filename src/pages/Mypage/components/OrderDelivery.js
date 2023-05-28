import React from 'react';
import ItemTitle from './ItemTitle';
import './OrderDelivery.scss';

const OrderDelivery = ({ setMenuMode, orderStatus }) => {
  //주문배송조회로 메뉴모두 바꿈
  const handleOnclick = () => {
    setMenuMode(1);
  };

  return (
    <div className="order-delivery">
      <ItemTitle title="주문배송 현황" />
      <div className="order-delivery-main" onClick={handleOnclick}>
        {PRESENT_CONDITION_INFO.map(data => {
          return (
            <>
              <div key={data.id} className="condition-mode">
                <div className="text-2xl">
                  {orderStatus ? orderStatus[data.type] : 0}
                </div>
                <div className="mode">{data.title}</div>
              </div>
              <div className="text-lg">{'>'}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDelivery;

const PRESENT_CONDITION_INFO = [
  { id: 1, title: '배송준비중', type: 'PENDING' },
  { id: 2, title: '배송중', type: 'SHIPPING' },
  { id: 3, title: '배송완료', type: 'COMPLETE' },
];
