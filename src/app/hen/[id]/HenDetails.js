'use client'; // Mark this as a Client Component

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderSection from '@/components/OrderSection';

export default function HenDetails({ hen }) {
  // Initialize the state with the default big image
  const [selectedImage, setSelectedImage] = useState(hen.mainImage);

  return (
    <>
      <Navbar />
      <div className="h-auto max-w-[1350px] m-auto flex flex-col md:flex-row items-start justify-center md:mt-4">
        <div className="w-[90%] m-auto md:w-[50%] h-[600px] overflow-hidden rounded-lg flex flex-col-reverse md:flex-row justify-start gap-2">
          {/* Small Images */}
          <div className="flex md:flex-col flex-row gap-2">
            {[hen.mainImage, ...(hen.gallery || []).filter(img => img)].map((item, i) => (
              <div
                key={i}
                className="w-[50px] h-[50px] rounded-lg overflow-hidden cursor-pointer border-2 hover:border-[var(--text-primary)] transition-all"
                onClick={() => setSelectedImage(item)} // Update the big image on click
              >
                <Image
                  src={item}
                  alt={`${hen.name} thumbnail ${i}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Big Image */}
          <div className="md:w-[70%] w-full rounded-lg overflow-hidden border-4 border-[var(--text-primary)] shadow-[6px_6px_0px_var(--text-primary)] relative bg-[var(--accent-yellow)]">
            <Image
              src={selectedImage} // Use the selected image
              alt={hen.name}
              fill
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Hen Details */}
        <div className="w-[90%] md:w-[50%] m-auto my-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 drop-shadow-[3px_3px_0px_var(--accent-yellow)]">{hen.name}</h1>
          
          {/* Price Block */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            {hen.discountedPrice ? (
              <>
                <span className="text-3xl md:text-4xl font-black text-[var(--text-primary)] bg-[var(--accent-mint)] px-4 py-1 rounded-xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)]">
                  ₹{hen.discountedPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xl font-bold text-[var(--text-primary)] opacity-60 line-through decoration-4 decoration-[var(--accent-coral)]">
                  ₹{hen.basePrice?.toLocaleString('en-IN')}
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--accent-yellow)] border-4 border-[var(--text-primary)] text-xs font-black uppercase text-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] rotate-6 animate-pulse">
                  SALE!
                </span>
              </>
            ) : (
              <span className="text-3xl md:text-4xl font-black text-[var(--text-primary)] bg-[var(--accent-mint)] px-4 py-1 rounded-xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)]">
                ₹{hen.basePrice?.toLocaleString('en-IN') || 'Price Unset'}
              </span>
            )}
          </div>
          
          <div className="mb-8">
            {hen.avail === 'available' ? (
              <span className="px-4 py-2 rounded-full border-4 border-[var(--text-primary)] text-sm font-black uppercase shadow-[4px_4px_0px_var(--text-primary)] bg-[var(--accent-mint)] text-[var(--text-primary)]">
                {hen.avail}
              </span>
            ) : (
              <span className="px-4 py-2 rounded-full border-4 border-[var(--text-primary)] text-sm font-black uppercase shadow-[4px_4px_0px_var(--text-primary)] bg-[var(--accent-coral)] text-white">
                {hen.avail}
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-black text-[var(--text-primary)] mb-3 uppercase tracking-wider relative inline-block">
             <span className="relative z-10">About this Breed</span>
             <span className="absolute bottom-1 left-0 w-full h-3 bg-[var(--accent-yellow)] -z-10 -rotate-1"></span>
          </h3>
          <p className="text-base font-medium text-[var(--text-primary)] opacity-80 mb-10 w-[90%] text-justify leading-relaxed">{hen.description}</p>

          <OrderSection pet={hen} />
        </div>
      </div>
      <Footer />
    </>
  );
}