import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './WishlistButton.scss';

const WishlistButton = ({ id, isLikeChanged, setIsLikeChanged, token }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const addToLikes = async () => {
    try {
      const res = await fetch('http://13.209.8.13:3000/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
        body: JSON.stringify({ bookId: id }),
      });
      if (res.ok) {
        const data = await res.json();
        const message = data.message;
        setIsLikeChanged(!message.includes('Deleted'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikesClick = () => {
    if (token) {
      addToLikes();
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  return (
    <button
      className="wishlist-button common-action-button"
      onClick={handleLikesClick}
    >
      <img
        src={`/images/details/${isLikeChanged ? 'red-' : ''}heart.svg`}
        alt="wish"
        className="wish-img"
      />
    </button>
  );
};

export default WishlistButton;
