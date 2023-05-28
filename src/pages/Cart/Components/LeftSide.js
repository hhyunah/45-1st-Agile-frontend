import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import './LeftSide.scss';

const LeftSide = ({
  productList,
  setProductList,
  selectedProducts,
  setSelectedProducts,
  token,
  subtotal,
  total,
  DELIVERY_FEE,
}) => {
  const [cartId, setCartId] = useState(null);
  const handleQuantityChange = async (key, value) => {
    try {
      const selectedItem = productList.map(product =>
        product.cartId === key && selectedProducts.includes(key)
          ? { ...product, amount: Math.max(1, product.amount + value) }
          : product
      );
      await setProductList(selectedItem);
      const selectedProduct = selectedItem.find(
        product => product.cartId === key && selectedProducts.includes(key)
      );
      if (selectedProduct) {
        setCartId(selectedProduct.cartId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //PATCH 메서드로 상품 수량 변경 요청 보내기
  useEffect(() => {
    if (cartId) {
      const value = productList.find(
        product => product.cartId === cartId
      ).amount;
      fetch('http://13.209.8.13:3000/carts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
        body: JSON.stringify({ cartId: cartId, amount: value }),
      })
        .then(res => res.json())
        .then(data => {
          // GET 메서드로 데이터 다시 가져오기
          fetch(`http://13.209.8.13:3000/carts?cartId=${cartId}`, {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          })
            .then(res => res.json())
            .then(data => {})
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    }
  }, [cartId, productList, token]);

  const handleDelete = () => {
    selectedProducts.forEach(key => {
      // DELETE 메서드로 상품 삭제 요청 보내기
      fetch(`http://13.209.8.13:3000/carts?cartId=${key}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    });

    // 선택한 상품들 제거하기
    setProductList(
      productList.filter(product => !selectedProducts.includes(product.cartId))
    );
    setSelectedProducts([]);
  };

  const handleDeleteItem = key => {
    setCartId(null);
    setProductList(productList.filter(product => product.cartId !== key));
    setSelectedProducts(
      selectedProducts.filter(selectedKey => selectedKey !== key)
    );
    // DELETE 메서드로 상품 삭제 요청 보내기
    fetch(`http://13.209.8.13:3000/carts?cartId=${key}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        fetch(`http://13.209.8.13:3000/carts?cartId=${cartId}`, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        })
          .then(res => res.json())
          .then(data => {
            setProductList(data.data);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  };

  const handleCheckboxChange = (key, isChecked) => {
    if (key === 'all') {
      setSelectedProducts(
        isChecked ? productList.map(product => product.cartId) : []
      );
    } else {
      setSelectedProducts(
        isChecked
          ? [...selectedProducts, key]
          : selectedProducts.filter(selectedKey => selectedKey !== key)
      );
    }
  };
  return (
    <div className="left-side">
      <div className="check-box-controller">
        <input
          type="checkbox"
          checked={selectedProducts.length === productList.length}
          onChange={e => handleCheckboxChange('all', e.target.checked)}
        />
        <div className="text-left">
          <span className="select-all">전체선택</span>
          <span className="division">|</span>
          <span
            className="select-delete"
            onClick={selectedProducts => handleDelete(selectedProducts)}
          >
            선택삭제
          </span>
        </div>
      </div>
      <div className="normal-delivery">
        {productList.every(el => el.isSubscribe === 0)
          ? `일반배송`
          : productList.every(el => el.isSubscribe === 1)
          ? '정기배송'
          : `상품배송`}
      </div>
      <div className="normal-deliver-things">
        {productList.map(product => (
          <ProductItem
            key={product.cartId}
            product={product}
            productList={productList}
            setProductList={setProductList}
            handleCheckboxChange={handleCheckboxChange}
            handleQuantityChange={handleQuantityChange}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            handleDeleteItem={handleDeleteItem}
            subtotal={subtotal}
          />
        ))}
      </div>
      <div className="amount">
        {`제품가격 ${subtotal.toLocaleString()}원 + 배송비
        ${subtotal >= 40000 ? '0' : DELIVERY_FEE.toLocaleString()}원 =
        ${
          subtotal >= 40000 ? subtotal.toLocaleString() : total.toLocaleString()
        } 원`}
      </div>
    </div>
  );
};

export default LeftSide;
