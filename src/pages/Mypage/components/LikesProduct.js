import React from 'react';
import './LikesProduct.scss';

const LikesProduct = ({
  data,
  checkItems,
  handleSingleCheck,
  likesDeleteFetch,
}) => {
  //장바구니추가(버튼)
  const handleLikesAddCart = () => {
    alert('장바구니에 추가되었습니다.');
    fetch('http://13.209.8.13:3000/carts', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        bookId: data.bookId,
        amount: 1,
        isSubscribe: data.isSubscribe,
      }),
    });
  };

  return (
    <div className="likes-product">
      <div className="likes-left">
        <input
          type="checkbox"
          className="checkbox"
          checked={checkItems.includes(data.id)}
          onChange={e => handleSingleCheck(e.target.checked, data.id)}
        />
        <img alt="관심제품" src={data.thumbnail} width="90" />
        <div className="product-info">
          <div className="product-name">
            {data.isSubscribe === 1 && <span>[구독]</span>}
            {data.title}
          </div>
          <div className="product-price">
            {parseInt(data.price).toLocaleString()}원
          </div>
        </div>
      </div>
      <div className="likes-right">
        <button onClick={() => likesDeleteFetch(data.id)}>삭제</button>
        <button className="likes-cart" onClick={handleLikesAddCart}>
          장바구니
        </button>
      </div>
    </div>
  );
};

export default LikesProduct;
