'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FirstPage = () => {
  const container = useRef();
  
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)", duration: 1 } });
    
    tl.from(".hero-blob", {
      scale: 0,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
    })
    .from(".hero-img-container", {
      scale: 0.8,
      opacity: 0,
      rotation: -5,
      ease: "elastic.out(1, 0.75)"
    }, "-=0.8")
    .from(".hero-logo", {
      y: 50,
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
    }, "-=1.0")
    .from(".hero-text", {
      y: 20,
      opacity: 0,
      ease: "power2.out",
    }, "-=0.5")
    .from(".hero-btn", {
      y: 20,
      scale: 0.9,
      opacity: 0,
      ease: "back.out(2)"
    }, "-=0.5");
  }, { scope: container });

  return (
    <div ref={container} className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 md:px-12 mt-10">
      
      {/* Playful Background Blobs */}
      <div className="hero-blob absolute top-10 right-10 md:right-32 w-64 h-64 bg-[var(--accent-teal)] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
      <div className="hero-blob absolute top-40 right-10 md:right-64 w-72 h-72 bg-[var(--accent-yellow)] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
      <div className="hero-blob absolute -bottom-8 left-20 w-80 h-80 bg-[var(--accent-coral)] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-16 relative z-10">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          
          <div className="hero-btn inline-block px-4 py-2 bg-[var(--accent-yellow)] rounded-full font-bold text-[var(--text-primary)] text-sm mb-6 shadow-[4px_4px_0px_var(--text-primary)] border-2 border-[var(--text-primary)] transform -rotate-2">
            ✨ Premium Fancy Hens
          </div>
          
          <div className="hero-logo w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] mb-6 mx-auto md:mx-0 flex justify-center md:justify-start">
            <Image 
              src="/landimg.png" 
              alt="Zion Pets Logo Wordmark" 
              width={600} 
              height={300} 
              className="w-full h-auto object-contain rounded-xl" 
              priority 
            />
          </div>
          <h1 className="sr-only">Zion Pets</h1>

          <p className="hero-text text-xl md:text-2xl text-[var(--text-primary)] font-medium leading-relaxed max-w-lg mb-10">
            Joyful companions for a happy home! Discover our beautiful collection of friendly Silkies, majestic Brammas, and more.
          </p>

          <button className="hero-btn group relative px-10 py-5 bg-[var(--accent-coral)] text-white font-bold text-xl rounded-2xl shadow-[6px_6px_0px_var(--text-primary)] border-2 border-[var(--text-primary)] hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--text-primary)] hover:bg-[#ff5252] transition-all active:translate-y-2 active:shadow-none">
            Meet Our Pets 🐾
          </button>
        </div>

        {/* Image Composition */}
        <div className="w-full md:w-1/2 relative min-h-[500px] flex items-center justify-center mt-12 md:mt-0">
          
          <div className="hero-img-container relative w-full max-w-lg aspect-square z-20">
            {/* Playful Image Frame */}
            <div className="absolute inset-0 bg-[var(--accent-mint)] rounded-[3rem] transform rotate-6 border-4 border-[var(--text-primary)]" />
            
            <div className="absolute inset-0 bg-white rounded-[3rem] overflow-hidden border-4 border-[var(--text-primary)] shadow-[12px_12px_0px_rgba(43,16,85,0.15)] flex items-center justify-center p-4">
               <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <Image 
                  src='/landing.png'
                  fill
                  sizes="(max-width: 768px) 90vw, 50vw"
                  className="object-cover object-center"
                  alt="Happy Fancy Hens"
                  priority
                />
              </div>
            </div>

            {/* Floating Elements (Badges) */}
            <div className="absolute -bottom-6 -left-8 bg-[var(--accent-yellow)] border-4 border-[var(--text-primary)] px-6 py-4 rounded-3xl shadow-[6px_6px_0px_var(--text-primary)] z-30 transform -rotate-12 group-hover:rotate-0 transition-transform">
              <p className="font-black text-2xl text-[var(--text-primary)]">100%</p>
              <p className="font-bold text-[var(--text-primary)]">Happy Flocks</p>
            </div>
            
             <div className="absolute -top-8 -right-4 bg-[var(--accent-teal)] border-4 border-[var(--text-primary)] w-24 h-24 rounded-full shadow-[6px_6px_0px_var(--text-primary)] z-30 flex items-center justify-center transform rotate-12">
              <span className="text-4xl text-white">🐥</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FirstPage;
