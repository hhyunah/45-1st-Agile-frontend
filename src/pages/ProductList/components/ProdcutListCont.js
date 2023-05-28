import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import StarFullIcon from '../../Main/components/StarFullIcon';
import SORTOPTION from './SORTOPTION';

import './ProductListCont.scss';

const ProductListCont = ({ categoryId, subCategoryId }) => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [booksCount, setBooksCount] = useState(0);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('orderBy');

  const selectValue = {
    countLikes: '추천순',
    newBooks: '신상품순',
    priceAsc: '낮은 가격순',
    priceDesc: '높은 가격순',
  };
  const handleLinkClick = () => {
    window.scrollTo(0, 550);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://13.209.8.13:3000/books${location.search}`
        );
        const data = await res.json();
        if (data.data) {
          setVisibleProducts(data.data);
        }
        const totalPages = Math.ceil(data.booksCount[0].booksCount / 9);
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        setBooksCount(data.booksCount[0].booksCount);
        setPages(pages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location.search, selectedSortOption]);

  useEffect(() => {
    const currentPage =
      parseInt(new URLSearchParams(location.search).get('offset'), 10) / 9 +
        1 || 1;
    const order = searchParams.get('orderBy') || '';
    setSelectedSortOption(order);
    setCurrentPage(currentPage);
  }, [location.search]);

  const handlePageClick = page => {
    const offset = (page - 1) * 9;
    searchParams.set('offset', offset);
    searchParams.set('orderBy', selectedSortOption);
    setSearchParams(searchParams);
    setCurrentPage(page);
  };

  const handleSortOptionChange = option => {
    setSelectedSortOption(option);
    searchParams.set('orderBy', option);
    searchParams.set('offset', 0);
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  return (
    <div className="product-list-cont">
      <div className="sort-option-container">
        <select
          className="sortingButton"
          value={selectedSortOption}
          onChange={event => {
            handleSortOptionChange(event.target.value);
          }}
        >
          {SORTOPTION.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="product-list-container">
        <div className="product-list">
          {visibleProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/books/${product.id}`}
              style={{ textDecoration: 'none' }}
              onClick={handleLinkClick}
            >
              <div className="product-item">
                <img
                  className="product-img"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div className="product-title">{product.title}</div>
                <div className="product-price">
                  {Number(product.price).toLocaleString()}원
                </div>
                <div className="product-score">
                  <StarFullIcon style={{ color: 'rgb(255, 223, 112)' }} />{' '}
                  {product.reviewScore ? product.reviewScore : 0} (
                  {product.reviewsCount})
                </div>
                <div className="product-subtitle">{product.subtitle}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="pagination-container">
        <div className="pagination">
          {pages.map(page => (
            <button
              key={page}
              className={`pagination-button ${
                currentPage === page ? 'active' : ''
              }`}
              onClick={() => {
                handlePageClick(page);
                handleLinkClick();
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListCont;
