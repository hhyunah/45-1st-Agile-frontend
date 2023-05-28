import React from 'react';
import ShipmentSelect from './ShipmentSelect';
import './Shipment.scss';

const Shipment = ({ info, handleInfo, switchRadio, setRadio, radio }) => {
  return (
    <div className="shipment">
      <div className="text-xl">배송 정보</div>
      <div className="shipment-main">
        <ShipmentSelect
          switchRadio={switchRadio}
          setRadio={setRadio}
          radio={radio}
        />

        {SHIPMENT_INFO.map(data => {
          return (
            <div className="courier-info" key={data.id}>
              <div className="text-lg">{data.title}</div>
              <input
                name={data.type}
                value={info[data.type]}
                onChange={handleInfo}
                readOnly={radio}
                maxLength={data.maxLength}
              />
            </div>
          );
        })}

        <div className="request">
          <div className="text-lg">요청사항</div>
          <select>
            {SELECT_MSG.map(data => (
              <option key={data.id}>{data.text}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Shipment;

const SHIPMENT_INFO = [
  { id: 1, title: '받는 사람', type: 'receiver_name' },
  { id: 2, title: '주소', type: 'receiver_address' },
  { id: 3, title: '휴대폰 번호', type: 'receiver_phoneNumber', maxLength: 13 },
];

const SELECT_MSG = [
  { id: 0, text: '-- 메시지 선택 (선택사항) --' },
  { id: 1, text: '배송 전에 미리 연락바랍니다.' },
  { id: 2, text: '부재 시 경비실에 맡겨주세요.' },
  { id: 3, text: '부재 시 문 앞에 놓아주세요.' },
  { id: 4, text: '빠른 배송 부탁드립니다.' },
  { id: 5, text: '택배함에 보관해 주세요' },
];
