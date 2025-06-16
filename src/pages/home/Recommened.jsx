import React from 'react'
import  { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules

import {Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/feature/books/booksAPi';
 

const Recommened = () => {
  //   const [books, setbooks] = useState([]);

  // useEffect(() => {
  //   fetch("../../public/books.json")
  //     .then((res) => res.json())
  //     .then((data) => setbooks(data));
  // }, []);
  const { data: books = [] } = useFetchAllBooksQuery();
  
   
  return (
    <div className='py-16'>
       <h1 className="text-3xl font-semibold px-3 py-2 mb-6">recommened for you</h1>
       <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
        {books.length>0 &&  books.slice(8,16).map((book, i) => (
          <SwiperSlide  key={i}>
            <BookCard book={book} />
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Recommened
