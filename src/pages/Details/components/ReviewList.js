import React, { useEffect, useState } from 'react';
import Review from './Review';
import ReviewPaginationButton from './ReviewPaginationButton';
import './ReviewList.scss';

const LIMIT = 5;

const ReviewList = ({ bookId, token }) => {
  const [reviewsData, setReviewsData] = useState([]);
  const [total, setTotal] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const pageTotal = Number(total.count);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const offset = (currentPage - 1) * LIMIT;

        const res = await fetch(
          `http://13.209.8.13:3000/books/${bookId}/reviews?limit=${LIMIT}&offset=${offset}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: token,
            },
          }
        );
        const data = await res.json();
        setReviewsData(data.reviews);
        setTotal(data.reviewsCount);
      } catch (e) {
        console.error(e);
      }
    };

    fetchReviewsData();
  }, [currentPage, bookId]);

  if (reviewsData.length === 0) return;

  const pageNumber = Math.ceil(pageTotal / LIMIT);
  const pageNumberArr = [...Array(pageNumber)].map((_, index) => index + 1);

  const handlePageClick = num => () => {
    setCurrentPage(num);
  };

  return (
    <div>
      {reviewsData.map((review, index) => {
        return <Review review={review} key={index} />;
      })}

      <div>
        <div className="review-pagination-buttons">
          {pageNumberArr.map(num => {
            return (
              <ReviewPaginationButton
                point={`${num === currentPage ? 'selected-page' : ''}`}
                onClick={handlePageClick(num)}
                key={num}
              >
                {num}
              </ReviewPaginationButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
