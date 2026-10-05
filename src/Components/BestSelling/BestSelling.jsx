import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegHeart } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { useShop } from '../../contexts/ShopContext';
import { Link } from 'react-router';
import { formatKsh } from '../../utils/format';

const BestSelling = () => {
  const bestSellingItems = [
    {
      id: 1,
      name: 'Weatherproof Travel Jacket',
      price: 9500,
      oldPrice: 12800,
      rating: 5,
      reviews: 65,
      img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 2,
      name: 'Leather Weekend Duffle Bag',
      price: 15500,
      oldPrice: 21000,
      rating: 4.5,
      reviews: 65,
      img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 3,
      name: 'Minimal Wooden Speaker',
      price: 18500,
      oldPrice: 22000,
      rating: 4.5,
      reviews: 65,
      img: 'https://images.unsplash.com/photo-1631972234521-24e9d4fbb841?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 4,
      name: 'Modern Home Bookshelf',
      price: 24500,
      oldPrice: 31000,
      rating: 5,
      reviews: 65,
      img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=700&q=80',
    },
  ];

  const { addToWishlist, wishlist, removeFromWishlist } = useShop();

  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-[#FFAD33]" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-[#FFAD33]" />);
    }

    return stars;
  };

  return (
    <section className="mx-4 xl:mx-0">
      <div className="container">
        <div className="section-title border-t border-[rgba(0,0,0,0.3)]">
          <div className="mb-7.75 pt-20">
            <div className="mb-3.25 relative after:absolute after:w-5 after:h-full after:bg-[#DB4444] after:left-0 after:top-0 after:rounded-sm ps-9">
              <h4 className="font-poppins font-semibold text-base text-[#DB4444] leading-10">
                This Month
              </h4>
            </div>

            {/* Responsive header (UI same) */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
              <h2 className="font-inter font-semibold text-4xl text-black">
                Best Selling Products
              </h2>

              <Link
                to="/shop"
                className="bg-[#DB4444] hover:bg-[#b80808] transition-all duration-300 text-center py-4 px-12 rounded-sm font-poppins font-medium text-base text-[#fafafa] w-max hidden lg:inline-block"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7.5 pb-20 lg:pb-35">
          {bestSellingItems.map(item => {
            const isWished = wishlist.some(w => w.id === item.id);

            const handleToggleWishlist = () => {
              isWished ? removeFromWishlist(item.id) : addToWishlist(item);
            };

            return (
              <div key={item.id} className="item">
                <div className="bg-[#F5F5F5] py-8.75 rounded-sm relative">
                  <Link to={`/product/${item.id}`}>
                    <img
                      className="mx-auto w-43 h-40 object-cover rounded-sm"
                      src={item.img}
                      alt={item.name}
                    />
                  </Link>

                  <div className="absolute top-3 right-3 px-3">
                    <button
                      onClick={handleToggleWishlist}
                      className="bg-white p-1.25 rounded-full cursor-pointer mb-2"
                    >
                      <FaRegHeart
                        className={`text-base ${
                          isWished ? 'text-red-500' : 'text-black'
                        }`}
                      />
                    </button>

                    <Link
                      to={`/product/${item.id}`}
                      className="bg-white p-1.25 rounded-full flex items-center justify-center"
                    >
                      <IoEyeOutline className="text-base text-black" />
                    </Link>
                  </div>
                </div>

                <Link to={`/product/${item.id}`}>
                  <div className="pt-4">
                    <h3 className="font-poppins font-medium text-base text-black">
                      {item.name}
                    </h3>

                    <p className="py-2 font-poppins font-medium text-base flex items-center gap-3">
                      <span className="text-[#DB4444]">
                        {formatKsh(item.price)}
                      </span>
                      <del className="text-[rgba(0,0,0,0.5)]">
                        {formatKsh(item.oldPrice)}
                      </del>
                    </p>

                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                      <span className="font-poppins font-semibold text-sm text-[rgba(0,0,0,0.5)] ps-1">
                        ({item.reviews})
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="block lg:hidden pb-15">
          <Link
            to="/shop"
            className="bg-[#DB4444] hover:bg-[#b80808] transition-all duration-300 text-center py-4 px-12 rounded-sm font-poppins font-medium text-base text-[#fafafa] w-max"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
