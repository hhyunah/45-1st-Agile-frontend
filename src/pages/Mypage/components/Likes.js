import React, { useState, useEffect } from 'react';
import ItemTitle from './ItemTitle';
import LikesList from './LikesList';
import './Likes.scss';

const Likes = () => {
  const [likesArr, setLikesArr] = useState([]); //관심상품 배열(map)
  const [checkItems, setCheckItems] = useState([]); //체크박스 배열(체크된것의 id값 저장)

  //관심상품 불러오기
  const likesGetFetch = () => {
    fetch('http://13.209.8.13:3000/likes', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        const { data } = res;
        setLikesArr(data);
      });
  };

  useEffect(() => {
    likesGetFetch(); //관심상품 불러오기 (GET)
  }, []);

  return (
    <div className="likes">
      <div className="likes-main">
        <ItemTitle
          title="관심 제품"
          details="관심 제품은 최대 200개까지 저장됩니다."
        />
        <LikesList
          likesArr={likesArr}
          checkItems={checkItems}
          setCheckItems={setCheckItems}
          likesGetFetch={likesGetFetch}
        />
      </div>
    </div>
  );
};

export default Likes;
