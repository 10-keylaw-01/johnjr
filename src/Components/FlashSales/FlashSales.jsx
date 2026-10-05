import React from 'react';
import { FaStar, FaRegHeart } from 'react-icons/fa6';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { IoEyeOutline } from 'react-icons/io5';

import { useCountdown } from '../../contexts/CountDownContext/CountDownContextProvider';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router';
import { useShop } from '../../contexts/ShopContext';
import { formatKsh } from '../../utils/format';

const FlashSales = () => {
  const { seconds, minutes, hours, days } = useCountdown();
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useShop();

  const flashItems = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
      dis: 40,
      cart: 'Add To Cart',
      name: 'Sony Wireless Headphones',
      dPrice: 12500,
      mPrice: 18000,
      rating: 88,
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
      dis: 35,
      cart: 'Add To Cart',
      name: 'Nike Running Sneakers',
      dPrice: 8900,
      mPrice: 12000,
      rating: 75,
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80',
      dis: 30,
      cart: 'Add To Cart',
      name: 'Canon DSLR Camera Kit',
      dPrice: 68500,
      mPrice: 78000,
      rating: 99,
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=700&q=80',
      dis: 25,
      cart: 'Add To Cart',
      name: 'Premium Office Backpack',
      dPrice: 6200,
      mPrice: 8500,
      rating: 99,
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
      dis: 40,
      cart: 'Add To Cart',
      name: 'Slim Laptop Workstation',
      dPrice: 92000,
      mPrice: 110000,
      rating: 88,
    },
    {
      id: 6,
      img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=80',
      dis: 35,
      cart: 'Add To Cart',
      name: 'Smart Watch Series 9',
      dPrice: 14500,
      mPrice: 19000,
      rating: 75,
    },
  ];

  return (
    <section className="pt-10 lg:pt-24 mx-4 xl:mx-0">
      <div className="container">
        {/* ================= HEADER ================= */}
        <div className="section-title mb-7.75">
          <div className="mb-3.25 relative after:absolute after:w-5 after:h-full after:bg-[#DB4444] after:left-0 after:top-0 after:rounded-sm ps-9">
            <h4 className="font-poppins font-semibold text-base text-[#DB4444] leading-10">
              Today’s
            </h4>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex sm:gap-6.25 lg:gap-21.75 items-center">
              <h2 className="font-inter font-semibold text-2xl sm:text-3xl md:text-4xl text-black">
                Flash Sales
              </h2>

              <div className="flex gap-4.25 items-center">
                {[
                  { label: 'Days', value: days },
                  { label: 'Hours', value: hours },
                  { label: 'Minutes', value: minutes },
                  { label: 'Seconds', value: seconds },
                ].map((t, i) => (
                  <React.Fragment key={i}>
                    <div>
                      <h4 className="text-xs pb-1">{t.label}</h4>
                      <h3 className="text-[32px] font-bold">
                        {t.value >= 10 ? t.value : `0${t.value}`}
                      </h3>
                    </div>
                    {i !== 3 && (
                      <span className="text-xl text-[#E07575]">:</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="hidden sm:inline-block">
              <div className="flex gap-2">
                <div className="flash-prev bg-[#F5F5F5] p-4 rounded-full cursor-pointer">
                  <GoArrowLeft />
                </div>
                <div className="flash-next bg-[#F5F5F5] p-4 rounded-full cursor-pointer">
                  <GoArrowRight />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SLIDER ================= */}
        <Swiper
          modules={[Navigation, Autoplay]}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={{
            nextEl: '.flash-next',
            prevEl: '.flash-prev',
          }}
          spaceBetween={30}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {flashItems.map(item => {
            const isWished = wishlist.some(w => w.id === item.id);

            return (
              <SwiperSlide key={item.id}>
                <div className="group">
                  <div className="bg-[#F5F5F5] py-8.75 relative overflow-hidden">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="mx-auto w-43 h-40 object-cover rounded-sm group-hover:scale-90 duration-300"
                      />
                    </Link>

                    <div className="absolute top-3 left-3 bg-[#DB4444] px-3 py-1">
                      <p className="text-xs text-white">- {item.dis}%</p>
                    </div>

                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() =>
                          isWished
                            ? removeFromWishlist(item.id)
                            : addToWishlist(item)
                        }
                        className="bg-white p-1.25 rounded-full mb-2"
                      >
                        <FaRegHeart
                          className={`${
                            isWished ? 'text-red-500' : 'text-black'
                          }`}
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
                      className="absolute bottom-0 left-0 w-full bg-black py-2 text-center opacity-0 group-hover:opacity-100 duration-300"
                    >
                      <p className="text-white">{item.cart}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium text-base">{item.name}</h3>
                    <p className="py-2 flex gap-3">
                      <span className="text-[#DB4444]">
                        {formatKsh(item.dPrice)}
                      </span>
                      <del className="opacity-50">{formatKsh(item.mPrice)}</del>
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#FFAD33]" />
                      ))}
                      <span className="text-sm opacity-50">
                        ({item.rating})
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="text-center pt-24">
          <Link to="/shop" className="bg-[#DB4444] py-4 px-12 text-white">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
