import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { useFetchBookByIdQuery } from '../../redux/feature/books/booksAPi';
import { getimgurl } from '../../utils/getimgurl';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../redux/feature/cart/carSlice';

const SingleBook = () => {
  const {id}=useParams();
  const {data:book,isLoading,isError}=useFetchBookByIdQuery(id);
  console.log({ id, book, isLoading, isError });

  const dispatch=useDispatch();
  const handleAddToCart=(product)=>{
      dispatch(addTocart(product));
    }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getimgurl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>author:</strong> {book.author || 'admin'}</p>
                    <p className="text-gray-700 mb-4">
                        <strong>published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <p className="text-gray-700"><strong>description:</strong> {book.description}</p>
                </div>

                <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>add to cart</span>

                </button>
            </div>
        </div>
  )
}

export default SingleBook
