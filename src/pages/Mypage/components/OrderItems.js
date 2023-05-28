import React from 'react';
import OrderProducts from './OrderProducts';
import './OrderItems.scss';

const OrderItems = ({ data }) => {
  return (
    <div className="order-items">
      <div className="order-title">
        <div className="text-lg order-date">
          <b>{data.createdAt} </b>
        </div>
        <div>{data.status}</div>
      </div>
      <div className="order-products-map">
        {data.books.map(data => (
          <OrderProducts key={data.title} data={data} />
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
