import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { getimgurl } from '../../utils/getimgurl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../redux/feature/cart/carSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addTocart(product));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          {/* Updated Link to /books/:id */}
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getimgurl(book.coverImage)}`}
              alt=""
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          {/* Updated Link to /books/:id */}
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.title}
            </h3>
          </Link>

          <p className="text-gray-600 mb-5">
            {book?.description
              ? book.description.length > 80
                ? `${book.description.slice(0, 80)}...`
                : book.description
              : 'No description available'}
          </p>

          <p className="font-medium mb-5">
            ${book?.newPrice}{' '}
            <span className="line-through font-normal ml-2">${book?.oldPrice}</span>
          </p>
          <button
            onClick={() => {
              handleAddToCart(book);
            }}
            className="btn-primary px-6 space-x-1 flex items-center gap-1 "
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
