import React, { useEffect, useState } from 'react';
import apple from '../../assets/images/appleLogo.png';
import { IoArrowForward } from 'react-icons/io5';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { getCategories } from '../../data/api';

const Banner = () => {
  /* ================= BANNER DATA ================= */
  const bannerItems = [
    {
      id: 1,
      logo: apple,
      series: 'Premium Electronics',
      voucher: 'Smart gear for work, study, and play',
      btn: 'Shop Now',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 2,
      logo: apple,
      series: 'New Arrivals',
      voucher: 'Fresh fashion finds for every day',
      btn: 'Shop Now',
      img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      logo: apple,
      series: 'Easy Checkout',
      voucher: 'Pay securely with M-Pesa at checkout',
      btn: 'Shop Now',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
    }
  ];

  /* ================= STATE ================= */
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories(getCategories());
      } catch (err) {
        setCategories([]);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* ================= SLIDER SETTINGS ================= */
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="lg:mx-4 xl:mx-0">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-11.25 justify-between">
          {/* ================= CATEGORY SIDEBAR ================= */}
          <div className="hidden lg:flex w-[20%] flex-col gap-6 pt-10 border-r border-black/20">
            {loading ? (
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-200 animate-pulse rounded"
                  ></div>
                ))}
              </div>
            ) : error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : (
              categories.slice(0, 8).map((cate, index) => (
                <Link
                  key={cate.slug || index}
                  to={`/products/category/${cate.slug}`}
                  className="font-poppins text-base text-gray-700 hover:text-[#DB4444] transition capitalize"
                >
                  {cate.name}
                </Link>
              ))
            )}
          </div>

          {/* ================= BANNER SLIDER ================= */}
          <div className="w-full lg:w-[80%] pt-6 lg:pt-10">
            <Slider {...settings}>
              {bannerItems.map(item => (
                <div key={item.id}>
                  {/* FIXED HEIGHT SLIDE */}
                  <div className="bg-black h-105 lg:h-105 flex flex-col lg:flex-row gap-9.5 justify-center items-center lg:ps-16 pt-6 lg:pt-4 rounded-lg overflow-hidden">
                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-[40%] text-center lg:text-left">
                      <div className="flex gap-6 items-center justify-center lg:justify-start mb-4">
                        <img src={item.logo} alt="apple" className="w-10" />
                        <p className="font-poppins text-base text-[#fafafa]">
                          {item.series}
                        </p>
                      </div>

                      <h2 className="font-inter font-semibold text-[32px] lg:text-[38px] xl:text-[48px] leading-10 lg:leading-15 pb-5.5 text-[#fafafa] tracking-[0.04em] lg:pe-12">
                        {item.voucher}
                      </h2>

                      <Link
                        to="/shop"
                        className="flex gap-2 items-center justify-center lg:justify-start group"
                      >
                        <span className="font-poppins text-base text-[#fafafa] border-b border-[#fafafa] pb-1 group-hover:text-[#DB4444] group-hover:border-[#DB4444] transition">
                          {item.btn}
                        </span>
                        <IoArrowForward className="text-[#fafafa] text-xl group-hover:text-[#DB4444]" />
                      </Link>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="w-full lg:w-[60%] flex justify-center lg:justify-end">
                      <img
                        src={item.img}
                        alt={item.series}
                        className="w-65 sm:w-[320px] lg:w-99 h-64 lg:h-88 object-cover rounded-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
