'use client';
import React from 'react';
import Image from 'next/image';

const Landing = ({image}) => {
  return (
    <>
          <div className=" md:h-[600px] h-[250px] flex w-full items-center justify-center">
            <div className={` h-full w-full md:w-[90%] overflow-hidden md:rounded-2xl md:rounded-t-none`}>
              <Image
                src={image}
                alt="Scrolling Dog"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
    </>
  );
};

export default Landing;