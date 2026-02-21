'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Landing from '@/components/Landing';
import { usePets } from '@/hooks/usePets';

const HenList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: pets, isLoading, isError } = usePets('hen');

  const filteredData = pets?.filter((hen) =>
    hen.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="bg-[var(--bg-primary)] pb-24">
      <Landing image='/Hen/bantam4.jpg'/>
      
      <div className="px-4 md:px-12 max-w-7xl mx-auto mt-16">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] drop-shadow-[3px_3px_0px_var(--accent-coral)]">
            Fabulous Flocks
          </h1>
          <div className="relative w-full md:w-auto group">
            <input
              type="text"
              placeholder="Search breeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 border-4 border-[var(--text-primary)] rounded-full px-6 py-4 font-bold text-[var(--text-primary)] outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] shadow-[6px_6px_0px_var(--text-primary)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--text-primary)]"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl pointer-events-none">🔍</span>
          </div>
        </div>

        {/* Data Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 text-center border-4 border-dashed border-[var(--text-primary)] rounded-3xl bg-[var(--accent-yellow)]/20 animate-pulse">
               <p className="text-3xl font-black text-[var(--text-primary)]">Loading cluckers... ⏳</p>
            </div>
          ) : isError ? (
            <div className="col-span-full py-20 text-center border-4 border-dashed border-red-500 rounded-3xl bg-red-100">
               <p className="text-3xl font-black text-red-600">Failed to load data. 🚨</p>
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((hen) => (
              <Link key={hen._id} href={`/hen/${hen._id}`}>
                <div className="flex flex-col h-full border-4 border-[var(--text-primary)] rounded-[2rem] p-5 bg-white shadow-[8px_8px_0px_var(--text-primary)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_var(--text-primary)] transition-all duration-300 group cursor-pointer">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-4 border-[var(--text-primary)] mb-5 relative bg-[var(--accent-yellow)]">
                    <Image
                      src={hen.mainImage}
                      fill
                      alt={hen.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Status Badge */}
                    <div className={`absolute top-3 left-3 px-4 py-1.5 rounded-full border-4 border-[var(--text-primary)] text-xs font-black uppercase shadow-[4px_4px_0px_var(--text-primary)] ${hen.avail?.toLowerCase() === 'available' ? 'bg-[var(--accent-mint)] text-[var(--text-primary)]' : 'bg-[var(--accent-coral)] text-white'}`}>
                      {hen.avail}
                    </div>
                    {/* Sale Badge */}
                    {hen.discountedPrice && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[var(--accent-yellow)] border-4 border-[var(--text-primary)] text-xs font-black uppercase text-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] rotate-12 scale-110 animate-pulse">
                        SALE!
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-black text-[var(--text-primary)] mb-1 line-clamp-1">{hen.name}</h2>
                  
                  {/* Price Block */}
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {hen.discountedPrice ? (
                      <>
                        <span className="text-xl font-black text-[var(--text-primary)] bg-[var(--accent-mint)] px-2 py-0.5 rounded-lg border-2 border-[var(--text-primary)] shadow-[2px_2px_0px_var(--text-primary)]">
                          ₹{hen.discountedPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm font-bold text-[var(--text-primary)] opacity-60 line-through decoration-2 decoration-[var(--accent-coral)]">
                          ₹{hen.basePrice?.toLocaleString('en-IN')}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-black text-[var(--text-primary)] drop-shadow-[2px_2px_0px_var(--accent-yellow)]">
                        ₹{hen.basePrice?.toLocaleString('en-IN') || 'Price Unset'}
                      </span>
                    )}
                  </div>
                  
                  {/* Stock Indicator */}
                  {hen.stock > 0 && hen.stock <= 5 && (
                    <div className="mb-2 text-xs font-black text-[var(--accent-coral)] animate-pulse">
                      🔥 Only {hen.stock} left in stock!
                    </div>
                  )}

                  <p className="text-sm font-medium text-[var(--text-primary)] opacity-80 line-clamp-2 pb-2 flex-grow">{hen.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-4 border-dashed border-[var(--text-primary)] rounded-3xl bg-[var(--accent-teal)]/20">
               <p className="text-3xl font-black text-[var(--text-primary)]">Oops! No birds found. 🐥</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HenList;
