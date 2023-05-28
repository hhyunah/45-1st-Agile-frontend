import React from 'react';
import LikesProduct from './LikesProduct';
import './LikesList.scss';

const LikesList = ({ likesArr, checkItems, setCheckItems, likesGetFetch }) => {
  //체크박스 함수(checkItems: 체크된 id 값만 push, state로 관리)
  const isAllChecked = checkItems.length === likesArr ? likesArr.length : 0;

  //전체선택 체크박스
  const handleAllCheck = checked => {
    if (checked) {
      const idArr = [];
      likesArr.forEach(el => idArr.push(el.id));
      setCheckItems(idArr);
    } else {
      setCheckItems([]);
    }
  };

  //개별선택 체크박스
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  //관심상품 삭제하기
  const likesDeleteFetch = id => {
    let query = '';

    if (id) {
      //개별삭제(버튼)
      query += 'likeId=' + id;
    } else {
      //선택삭제(체크박스)
      checkItems.forEach(ele => (query += 'likeId=' + ele + '&'));
      query = query.slice(0, -1);
    }

    fetch(`http://13.209.8.13:3000/likes?${query}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    likesGetFetch(); // 다시 관심상품 GET(관심상품 리스트 불러와서 map)
  };

  return (
    <div className="likes-list">
      <div className="likes-select">
        <div className="all-select">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={e => handleAllCheck(e.target.checked)}
          />
          <div className="text-lg">
            <b onClick={() => handleAllCheck(!isAllChecked)}>전체선택</b> (
            {checkItems ? checkItems.length : 0}/
            {likesArr ? likesArr.length : 0})
          </div>
        </div>
        <div onClick={() => likesDeleteFetch()}>선택삭제</div>
      </div>
      <div className="likes-list-items">
        {(!likesArr || likesArr.length === 0) && (
          <div className="no-list">관심 상품이 없습니다.</div>
        )}
        {likesArr &&
          likesArr.length !== 0 &&
          likesArr.map(data => {
            return (
              <LikesProduct
                key={data.id}
                data={data}
                checkItems={checkItems}
                handleSingleCheck={handleSingleCheck}
                likesDeleteFetch={likesDeleteFetch}
              />
            );
          })}
      </div>
    </div>
  );
};

export default LikesList;
