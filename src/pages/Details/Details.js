import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from './Mainlayout';
import TitleLine from '../../components/TitleLine/TitleLine';
import Contents from './components/Contents';
import APIS from '../../config';
import './Details.scss';

const Details = () => {
  const [productDetail, setProductDetail] = useState({});
  const [productsInCart, setProductsInCart] = useState([]);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isLikeChanged, setIsLikeChanged] = useState('');
  const token = localStorage.getItem('token');
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(
      `http://13.209.8.13:3000/books/${id}`,
      !token
        ? null
        : {
            headers: {
              'content-Type': 'application/json;charset=utf-8',
              Authorization: token,
            },
          }
    )
      .then(res => res.json())
      .then(data => {
        setProductDetail(data);
        setIsOptionSelected(data.isSubscribe === 0);
        setIsLikeChanged(data.isLiked);
      })
      .catch(e => {
        console.error(e);
      });

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

    if (token) fetchCartData();
  }, [id, token]);

  if (!productDetail) return;

  return (
    <MainLayout>
      <TitleLine />
      <div className="product-detail-page">
        <Contents
          productDetail={productDetail}
          id={id}
          setProductsInCart={setProductsInCart}
          productsInCart={productsInCart}
          token={token}
          isOptionSelected={isOptionSelected}
          setIsOptionSelected={setIsOptionSelected}
          isLikeChanged={isLikeChanged}
          setIsLikeChanged={setIsLikeChanged}
        />
      </div>
    </MainLayout>
  );
};
export default Details;
