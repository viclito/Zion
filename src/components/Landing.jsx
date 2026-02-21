'use client';
import React from 'react';
import Image from 'next/image';

const Landing = ({image}) => {
  return (
    <div className="w-full pt-10 px-4 md:px-12 bg-[var(--bg-primary)]">
      <div className="relative w-full max-w-7xl mx-auto h-[250px] md:h-[400px] overflow-hidden rounded-[2rem] md:rounded-[3rem] border-4 border-[var(--text-primary)] shadow-[8px_8px_0px_var(--text-primary)] md:shadow-[12px_12px_0px_var(--text-primary)] z-10 group bg-[var(--accent-coral)]">
        <Image
          src={image}
          alt="Banner Cover"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        {/* Playful Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--text-primary)]/30 to-transparent mix-blend-overlay pointer-events-none" />
      </div>
    </div>
  );
};

export default Landing;
