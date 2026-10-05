import React from 'react';
import { Link } from 'react-router';

const NewArrival = () => {
  const newArrival1 =
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80';
  const newArrival2 =
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80';
  const newArrival3 =
    'https://images.unsplash.com/photo-1631972234521-24e9d4fbb841?auto=format&fit=crop&w=700&q=80';
  const newArrival4 =
    'https://images.unsplash.com/photo-1585386959984-a4155223168f?auto=format&fit=crop&w=700&q=80';

  return (
    <>
      <section className="pb-35 mx-4 xl:mx-0">
        <div className="container">
          {/* TITLE */}
          <div className="section-title mb-15">
            <div className="mb-5 relative after:absolute after:content-[''] after:w-5 after:h-full after:bg-[#DB4444] after:left-0 after:top-0 after:rounded-sm ps-9">
              <h4 className="font-poppins font-semibold text-base text-[#DB4444] leading-10">
                Featured
              </h4>
            </div>
            <div className="heading">
              <h2 className="font-inter font-semibold text-4xl text-black leading-12 tracking-[4%]">
                New Arrival
              </h2>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="flex flex-col lg:flex-row gap-7.5">
            {/* LEFT BIG CARD */}
            <div className="w-full lg:w-1/2 bg-black pt-22.5 px-7.5 rounded-sm relative">
              <img
                className="w-full max-w-127.75 h-auto mx-auto"
                src={newArrival1}
                alt="Laptop on a work desk"
              />

              <div className="w-60.5 absolute bottom-8 left-8">
                <h4 className="font-inter font-semibold text-2xl text-[#fafafa] leading-6">
                  Work & Study Tech
                </h4>
                <p className="font-poppins font-normal text-sm text-[#fafafa] leading-5.25 py-4">
                  Laptops and accessories selected for productive days.
                </p>
                <Link
                  to="/shop"
                  className="font-poppins font-medium text-base text-white leading-6 border-b border-white/50"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              {/* TOP RIGHT */}
              <div className="bg-black rounded-sm relative flex justify-end">
                <img
                  className="w-full max-w-108 h-auto rounded-tr-sm rounded-br-sm"
                  src={newArrival2}
                  alt="Fashion collection on clothing rack"
                />

                <div className="w-60.5 absolute bottom-8 left-8">
                  <h4 className="font-inter font-semibold text-2xl text-[#fafafa] leading-6">
                    Everyday Fashion
                  </h4>
                  <p className="font-poppins font-normal text-sm text-[#fafafa] leading-5.25 py-4">
                    Fresh outfits, bags, and accessories for every week.
                  </p>
                  <Link
                    to="/shop"
                    className="font-poppins font-medium text-base text-white leading-6 border-b border-white/50"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>

              {/* BOTTOM RIGHT */}
              <div className="flex flex-col sm:flex-row gap-7.5">
                {/* SPEAKERS */}
                <div className="w-full sm:w-1/2 speakers py-7.75 px-7.5 relative rounded-sm">
                  <img
                    className="w-full h-auto"
                    src={newArrival3}
                    alt="Wooden speaker"
                  />

                  <div className="w-47.75 absolute bottom-8 left-8">
                    <h4 className="font-inter font-semibold text-2xl text-[#fafafa] leading-6">
                      Speakers
                    </h4>
                    <p className="font-poppins font-normal text-sm text-[#fafafa] leading-5.25 py-2">
                      Rich sound for home and office
                    </p>
                    <Link
                      to="/shop"
                      className="font-poppins font-medium text-base text-white leading-6 border-b border-white/50"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>

                {/* PERFUME */}
                <div className="w-full sm:w-1/2 perfume py-7.75 px-7.5 relative rounded-sm">
                  <img
                    className="w-full h-auto"
                    src={newArrival4}
                    alt="Perfume bottle"
                  />

                  <div className="w-47.75 absolute bottom-8 left-8">
                    <h4 className="font-inter font-semibold text-2xl text-[#fafafa] leading-6">
                      Perfume
                    </h4>
                    <p className="font-poppins font-normal text-sm text-[#fafafa] leading-5.25 py-2">
                      Signature scents for daily wear
                    </p>
                    <Link
                      to="/shop"
                      className="font-poppins font-medium text-base text-white leading-6 border-b border-white/50"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewArrival;
