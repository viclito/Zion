'use client'; // Mark this as a Client Component

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderSection from '@/components/OrderSection';

export default function PleasantDetails({ pleasant }) {
  // Initialize the state with the default big image
  const [selectedImage, setSelectedImage] = useState(pleasant.mainImage);

  return (
    <>
      <Navbar />
      <div className="h-auto max-w-[1350px] m-auto flex flex-col md:flex-row items-start justify-center md:mt-4">
        <div className="w-[90%] m-auto md:w-[50%] h-[600px] overflow-hidden rounded-lg flex flex-col-reverse md:flex-row justify-start gap-2">
          {/* Small Images */}
          <div className="flex md:flex-col flex-row gap-2">
            {[pleasant.mainImage, ...(pleasant.gallery || []).filter(img => img)].map((item, i) => (
              <div
                key={i}
                className="w-[50px] h-[50px] rounded-lg overflow-hidden cursor-pointer border-2 hover:border-[var(--text-primary)] transition-all"
                onClick={() => setSelectedImage(item)} // Update the big image on click
              >
                <Image
                  src={item}
                  alt={`${pleasant.name} thumbnail ${i}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Big Image */}
          <div className="md:w-[70%] w-full rounded-lg overflow-hidden border-4 border-[var(--text-primary)] shadow-[6px_6px_0px_var(--text-primary)] relative bg-[var(--accent-teal)]">
            <Image
              src={selectedImage} // Use the selected image
              alt={pleasant.name}
              fill
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pleasant Details */}
        <div className="w-[90%] md:w-[50%] m-auto my-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 drop-shadow-[3px_3px_0px_var(--accent-teal)]">{pleasant.name}</h1>
          
          {/* Price Block */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            {pleasant.discountedPrice ? (
              <>
                <span className="text-3xl md:text-4xl font-black text-[var(--text-primary)] bg-[var(--accent-mint)] px-4 py-1 rounded-xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)]">
                  ₹{pleasant.discountedPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xl font-bold text-[var(--text-primary)] opacity-60 line-through decoration-4 decoration-[var(--accent-coral)]">
                  ₹{pleasant.basePrice?.toLocaleString('en-IN')}
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--accent-yellow)] border-4 border-[var(--text-primary)] text-xs font-black uppercase text-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] rotate-6 animate-pulse">
                  SALE!
                </span>
              </>
            ) : (
              <span className="text-3xl md:text-4xl font-black text-[var(--text-primary)] bg-[var(--accent-mint)] px-4 py-1 rounded-xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)]">
                ₹{pleasant.basePrice?.toLocaleString('en-IN') || 'Price Unset'}
              </span>
            )}
          </div>
          
          <div className="mb-8">
            {pleasant.avail === 'available' ? (
              <span className="px-4 py-2 rounded-full border-4 border-[var(--text-primary)] text-sm font-black uppercase shadow-[4px_4px_0px_var(--text-primary)] bg-[var(--accent-mint)] text-[var(--text-primary)]">
                {pleasant.avail}
              </span>
            ) : (
              <span className="px-4 py-2 rounded-full border-4 border-[var(--text-primary)] text-sm font-black uppercase shadow-[4px_4px_0px_var(--text-primary)] bg-[var(--accent-coral)] text-white">
                {pleasant.avail}
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-black text-[var(--text-primary)] mb-3 uppercase tracking-wider relative inline-block">
             <span className="relative z-10">About this Breed</span>
             <span className="absolute bottom-1 left-0 w-full h-3 bg-[var(--accent-teal)] -z-10 -rotate-1 opacity-70"></span>
          </h3>
          <p className="text-base font-medium text-[var(--text-primary)] opacity-80 mb-10 w-[90%] text-justify leading-relaxed">{pleasant.description}</p>

          <OrderSection pet={pleasant} />
        </div>
      </div>
      <Footer />
    </>
  );
}