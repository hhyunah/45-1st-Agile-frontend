import React from 'react';
import './ShipmentSelect.scss';

const ShipmentSelect = ({ switchRadio, setRadio, radio }) => {
  // 배송지 선택 라디오 변경
  const handleRadio = () => {
    setRadio(!radio);
    switchRadio();
  };

  return (
    <div className="shipment-select">
      <div className="text-lg">배송지 선택</div>
      <div className="radio-select">
        <label className="location-same">
          <input type="radio" checked={radio} onClick={handleRadio} />
          <div className="text-base">주문자 정보와 동일</div>
        </label>
        <label className="location-new">
          <input type="radio" checked={!radio} onClick={handleRadio} />
          <div className="text-base">새로운 배송지</div>
        </label>
      </div>
    </div>
  );
};

export default ShipmentSelect;
