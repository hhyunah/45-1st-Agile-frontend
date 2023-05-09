import React from 'react';
import './DescriptionArea.scss';

const DescriptionArea = ({ description }) => {
  return (
    <div>
      <div className="book-description text-2xl">{description}</div>
      <img src="/images/details/411888208(2).jpg" alt="" />
    </div>
  );
};
export default DescriptionArea;
