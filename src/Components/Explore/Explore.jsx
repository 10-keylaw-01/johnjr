import React, { useRef, useState } from 'react';
import { FaStar, FaRegHeart } from 'react-icons/fa6';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { IoEyeOutline } from 'react-icons/io5';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { formatKsh } from '../../utils/format';

const Explore = () => {
  const swiperRef = useRef(null);
  const { addToCart, addToWishlist, wishlist, removeFromWishlist } = useShop();
  const [visibleCount, setVisibleCount] = useState(4);

  const renderStars = count =>
    Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={
          i < count
            ? 'text-[#FFAD33] text-lg'
            : 'text-[rgba(0,0,0,0.25)] text-lg'
        }
      />
    ));

  const exploreItems = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80',
      title: 'Everyday Smart Watch',
      price: 12800,
      ratingStars: 3,
      rating: 88,
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=700&q=80',
      title: 'Air Max Lifestyle Sneakers',
      price: 14200,
      ratingStars: 4,
      rating: 95,
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80',
      title: 'Instant Film Camera',
      price: 23500,
      ratingStars: 5,
      rating: 325,
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1585386959984-a4155223168f?auto=format&fit=crop&w=700&q=80',
      title: 'Signature Eau de Parfum',
      price: 7800,
      ratingStars: 4,
      rating: 145,
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80',
      title: 'Cotton Summer Collection',
      price: 5600,
      ratingStars: 3,
      rating: 88,
    },
    {
      id: 6,
      img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80',
      title: 'Classic Canvas Sneakers',
      price: 6900,
      ratingStars: 4,
      rating: 95,
    },
    {
      id: 7,
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80',
      title: 'MacBook Work Laptop',
      price: 145000,
      ratingStars: 5,
      rating: 325,
    },
    {
      id: 8,
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
      title: 'Red Performance Trainers',
      price: 9900,
      ratingStars: 4,
      rating: 145,
    },
    {
      id: 9,
      img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=700&q=80',
      title: 'Daily Commute Backpack',
      price: 6500,
      ratingStars: 3,
      rating: 88,
    },
    {
      id: 10,
      img: 'https://images.unsplash.com/photo-1511389026070-a14ae610a1be?auto=format&fit=crop&w=700&q=80',
      title: 'Desk Lamp and Decor Set',
      price: 4200,
      ratingStars: 4,
      rating: 95,
    },
    {
      id: 11,
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
      title: 'Skincare Essentials Bundle',
      price: 4800,
      ratingStars: 5,
      rating: 325,
    },
    {
      id: 12,
      img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=700&q=80',
      title: 'Wooden Stool Set',
      price: 11800,
      ratingStars: 4,
      rating: 145,
    },
  ];

  return (
    <section className="pb-42 mx-4 xl:mx-0">
      <div className="container">
        {/* HEADER */}
        <div className="section-title mb-15 pt-20">
          <div className="mb-3.25 relative after:absolute after:w-5 after:h-full after:bg-[#DB4444] after:left-0 after:top-0 after:rounded-sm ps-9">
            <h4 className="font-poppins font-semibold text-base text-[#DB4444] leading-10">
              Our Products
            </h4>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="font-inter font-semibold text-4xl text-black tracking-[4%]">
              Explore Our Products
            </h2>

            <div className="flex gap-2">
              <div
                onClick={() => swiperRef.current?.slidePrev()}
                className="bg-[#F5F5F5] hover:bg-[rgba(174,171,171,0.5)] p-4 rounded-full cursor-pointer"
              >
                <GoArrowLeft />
              </div>
              <div
                onClick={() => swiperRef.current?.slideNext()}
                className="bg-[#F5F5F5] hover:bg-[rgba(174,171,171,0.5)] p-4 rounded-full cursor-pointer"
              >
                <GoArrowRight />
              </div>
            </div>
          </div>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Grid, Pagination]}
          spaceBetween={30}
          onSwiper={swiper => (swiperRef.current = swiper)}
          pagination={false}
          breakpoints={{
            0: {
              slidesPerView: 1,
              grid: {
                rows: 1,
                fill: 'row',
              },
            },
            640: {
              slidesPerView: 2,
              grid: {
                rows: 2,
                fill: 'row',
              },
            },
            1024: {
              slidesPerView: 4,
              grid: {
                rows: 2,
                fill: 'row',
              },
            },
          }}
          slidesPerGroup={1}
        >
          {exploreItems.slice(0, visibleCount).map(item => {
            const isWished = wishlist.some(w => w.id === item.id);

            return (
              <SwiperSlide key={item.id}>
                <div className="group">
                  <div className="bg-[#F5F5F5] py-8.75 rounded-sm relative overflow-hidden">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="mx-auto w-43 h-40 object-cover rounded-sm duration-300 group-hover:scale-90"
                      />
                    </Link>

                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button
                        onClick={() =>
                          isWished
                            ? removeFromWishlist(item.id)
                            : addToWishlist(item)
                        }
                        className="bg-white p-1.25 rounded-full"
                      >
                        <FaRegHeart
                          className={isWished ? 'text-red-500' : 'text-black'}
                        />
                      </button>

                      <Link
                        to={`/product/${item.id}`}
                        className="bg-white p-1.25 rounded-full flex justify-center"
                      >
                        <IoEyeOutline />
                      </Link>
                    </div>

                    <div
                      onClick={() => addToCart(item)}
                      className="absolute left-0 -bottom-11.25 w-full bg-black text-white text-center py-2
                      cursor-pointer opacity-0 group-hover:bottom-0 group-hover:opacity-100 transition-all"
                    >
                      Add To Cart
                    </div>
                  </div>

                  <Link to={`/product/${item.id}`}>
                    <div className="pt-4">
                      <h3 className="font-poppins text-base text-black">
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-1 py-2">
                        <p className="text-[#DB4444] font-poppins text-base">
                          {formatKsh(item.price)}
                        </p>
                        {renderStars(item.ratingStars)}
                        <span className="font-poppins text-sm text-[rgba(0,0,0,0.5)] ps-1">
                          ({item.rating})
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* VIEW MORE */}
        {visibleCount < exploreItems.length && (
          <div className="text-center mt-16">
            <button
              onClick={() => setVisibleCount(v => v + 4)}
              className="bg-[#DB4444] hover:bg-[#b80808] py-4 px-12 rounded-sm font-poppins text-base text-white"
            >
              View More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Explore;
