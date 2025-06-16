import React, { useEffect, useState } from "react";
import BookCard from "../books/BookCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules

import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from '../../redux/feature/books/booksAPi'
const categorie = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];
const Topsellers = () => {
  //selected book
  const [selectedcategory, setselectedcategory] = useState("choose a genre");

  //books data from api
  // const [books, setbooks] = useState([]);
  // useEffect(() => {
  //   fetch("../../public/books.json")
  //     .then((res) => res.json())
  //     .then((data) => setbooks(data));
  // }, []);

  const { data: books = [] } = useFetchAllBooksQuery();

  const filterbook =
    selectedcategory === "choose a genre"
      ? books
      : books.filter((book) =>book.category === selectedcategory.toLowerCase());

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold px-3 py-2 mb-6">top sellers</h1>
      {/* add px-3 py-2 */}
      <div className="mb-8 flex items-center px-3">
        {/* add px-3 */}
        <select
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          onChange={(e) => {
            setselectedcategory(e.target.value);
          }}
        >
          {categorie.map((cat, i) => {
            return (
              <option key={i} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>
      </div>
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
          },
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
        {filterbook.length > 0 &&
          filterbook.map((book, i) => (
            <SwiperSlide key={i}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Topsellers;
