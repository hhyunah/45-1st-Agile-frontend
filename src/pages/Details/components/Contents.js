import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import ProductInformation from './ProductInformation';
import WishlistButton from './WishlistButton';
import ShareButton from './ShareButton';
import QuantityBox from './QuantityBox';
import ShippingInfo from './ShippingInfo';
import SubscribeOptions from './SubscribeOptions';
import CartModal from './CartModal';
import CartRecheckModal from './CartRecheckModal';
import './Contents.scss';

const Contents = ({
  productDetail,
  setProductsInCart,
  productsInCart,
  id,
  token,
  isOptionSelected,
  setIsOptionSelected,
  isLikeChanged,
  setIsLikeChanged,
}) => {
  const {
    quantity,
    title,
    subtitle,
    price,
    issueDate,
    isSubscribe,
    thumbnail,
    description,
    author,
  } = productDetail;
  const [count, setCount] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const [reCheckModalOpen, setRecheckModalOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [deliveryCycle, setDeliveryCycle] = useState('');
  const navigate = useNavigate();

  const bookId = parseInt(id);

  const totalPriceInCart = productsInCart.reduce((total, element) => {
    return total + Number(element.price) * Number(element.amount);
  }, 0);

  const productsInfo = {
    mode: false,
    data: [
      {
        bookId: bookId,
        title: title,
        price: price,
        isSubscribe: isSubscribe,
        quantity: count,
        subscribeCycle: deliveryCycle,
      },
    ],
    totalPrice: price * count < 40000 ? price * count + 3000 : price * count,
    subtotal: price * count,
  };
  const totalPrice = price * count;
  const openCartModal = () => {
    setModalOpen(true);
  };

  const addToCart = async () => {
    try {
      const res = await fetch('http://13.209.8.13:3000/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
        body: JSON.stringify({
          bookId: bookId,
          amount: count,
          isSubscribe: isSubscribe,
          subscribeCycle: deliveryCycle,
        }),
      });
      if (res.status >= 400 && res.status < 600) {
        throw new Error('장바구니 확인');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const fetchCartData = async () => {
    try {
      const res = await fetch('http://13.209.8.13:3000/carts', {
        headers: {
          'content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
      });
      const data = await res.json();
      setProductsInCart(data.data);
    } catch (e) {
      console.error(e);
    }
  };
  const handleCartClick = async () => {
    try {
      if (!isOptionSelected) {
        throw new Error('옵션을 선택해주세요.');
      }
      if (token) {
        await addToCart();
        await openCartModal();
        await fetchCartData();
      } else {
        navigate('/login');
      }
    } catch (e) {
      console.log(e);
      if (!e.message.includes('옵션')) {
        setRecheckModalOpen(true);
      } else {
        alert('옵션을 선택해주세요.');
      }
    }
  };

  const handlePaymentClick = () => {
    if (token) {
      if (isOptionSelected) {
        navigate('/payment', {
          state: { productsInfo },
        });
      } else {
        alert('옵션을 선택해주세요.');
      }
    } else {
      navigate('/login');
    }
  };

  const handleProductsInCarts = async () => {
    try {
      const res = await fetch('http://13.209.8.13:3000/carts/add', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
        body: JSON.stringify({ bookId: bookId, amount: count }),
      });
      if (res.ok) {
        setRecheckModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="contents">
      <div className="contents-area">
        <div className="thumbnail">
          <img className="product-img" alt="" src={thumbnail} />
        </div>
        <div className="product-info">
          <div className="product-title">
            <div>{title}</div>
            <div className="product-actions">
              <WishlistButton
                id={id}
                isLikeChanged={isLikeChanged}
                setIsLikeChanged={setIsLikeChanged}
                token={token}
              />
              <ShareButton />
            </div>
          </div>
          <div className="book-meta text-sm">
            <div className="book-author">{author}</div>
            <div className="book-issue-date">{issueDate}</div>
          </div>
          <p className="product-desc">{subtitle}</p>
          <div className="product-summary">
            <div className="product-title-repeat">{title}</div>
            <div className="product-price-repeat">
              {`${totalPrice.toLocaleString()}원`}
            </div>
            <QuantityBox count={count} setCount={setCount} />
          </div>
          {isSubscribe === 1 && (
            <SubscribeOptions
              isOptionSelected={isOptionSelected}
              setIsOptionSelected={setIsOptionSelected}
              selected={selected}
              setSelected={setSelected}
              setDeliveryCycle={setDeliveryCycle}
            />
          )}
          <div className="price-info">
            <div className="text-sm test2">총 제품금액</div>
            <div className="text-2xl">{`${totalPrice.toLocaleString()}원`}</div>
          </div>
          <div>
            <ShippingInfo totalPriceInCart={totalPriceInCart} />
            <div className="cart-purchase-container">
              <Button color="white" onClick={handleCartClick}>
                장바구니
              </Button>
              {modalOpen && (
                <CartModal title={title} setModalOpen={setModalOpen} />
              )}
              {reCheckModalOpen && (
                <CartRecheckModal
                  setRecheckModalOpen={setRecheckModalOpen}
                  handleProductsInCarts={handleProductsInCarts}
                />
              )}
              {quantity > 0 ? (
                <Button color="black" onClick={handlePaymentClick}>
                  구매하기
                </Button>
              ) : (
                <Button color="gray">품절</Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ProductInformation
        bookId={bookId}
        description={description}
        token={token}
      />
    </div>
  );
};
export default Contents;
